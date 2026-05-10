'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'

export async function createTripAction(formData: FormData) {
  const user = await requireUser()
  const title = formData.get('title') as string

  if (!title || title.trim() === '') {
    throw new Error('Title is required')
  }

  const trip = await prisma.trip.create({
    data: {
      userId: user.id,
      title: title.trim(),
      isPublic: false,
    },
  })

  revalidatePath('/trips')
  redirect(`/trips/${trip.id}/builder`)
}
