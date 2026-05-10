import type {
  TripWithStops,
  StopGroup,
  DayGroup,
  ItineraryTotals,
  ItineraryData,
  StopActivityWithDetail,
} from '@/types/itinerary'

function toNumber(val: unknown): number {
  if (val == null) return 0
  return typeof val === 'object' && 'toNumber' in (val as object)
    ? (val as { toNumber(): number }).toNumber()
    : Number(val)
}

function eachDayBetween(start: Date, end: Date): Date[] {
  const days: Date[] = []
  const cur = new Date(start)
  while (cur <= end) {
    days.push(new Date(cur))
    cur.setDate(cur.getDate() + 1)
  }
  return days
}

function isoDate(d: Date): string {
  return d.toISOString().split('T')[0]
}

/** Server-side transformation — avoids heavy client-side processing. */
export function transformItinerary(trip: TripWithStops): ItineraryData {
  // ── Per-stop groups ──────────────────────────────────────────────────────
  const groupedByStop: StopGroup[] = trip.stops.map((stop) => {
    const total = stop.stopActivities.reduce((sum, sa) => {
      const cost = toNumber(sa.costOverride ?? sa.activity.baseCost)
      return sum + cost
    }, 0)
    return { stop, total }
  })

  // ── Per-day groups ───────────────────────────────────────────────────────
  const groupedByDay: DayGroup[] = []
  let dayCounter = 1

  for (const stop of trip.stops) {
    if (!stop.arriveDate || !stop.departDate) {
      // Stop has no dates — put all activities under a single 'undated' entry
      groupedByDay.push({
        date: '',
        label: 'Undated',
        stopId: stop.id,
        cityName: stop.cityName,
        activities: stop.stopActivities,
        dayTotal: stop.stopActivities.reduce(
          (s, sa) => s + toNumber(sa.costOverride ?? sa.activity.baseCost),
          0
        ),
      })
      continue
    }

    const days = eachDayBetween(
      new Date(stop.arriveDate),
      new Date(stop.departDate)
    )

    for (const day of days) {
      const dateStr = isoDate(day)
      const activities = stop.stopActivities.filter(
        (sa) => sa.scheduledDate && isoDate(new Date(sa.scheduledDate)) === dateStr
      )
      groupedByDay.push({
        date: dateStr,
        label: `Day ${dayCounter++}`,
        stopId: stop.id,
        cityName: stop.cityName,
        activities,
        dayTotal: activities.reduce(
          (s, sa) => s + toNumber(sa.costOverride ?? sa.activity.baseCost),
          0
        ),
      })
    }
  }

  // ── Totals ───────────────────────────────────────────────────────────────
  const perStop: Record<string, number> = {}
  const byCategory: Record<string, number> = {}
  let overall = 0

  for (const { stop, total } of groupedByStop) {
    perStop[stop.id] = total
    overall += total
    for (const sa of stop.stopActivities) {
      const cat = sa.activity.category ?? 'Uncategorized'
      const cost = toNumber(sa.costOverride ?? sa.activity.baseCost)
      byCategory[cat] = (byCategory[cat] ?? 0) + cost
    }
  }

  const totals: ItineraryTotals = { overall, perStop, byCategory }

  return { trip, groupedByStop, groupedByDay, totals }
}
