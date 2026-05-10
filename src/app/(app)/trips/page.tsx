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

  // Find the active trip (e.g., currently happening or most recent)
  const now = new Date()
  const activeTrip = userTrips.find(t => 
    t.startDate && t.endDate && t.startDate <= now && t.endDate >= now
  ) || userTrips[0] // Fallback to most recent

  const trips = serialize(userTrips)
  const cities = serialize(featuredCities)

  // Banner image - could be dynamic or fixed
  const bannerImage = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"

  return (
    <div className="max-w-7xl mx-auto px-6 relative pb-24 space-y-12">
      {/* Header (Traveloop Logo & Profile handled by layout.tsx) */}
      
      {/* Banner Image */}
      <Banner 
        image={bannerImage} 
        title="Explore the World" 
        subtitle="Discover hidden gems and plan your next big adventure"
      />

      {/* Search & Filter Bar */}
      <FilterBar />

      {/* Trip Insights (Budget, Itinerary, Notes) */}
      {activeTrip && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white whitespace-nowrap">Current Adventure Insights</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>
          <TripInsights activeTrip={serialize(activeTrip)} />
        </section>
      )}

      {/* Top Regional Selections */}
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

      {/* Previous Trips */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white whitespace-nowrap">Previous Trips</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </div>

        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip: any) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No trips planned yet" 
            description="Start by exploring destinations or creating your first adventure."
          />
        )}
      </section>

      {/* Floating Action Button */}
      <PlanTripFAB />
    </div>
  )
}
