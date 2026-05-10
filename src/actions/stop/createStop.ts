'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'
import { createStopSchema } from '@/lib/validations/stopSchema'
import type { CreateStopInput } from '@/lib/validations/stopSchema'
import { serialize } from '@/lib/utils'

export async function createStop(tripId: string, input: CreateStopInput) {
  const user = await requireUser()

  // Validate ownership
  const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: user.id } })
  if (!trip) throw new Error('Trip not found or access denied')

  const data = createStopSchema.parse(input)

  // Get next sort order
  const last = await prisma.stop.findFirst({
    where: { tripId },
    orderBy: { sortOrder: 'desc' },
  })
  const sortOrder = (last?.sortOrder ?? -1) + 1

  const stop = await prisma.stop.create({
    data: {
      tripId,
      cityName: data.cityName,
      country: data.country,
      cityId: data.cityId,
      sortOrder,
      arriveDate: data.arriveDate ? new Date(data.arriveDate) : null,
      departDate: data.departDate ? new Date(data.departDate) : null,
      estimatedBudget: data.estimatedBudget ?? null,
    },
  })

  revalidatePath(`/trips/${tripId}/builder`)
  return serialize(stop)
}
