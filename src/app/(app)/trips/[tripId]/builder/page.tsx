import { notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getItinerary } from '@/services/itinerary/getItinerary'
import { StopList } from '@/components/itinerary/StopList'
import { StopForm } from '@/components/itinerary/StopForm'
import { Button } from '@/components/ui/Button'
import { formatDate, formatCurrency, serialize } from '@/lib/utils'
import type { StopWithActivities } from '@/types/itinerary'

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
    <div className="space-y-6">
      {/* Trip header */}
      <div className="rounded-2xl bg-surface-bright border border-outline-variant p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-on-surface">{trip.title}</h1>
            {trip.description && <p className="text-on-surface-variant mt-1 text-sm">{trip.description}</p>}
            <div className="flex items-center gap-4 mt-2 text-sm text-outline">
              {trip.startDate && <span>{formatDate(trip.startDate)} → {formatDate(trip.endDate)}</span>}
              {budget > 0 && <span>Budget: {formatCurrency(budget)}</span>}
              <span>{trip.stops.length} stops</span>
            </div>
          </div>
          <a href={`/trips/${tripId}/view`}>
            <Button variant="secondary" size="sm">View Timeline →</Button>
          </a>
        </div>
      </div>

      {/* Stop list */}
      <StopList tripId={tripId} initialStops={JSON.parse(JSON.stringify(trip.stops)) as StopWithActivities[]} />

      {/* Add stop section */}
      <div className="rounded-2xl border border-dashed border-outline-variant p-6">
        <h2 className="text-sm font-semibold text-on-surface-variant mb-4 uppercase tracking-wider">Add Another Stop</h2>
        <StopForm tripId={tripId} />
      </div>
    </div>
  )
}
