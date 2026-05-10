import prisma from '@/lib/prisma'
import type { Activity } from '@/lib/generated/prisma/client'

/**
 * Searches the local Activity table.
 * Returns mock seed data when the table is empty (development convenience).
 */
export async function searchActivities(
  query: string,
  limit = 12
): Promise<Activity[]> {
  const results = await prisma.activity.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } },
          ],
        }
      : undefined,
    take: limit,
    orderBy: { name: 'asc' },
  })

  return results
}
