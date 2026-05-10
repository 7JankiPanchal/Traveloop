'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'

export async function createBudgetEntryAction(formData: FormData) {
  const user = await requireUser()
  const tripId = formData.get('tripId') as string
  const label = formData.get('label') as string
  const amount = parseFloat(formData.get('amount') as string)
  const category = formData.get('category') as string || 'General'

  if (!tripId || !label || isNaN(amount)) {
    throw new Error('Missing or invalid fields')
  }

  // Verify ownership
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: user.id }
  })
  if (!trip) throw new Error('Unauthorized')

  await prisma.budgetEntry.create({
    data: {
      tripId,
      label,
      amount,
      category,
    }
  })

  revalidatePath(`/trips/${tripId}`)
}

export async function deleteBudgetEntryAction(entryId: string) {
  const user = await requireUser()
  
  const entry = await prisma.budgetEntry.findUnique({
    where: { id: entryId },
    include: { trip: true }
  })

  if (!entry || entry.trip.userId !== user.id) {
    throw new Error('Unauthorized')
  }

  await prisma.budgetEntry.delete({
    where: { id: entryId }
  })

  revalidatePath(`/trips/${entry.tripId}`)
}
