'use server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { revalidatePath } from 'next/cache'

export async function createCommunityPost(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const content = formData.get('content') as string
  const location = formData.get('location') as string
  const imageUrl = formData.get('imageUrl') as string

  if (!content) throw new Error('Content is required')

  try {
    await prisma.communityPost.create({
      data: {
        content,
        location: location || null,
        imageUrl: imageUrl || null,
        userId: user.id
      }
    })
    
    revalidatePath('/community')
    return { success: true }
  } catch (error) {
    // Error log suppressed for production
    return { success: false, error: 'Failed to create post' }
  }
}
