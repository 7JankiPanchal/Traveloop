'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { ItineraryData, GroupMode, ItineraryFilters } from '@/types/itinerary'

interface ItineraryTimelineProps {
  data: ItineraryData
}

export function ItineraryTimeline({ data }: ItineraryTimelineProps) {
  const [filters, setFilters] = useState<ItineraryFilters>({
    searchQuery: '',
    cityFilter: null,
    categoryFilter: null,
    groupMode: 'stop',
    sortMode: 'date',
  })

  const cities = useMemo(() => [...new Set(data.trip.stops.map((s) => s.cityName))], [data])

  const allCategories = useMemo(() => {
    const cats = new Set<string>()
    data.trip.stops.forEach((s) =>
      s.stopActivities.forEach((sa) => {
        if (sa.activity.category) cats.add(sa.activity.category)
      })
    )
    return [...cats]
  }, [data])

  const filteredStops = useMemo(() => {
    return data.groupedByStop
      .filter((sg) => !filters.cityFilter || sg.stop.cityName === filters.cityFilter)
      .map((sg) => ({
        ...sg,
        stop: {
          ...sg.stop,
          stopActivities: sg.stop.stopActivities.filter((sa) => {
            const matchesCategory = !filters.categoryFilter || sa.activity.category === filters.categoryFilter
            const matchesQuery =
              !filters.searchQuery ||
              sa.activity.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
            return matchesCategory && matchesQuery
          }),
        },
      }))
      .filter((sg) => sg.stop.stopActivities.length > 0 || !filters.searchQuery)
  }, [data, filters])

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur border-b border-outline-variant px-6 py-3 -mx-6 flex flex-wrap gap-3 items-center">
        <input
          type="search"
          placeholder="Search activities…"
          value={filters.searchQuery}
          onChange={(e) => setFilters((f) => ({ ...f, searchQuery: e.target.value }))}
          className="h-9 bg-surface-container border border-outline rounded-xl px-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-48"
        />
        <select
          value={filters.cityFilter ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, cityFilter: e.target.value || null }))}
          className="h-9 bg-surface-container border border-outline rounded-xl px-3 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Cities</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={filters.categoryFilter ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, categoryFilter: e.target.value || null }))}
          className="h-9 bg-surface-container border border-outline rounded-xl px-3 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Categories</option>
          {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="ml-auto text-sm text-on-surface-variant">
          Total: <span className="text-on-surface font-semibold">{formatCurrency(data.totals.overall)}</span>
        </div>
      </div>

      {/* Timeline */}
      {filteredStops.map(({ stop, total }) => (
        <div key={stop.id} className="relative">
          {/* Stop header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-primary shrink-0" />
            <h3 className="font-semibold text-on-surface">{stop.cityName}</h3>
            {stop.country && <span className="text-on-surface-variant text-sm">{stop.country}</span>}
            {stop.arriveDate && (
              <span className="text-outline text-xs">
                {formatDate(stop.arriveDate)} → {formatDate(stop.departDate)}
              </span>
            )}
            <span className="ml-auto text-sm text-green-600 font-medium">{formatCurrency(total)}</span>
          </div>

          {/* Activities */}
          <div className="ml-6 border-l-2 border-outline-variant pl-6 space-y-2">
            {stop.stopActivities.length === 0 ? (
              <p className="text-outline text-sm py-2">No activities match filters.</p>
            ) : (
              stop.stopActivities.map((sa) => {
                const cost = Number(sa.costOverride ?? sa.activity.baseCost ?? 0)
                return (
                  <div key={sa.id} className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-surface-bright border border-outline-variant">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-on-surface font-medium">{sa.activity.name}</span>
                      {sa.activity.description && (
                        <p className="text-xs text-on-surface-variant mt-0.5 truncate">{sa.activity.description}</p>
                      )}
                    </div>
                    {sa.activity.category && <Badge label={sa.activity.category} variant="default" />}
                    {sa.activity.durationMinutes && (
                      <span className="text-xs text-outline">{sa.activity.durationMinutes}m</span>
                    )}
                    {cost > 0 && <span className="text-xs text-green-600 font-medium">{formatCurrency(cost)}</span>}
                  </div>
                )
              })
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
