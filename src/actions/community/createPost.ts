'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'

interface CreatePostInput {
  content: string
  location?: string
  imageUrl?: string
}

export async function createPost(input: CreatePostInput) {
  const user = await getCurrentUser()

  if (!user) {
    return { success: false, error: 'You must be signed in to post.' }
  }

  const content = input.content?.trim()
  if (!content || content.length > 500) {
    return { success: false, error: 'Post content must be between 1 and 500 characters.' }
  }

  // Validate imageUrl is a proper URL if provided
  if (input.imageUrl) {
    try {
      const url = new URL(input.imageUrl)
      if (!['http:', 'https:'].includes(url.protocol)) {
        return { success: false, error: 'Image URL must use http or https.' }
      }
    } catch {
      return { success: false, error: 'Invalid image URL.' }
    }
  }

  await prisma.communityPost.create({
    data: {
      userId: user.id,
      content,
      location: input.location?.trim() || null,
      imageUrl: input.imageUrl?.trim() || null,
    },
  })

  revalidatePath('/communityTab')
  revalidatePath('/(app)/community')

  return { success: true }
}
