'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'
import { updateActivitySchema } from '@/lib/validations/activitySchema'
import type { UpdateActivityInput } from '@/lib/validations/activitySchema'

export async function updateActivity(tripId: string, input: UpdateActivityInput) {
  const user = await requireUser()

  const stop = await prisma.stop.findFirst({
    where: { id: input.stopId, trip: { userId: user.id } },
  })
  if (!stop) throw new Error('Stop not found or access denied')

  const data = updateActivitySchema.parse(input)

  // Update the underlying Activity record
  const stopActivity = await prisma.stopActivity.findFirst({
    where: { stopId: data.stopId, id: data.id },
    include: { activity: true },
  })
  if (!stopActivity) throw new Error('Activity not found')

  await prisma.activity.update({
    where: { id: stopActivity.activityId },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.estimatedCost !== undefined && { baseCost: data.estimatedCost ?? null }),
      ...(data.durationMinutes !== undefined && { durationMinutes: data.durationMinutes ?? null }),
    },
  })

  await prisma.stopActivity.update({
    where: { id: data.id },
    data: {
      ...(data.scheduledDate !== undefined && {
        scheduledDate: data.scheduledDate ? new Date(data.scheduledDate) : null,
      }),
      ...(data.estimatedCost !== undefined && { costOverride: data.estimatedCost ?? null }),
    },
  })

  revalidatePath(`/trips/${tripId}/builder`)
  revalidatePath(`/trips/${tripId}/view`)
}
