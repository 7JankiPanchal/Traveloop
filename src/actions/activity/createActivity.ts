'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'
import { createActivitySchema } from '@/lib/validations/activitySchema'
import type { CreateActivityInput } from '@/lib/validations/activitySchema'

export async function createActivity(tripId: string, input: CreateActivityInput) {
  const user = await requireUser()

  // Validate stop belongs to user's trip
  const stop = await prisma.stop.findFirst({
    where: { id: input.stopId, trip: { userId: user.id } },
  })
  if (!stop) throw new Error('Stop not found or access denied')

  const data = createActivitySchema.parse(input)

  // Create or find a placeholder Activity record, then create StopActivity
  // For the builder flow, activities are ad-hoc per stop (not from the global Activity table)
  const activity = await prisma.activity.create({
    data: {
      name: data.name,
      description: data.description,
      category: data.category,
      baseCost: data.estimatedCost ?? null,
      durationMinutes: data.durationMinutes ?? null,
      // Activities not tied to a city in builder flow — use stop's city
      cityId: stop.cityId ?? await getOrCreatePlaceholderCity(stop.cityName, stop.country ?? ''),
    },
  })

  const stopActivity = await prisma.stopActivity.create({
    data: {
      stopId: data.stopId,
      activityId: activity.id,
      scheduledDate: data.scheduledDate ? new Date(data.scheduledDate) : null,
      costOverride: data.estimatedCost ?? null,
    },
    include: { activity: true },
  })

  revalidatePath(`/trips/${tripId}/builder`)
  revalidatePath(`/trips/${tripId}/view`)
  return stopActivity
}

/** Gets or creates a city record for builder-flow activities. */
async function getOrCreatePlaceholderCity(name: string, country: string): Promise<string> {
  const existing = await prisma.city.findFirst({ where: { name, country } })
  if (existing) return existing.id
  const city = await prisma.city.create({ data: { name, country } })
  return city.id
}
