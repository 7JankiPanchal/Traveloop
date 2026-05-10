'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'

export async function deleteActivity(
  tripId: string,
  stopId: string,
  stopActivityId: string
) {
  const user = await requireUser()

  const stop = await prisma.stop.findFirst({
    where: { id: stopId, trip: { userId: user.id } },
  })
  if (!stop) throw new Error('Stop not found or access denied')

  // Delete StopActivity junction (cascade removes the link; activity record persists)
  await prisma.stopActivity.delete({ where: { id: stopActivityId, stopId } })

  revalidatePath(`/trips/${tripId}/builder`)
  revalidatePath(`/trips/${tripId}/view`)
}
