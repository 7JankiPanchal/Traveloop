import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { ItineraryModule } from '@/components/trips/detail/ItineraryModule'
import { Map, ArrowLeft, Plus } from 'lucide-react'

export default async function TripItineraryPage({ 
  params 
}: { 
  params: Promise<{ tripId: string }> 
}) {
  const { tripId } = await params
  const user = await getCurrentUser()

  if (!user) return null

  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: user.id },
    include: {
      stops: {
        include: { city: true },
        orderBy: { sortOrder: 'asc' }
      }
    }
  })

  if (!trip) return <div>Trip not found</div>

  const stops = serialize(trip.stops)

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <a 
            href={`/trips/${tripId}`}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </a>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Map className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-on-surface tracking-tight">Full Itinerary</h1>
          </div>
          <p className="text-on-surface-variant max-w-lg">
            Detailed breakdown of your journey to <span className="text-primary font-bold">{trip.title}</span>.
          </p>
        </div>

        <a 
          href={`/trips/${tripId}/builder`}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Edit Stops
        </a>
      </div>

      <div className="max-w-3xl">
        <ItineraryModule stops={stops} tripId={tripId} />
      </div>
    </div>
  )
}
