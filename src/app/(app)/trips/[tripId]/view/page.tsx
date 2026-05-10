import { notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getItinerary } from '@/services/itinerary/getItinerary'
import { transformItinerary } from '@/services/itinerary/transformItinerary'
import { ItineraryTimeline } from '@/components/itinerary/ItineraryTimeline'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDate, serialize } from '@/lib/utils'
import { TripTabs } from '@/components/trips/TripTabs'
import Link from 'next/link'

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-on-surface tracking-tight">{trip.title}</h1>
            <p className="text-on-surface-variant text-sm mt-1 flex items-center gap-2">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-lg font-medium">{trip.stops.length} stops</span>
              <span className="text-outline">·</span>
              <span className="text-green-600 font-semibold">{formatCurrency(data.totals.overall)} total</span>
              {trip.startDate && (
                <>
                  <span className="text-outline">·</span>
                  <span>{formatDate(trip.startDate)} → {formatDate(trip.endDate)}</span>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/trips/${tripId}/builder`}>
              <Button variant="secondary" size="sm" className="bg-surface-container hover:bg-surface-container-high border-outline-variant">
                Edit Builder
              </Button>
            </Link>
          </div>
        </div>
        
        <TripTabs tripId={tripId} />
      </div>

      {/* Cost breakdown */}
      {Object.keys(data.totals.byCategory).length > 0 && (
        <div className="rounded-2xl bg-surface-container border border-outline-variant p-5">
          <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4 opacity-70">Spending by Category</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(data.totals.byCategory).map(([cat, amt]) => (
              <div key={cat} className="bg-surface-bright border border-outline-variant rounded-xl px-4 py-2.5 text-sm shadow-sm">
                <span className="text-on-surface-variant font-medium">{cat}</span>
                <span className="text-on-surface font-bold ml-3 text-base">{formatCurrency(amt as number)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="pt-2">
        <ItineraryTimeline data={data} />
      </div>
    </div>
  )
}

