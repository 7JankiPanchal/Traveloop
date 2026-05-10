'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addPackingItem(tripId: string, label: string, category: string = 'General') {
  try {
    const item = await prisma.packingItem.create({
      data: {
        tripId,
        label,
        category,
        isPacked: false,
      },
    })
    revalidatePath(`/trips/${tripId}`)
    revalidatePath(`/trips/${tripId}/packing`)
    revalidatePath('/trips')
    return { success: true, item }
  } catch (error) {
        return { success: false, error: 'Failed to add item' }
  }
}

export async function togglePackingItem(tripId: string, itemId: string, isPacked: boolean) {
  try {
    await prisma.packingItem.update({
      where: { id: itemId },
      data: { isPacked },
    })
    revalidatePath(`/trips/${tripId}`)
    revalidatePath(`/trips/${tripId}/packing`)
    revalidatePath('/trips')
    return { success: true }
  } catch (error) {
        return { success: false, error: 'Failed to update item' }
  }
}

export async function deletePackingItem(tripId: string, itemId: string) {
  try {
    await prisma.packingItem.delete({
      where: { id: itemId },
    })
    revalidatePath(`/trips/${tripId}`)
    revalidatePath(`/trips/${tripId}/packing`)
    revalidatePath('/trips')
    return { success: true }
  } catch (error) {
        return { success: false, error: 'Failed to delete item' }
  }
}
