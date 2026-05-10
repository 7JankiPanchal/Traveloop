'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'

export async function deleteTripAction(tripId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const trip = await prisma.trip.findUnique({ where: { id: tripId } })
  if (!trip || trip.userId !== user.id) {
    throw new Error('Not found or unauthorized')
  }

  await prisma.trip.delete({
    where: { id: tripId },
  })

  revalidatePath('/trips')
}
