'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'

export async function createNoteAction(formData: FormData) {
  const user = await requireUser()
  const tripId = formData.get('tripId') as string
  const stopId = formData.get('stopId') as string || null
  const body = formData.get('body') as string

  if (!tripId || !body) throw new Error('Missing fields')

  // Verify ownership
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: user.id }
  })
  if (!trip) throw new Error('Unauthorized')

  await prisma.note.create({
    data: {
      tripId,
      stopId,
      body,
    }
  })

  revalidatePath(`/trips/${tripId}/notes`)
}

export async function updateNoteAction(noteId: string, body: string) {
  const user = await requireUser()
  
  const note = await prisma.note.findUnique({
    where: { id: noteId },
    include: { trip: true }
  })

  if (!note || note.trip.userId !== user.id) throw new Error('Unauthorized')

  await prisma.note.update({
    where: { id: noteId },
    data: { body }
  })

  revalidatePath(`/trips/${note.tripId}/notes`)
}

export async function deleteNoteAction(noteId: string) {
  const user = await requireUser()
  
  const note = await prisma.note.findUnique({
    where: { id: noteId },
    include: { trip: true }
  })

  if (!note || note.trip.userId !== user.id) throw new Error('Unauthorized')

  await prisma.note.delete({
    where: { id: noteId }
  })

  revalidatePath(`/trips/${note.tripId}/notes`)
}
