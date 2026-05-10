import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch Featured Cities
  const featuredCities = await prisma.city.findMany({
    orderBy: { popularityScore: 'desc' },
    take: 5
  })

  // Fetch User Trips
  const userTrips = await prisma.trip.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      stops: true,
      budgetEntries: true,
      noteItems: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  })

  // Find the active trip
  const now = new Date()
  const activeTrip = userTrips.find(t => 
    t.startDate && t.endDate && t.startDate <= now && t.endDate >= now
  ) || userTrips[0]

  return NextResponse.json({
    trips: serialize(userTrips),
    featuredCities: serialize(featuredCities),
    activeTrip: serialize(activeTrip)
  })
}
