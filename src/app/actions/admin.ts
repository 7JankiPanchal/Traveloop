'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'

export async function promoteToAdmin(targetUserId: string) {
  const caller = await getCurrentUser()

  if (!caller?.isAdmin) {
    return { success: false, error: 'Unauthorized.' }
  }

  if (!targetUserId || typeof targetUserId !== 'string') {
    return { success: false, error: 'Invalid user ID.' }
  }

  await prisma.user.update({
    where: { id: targetUserId },
    data: { isAdmin: true },
  })

  revalidatePath('/admin')
  return { success: true }
}

export async function deleteUser(targetUserId: string) {
  const caller = await getCurrentUser()

  if (!caller?.isAdmin) {
    return { success: false, error: 'Unauthorized.' }
  }

  if (targetUserId === caller.id) {
    return { success: false, error: 'Cannot delete your own admin account.' }
  }

  await prisma.user.delete({ where: { id: targetUserId } })

  revalidatePath('/admin')
  return { success: true }
}
