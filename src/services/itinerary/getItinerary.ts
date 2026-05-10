import prisma from '@/lib/prisma'
import type { TripWithStops } from '@/types/itinerary'

/**
 * Fetches a full trip with ordered stops and their activities.
 * Validates that the trip belongs to the requesting user.
 */
export async function getItinerary(
  tripId: string,
  userId: string
): Promise<TripWithStops | null> {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    include: {
      stops: {
        orderBy: { sortOrder: 'asc' },
        include: {
          stopActivities: {
            include: { activity: true },
            orderBy: [
              { scheduledDate: 'asc' },
              { scheduledTime: 'asc' },
            ],
          },
        },
      },
    },
  })

  return trip as TripWithStops | null
}
