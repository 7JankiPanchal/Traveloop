'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'
import { updateStopSchema } from '@/lib/validations/stopSchema'
import type { UpdateStopInput } from '@/lib/validations/stopSchema'
import { serialize } from '@/lib/utils'

export async function updateStop(tripId: string, input: UpdateStopInput) {
  const user = await requireUser()

  const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: user.id } })
  if (!trip) throw new Error('Trip not found or access denied')

  const data = updateStopSchema.parse(input)
  const { id, ...rest } = data

  const stop = await prisma.stop.update({
    where: { id },
    data: {
      ...( rest.cityName && { cityName: rest.cityName }),
      ...( rest.country !== undefined && { country: rest.country }),
      ...( rest.cityId !== undefined && { cityId: rest.cityId }),
      ...( rest.arriveDate !== undefined && {
        arriveDate: rest.arriveDate ? new Date(rest.arriveDate) : null,
      }),
      ...( rest.departDate !== undefined && {
        departDate: rest.departDate ? new Date(rest.departDate) : null,
      }),
      ...( rest.estimatedBudget !== undefined && {
        estimatedBudget: rest.estimatedBudget ?? null,
      }),
    },
  })

  revalidatePath(`/trips/${tripId}/builder`)
  revalidatePath(`/trips/${tripId}/view`)
  return serialize(stop)
}
