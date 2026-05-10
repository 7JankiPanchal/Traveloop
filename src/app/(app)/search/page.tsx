import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { SearchClient } from './SearchClient'

export default async function SearchPage() {
  const user = await getCurrentUser()

  let trips: { id: string; title: string }[] = []

  if (user) {
    const rawTrips = await prisma.trip.findMany({
      where: { 
        userId: user.id,
        // Optional: only fetch trips that haven't ended yet
        // OR: [
        //   { endDate: null },
        //   { endDate: { gte: new Date() } }
        // ]
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
      }
    })
    
    trips = rawTrips
  }

  return <SearchClient trips={trips} />
}
