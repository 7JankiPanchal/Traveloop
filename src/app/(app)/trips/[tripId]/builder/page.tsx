import { notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getItinerary } from '@/services/itinerary/getItinerary'
import { StopList } from '@/components/itinerary/StopList'
import { StopForm } from '@/components/itinerary/StopForm'
import { Button } from '@/components/ui/Button'
import { formatDate, formatCurrency, serialize } from '@/lib/utils'
import type { StopWithActivities } from '@/types/itinerary'

import { TripTabs } from '@/components/trips/TripTabs'
import Link from 'next/link'

interface BuilderPageProps {
  params: Promise<{ tripId: string }>
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const { tripId } = await params
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Please sign in to view your trips.</p>
      </div>
    )
  }

  const rawTrip = await getItinerary(tripId, user.id)
  if (!rawTrip) notFound()

  const trip = serialize(rawTrip)
  const budget = Number(trip.budgetLimit ?? 0)

  return (
    <div className="space-y-8">
      {/* Trip header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-on-surface tracking-tight">{trip.title}</h1>
            {trip.description && <p className="text-on-surface-variant mt-1 text-sm">{trip.description}</p>}
            <div className="flex items-center gap-4 mt-3 text-sm">
              {trip.startDate && (
                <span className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="text-outline">📅</span>
                  {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
                </span>
              )}
              {budget > 0 && (
                <span className="flex items-center gap-1.5 text-green-600 font-medium">
                  <span className="text-outline">💰</span>
                  Budget: {formatCurrency(budget)}
                </span>
              )}
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-lg font-medium">
                {trip.stops.length} stops
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/trips/${tripId}/view`}>
              <Button variant="secondary" size="sm" className="bg-primary text-white hover:bg-primary/90 border-none shadow-md shadow-primary/20">
                View Timeline →
              </Button>
            </Link>
          </div>
        </div>

        <TripTabs tripId={tripId} />
      </div>

      {/* Stop list */}
      <div className="pt-2">
        <StopList tripId={tripId} initialStops={JSON.parse(JSON.stringify(trip.stops)) as StopWithActivities[]} />
      </div>


      {/* Add stop section */}
      <div className="rounded-2xl border border-dashed border-outline-variant p-6">
        <h2 className="text-sm font-semibold text-on-surface-variant mb-4 uppercase tracking-wider">Add Another Stop</h2>
        <StopForm tripId={tripId} />
      </div>
    </div>
  )
}
