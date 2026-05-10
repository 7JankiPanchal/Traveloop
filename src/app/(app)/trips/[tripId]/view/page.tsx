import { notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getItinerary } from '@/services/itinerary/getItinerary'
import { transformItinerary } from '@/services/itinerary/transformItinerary'
import { ItineraryTimeline } from '@/components/itinerary/ItineraryTimeline'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDate, serialize } from '@/lib/utils'

interface ViewPageProps {
  params: Promise<{ tripId: string }>
}

export default async function ViewPage({ params }: ViewPageProps) {
  const { tripId } = await params
  const user = await getCurrentUser()

  if (!user) {
    return <div className="text-center py-20 text-slate-400">Please sign in.</div>
  }

  const trip = await getItinerary(tripId, user.id)
  if (!trip) notFound()

  const data = serialize(transformItinerary(trip))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">{trip.title}</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            {trip.stops.length} stops · {formatCurrency(data.totals.overall)} total
            {trip.startDate && ` · ${formatDate(trip.startDate)} → ${formatDate(trip.endDate)}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href={`/trips/${tripId}/notes`}>
            <Button variant="secondary" size="sm" className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20">
              📔 Journal
            </Button>
          </a>
          <a href={`/trips/${tripId}/builder`}>
            <Button variant="secondary" size="sm">← Edit Builder</Button>
          </a>
        </div>
      </div>

      {/* Cost breakdown */}
      {Object.keys(data.totals.byCategory).length > 0 && (
        <div className="rounded-2xl bg-surface-container border border-outline-variant p-4">
          <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">Spending by Category</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(data.totals.byCategory).map(([cat, amt]) => (
              <div key={cat} className="bg-surface border border-outline-variant rounded-xl px-3 py-2 text-sm">
                <span className="text-on-surface-variant">{cat}</span>
                <span className="text-on-surface font-semibold ml-2">{formatCurrency(amt as number)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      <ItineraryTimeline data={data} />
    </div>
  )
}
