import prisma from '@/lib/prisma'
import type { Activity } from '@/lib/generated/prisma/client'

/**
 * Searches the local Activity table.
 * Returns mock seed data when the table is empty (development convenience).
 */
export async function searchActivities(
  query: string,
  category?: string,
  maxCost?: number,
  cityId?: string,
  limit = 12
): Promise<Activity[]> {
  const results = await prisma.activity.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
              ],
            }
          : {},
        category ? { category: { equals: category, mode: 'insensitive' } } : {},
        maxCost ? { baseCost: { lte: maxCost } } : {},
        cityId ? { cityId } : {},
      ],
    },
    take: limit,
    orderBy: { name: 'asc' },
  })

  return results
}
