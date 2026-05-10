'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'

export async function deleteStop(tripId: string, stopId: string) {
  const user = await requireUser()

  const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: user.id } })
  if (!trip) throw new Error('Trip not found or access denied')

  await prisma.stop.delete({ where: { id: stopId, tripId } })

  // Reorder remaining stops to close gaps
  const remaining = await prisma.stop.findMany({
    where: { tripId },
    orderBy: { sortOrder: 'asc' },
  })
  await Promise.all(
    remaining.map((s, i) =>
      prisma.stop.update({ where: { id: s.id }, data: { sortOrder: i } })
    )
  )

  revalidatePath(`/trips/${tripId}/builder`)
}
