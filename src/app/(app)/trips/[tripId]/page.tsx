import { notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { TripHero } from '@/components/trips/detail/TripHero'
import { BudgetModule } from '@/components/trips/detail/BudgetModule'
import { ItineraryModule } from '@/components/trips/detail/ItineraryModule'
import { NotesModule } from '@/components/trips/detail/NotesModule'

interface TripPageProps {
  params: Promise<{ tripId: string }>
}

export default async function TripDetailPage({ params }: TripPageProps) {
  const { tripId } = await params
  const user = await getCurrentUser()

  if (!user) {
    return <div className="text-center py-20 text-on-surface-variant">Please sign in.</div>
  }

  const trip = await prisma.trip.findUnique({
    where: { 
      id: tripId,
      userId: user.id 
    },
    include: {
      stops: {
        include: {
          city: true
        },
        orderBy: { sortOrder: 'asc' }
      },
      budgetEntries: {
        orderBy: { recordedAt: 'desc' }
      },
      noteItems: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!trip) notFound()

  const serializedTrip = serialize(trip)

  return (
    <div className="min-h-screen bg-surface-bright text-on-surface pb-20 space-y-12">
      {/* Trip Hero Section */}
      <TripHero trip={serializedTrip} />

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content - Itinerary */}
        <div className="lg:col-span-2 space-y-12">
          <section id="itinerary">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black tracking-tighter">Itinerary</h2>
              <a href={`/trips/${tripId}/builder`} className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                Edit Stops →
              </a>
            </div>
            <ItineraryModule stops={serializedTrip.stops} tripId={tripId} />
          </section>

          <section id="notes">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black tracking-tighter">Travel Journal</h2>
            </div>
            <NotesModule notes={serializedTrip.noteItems} tripId={tripId} />
          </section>
        </div>

        {/* Sidebar - Budget & Stats */}
        <div className="space-y-12">
          <section id="budget">
            <h2 className="text-3xl font-black tracking-tighter mb-8">Budget</h2>
            <BudgetModule 
              budgetLimit={Number(serializedTrip.budgetLimit)} 
              entries={serializedTrip.budgetEntries} 
              tripId={tripId} 
            />
          </section>
        </div>
      </div>
    </div>
  )
}
