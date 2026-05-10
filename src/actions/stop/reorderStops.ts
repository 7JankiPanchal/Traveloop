'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'

/** Accepts an ordered array of stopIds and re-writes sortOrder values. */
export async function reorderStops(tripId: string, orderedStopIds: string[]) {
  const user = await requireUser()

  const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: user.id } })
  if (!trip) throw new Error('Trip not found or access denied')

  await Promise.all(
    orderedStopIds.map((stopId, index) =>
      prisma.stop.update({
        where: { id: stopId, tripId },
        data: { sortOrder: index },
      })
    )
  )

  revalidatePath(`/trips/${tripId}/builder`)
}
