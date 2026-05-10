'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'
import { serialize } from '@/lib/utils'

export async function assignActivity(tripId: string, stopId: string, activityId: string, scheduledDate?: string, costOverride?: number) {
  const user = await requireUser()

  const stop = await prisma.stop.findFirst({
    where: { id: stopId, trip: { userId: user.id } },
  })
  if (!stop) throw new Error('Stop not found or access denied')

  const stopActivity = await prisma.stopActivity.create({
    data: {
      stopId,
      activityId,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      costOverride: costOverride ?? null,
    },
    include: { activity: true },
  })

  revalidatePath(`/trips/${tripId}/builder`)
  revalidatePath(`/trips/${tripId}/view`)
  return serialize(stopActivity)
}
