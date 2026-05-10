import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { TripCard } from '@/components/trips/TripCard'
import { CityCardSmall } from '@/components/trips/CityCardSmall'
import { Banner } from '@/components/trips/Banner'
import { FilterBar } from '@/components/trips/FilterBar'
import { PlanTripFAB } from '@/components/trips/PlanTripFAB'
import { EmptyState } from '@/components/ui/EmptyState'
import { TripInsights } from '@/components/trips/TripInsights'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default async function TripsDashboard() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Please sign in to view your trips.</p>
      </div>
    )
  }

  // Fetch Featured Cities (Regional Selections)
  const featuredCities = await prisma.city.findMany({
    orderBy: { popularityScore: 'desc' },
    take: 5
  })

  // Fetch User Trips
  const userTrips = await prisma.trip.findMany({
    where: { userId: user.id },
    orderBy: { startDate: 'asc' }, // Sort by date
    include: {
      stops: true,
      budgetEntries: true,
      noteItems: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  })

  const now = new Date()
  now.setHours(0, 0, 0, 0) // Normalize to start of day

  // Categorize Trips
  const ongoingTrips = userTrips.filter(t => 
    t.startDate && t.endDate && t.startDate <= now && t.endDate >= now
  )
  
  const upcomingTrips = userTrips.filter(t => 
    !t.startDate || t.startDate > now
  )
  
  const completedTrips = userTrips.filter(t => 
    t.endDate && t.endDate < now
  )

  // Find the active trip (e.g., currently happening or most recent upcoming)
  const activeTrip = ongoingTrips[0] || upcomingTrips[0] || userTrips[0]

  const serializedOngoing = serialize(ongoingTrips)
  const serializedUpcoming = serialize(upcomingTrips)
  const serializedCompleted = serialize(completedTrips)
  const cities = serialize(featuredCities)

  // Banner image
  const bannerImage = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"

  return (
    <div className="relative pb-24 space-y-12">
      <div className="flex justify-between items-center px-8 pt-6">
        <h1 className="text-3xl font-bold text-white">My Trips</h1>
        <Link href="/trips/new">
          <Button>Create New Trip</Button>
        </Link>
      </div>

      <Banner 
        image={bannerImage} 
        title="Explore the World" 
        subtitle="Discover hidden gems and plan your next big adventure"
      />

      <FilterBar />

      {activeTrip && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white whitespace-nowrap">Current Adventure Insights</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>
          <TripInsights activeTrip={serialize(activeTrip)} />
        </section>
      )}

      {/* Ongoing Trips */}
      {serializedOngoing.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-orange-400 whitespace-nowrap">Ongoing Trips</h2>
            <div className="h-[1px] w-full bg-orange-400/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serializedOngoing.map((trip: any) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Trips */}
      {serializedUpcoming.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white whitespace-nowrap">Upcoming Trips</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serializedUpcoming.map((trip: any) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      )}

      {/* Completed Trips */}
      {serializedCompleted.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-400 whitespace-nowrap">Completed Trips</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-75">
            {serializedCompleted.map((trip: any) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      )}

      {userTrips.length === 0 && (
        <section className="space-y-6">
          <EmptyState 
            title="No trips planned yet" 
            description="Start by exploring destinations or creating your first adventure."
          />
        </section>
      )}

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white whitespace-nowrap">Top Regional Selections</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-8 px-8">
          {cities.map((city: any) => (
            <CityCardSmall key={city.id} city={city} />
          ))}
        </div>
      </section>

      <PlanTripFAB />
    </div>
  )
}
