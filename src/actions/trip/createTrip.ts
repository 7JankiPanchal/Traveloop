'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/auth/getCurrentUser'

export async function createTripAction(formData: FormData) {
  const user = await requireUser()
  const title = formData.get('title') as string
  const startDateStr = formData.get('startDate') as string
  const endDateStr = formData.get('endDate') as string
  const cityName = formData.get('cityName') as string
  const country = formData.get('country') as string

  if (!title || title.trim() === '') {
    throw new Error('Title is required')
  }

  const startDate = startDateStr ? new Date(startDateStr) : null
  const endDate = endDateStr ? new Date(endDateStr) : null

  const trip = await prisma.trip.create({
    data: {
      userId: user.id,
      title: title.trim(),
      isPublic: false,
      startDate,
      endDate,
      stops: cityName ? {
        create: {
          cityName: cityName.trim(),
          country: country?.trim() || null,
          sortOrder: 0,
        }
      } : undefined
    },
  })

  revalidatePath('/trips')
  redirect(`/trips/${trip.id}/builder`)
}
