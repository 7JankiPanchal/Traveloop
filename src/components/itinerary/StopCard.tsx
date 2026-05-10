'use client'

import { useState, useTransition } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { deleteStop } from '@/actions/stop/deleteStop'
import { ActivityCard } from './ActivityCard'
import { ActivityForm } from './ActivityForm'
import { StopForm } from './StopForm'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { StopWithActivities } from '@/types/itinerary'

interface StopCardProps {
  stop: StopWithActivities
  tripId: string
  index: number
}

export function StopCard({ stop, tripId, index }: StopCardProps) {
  const [expanded, setExpanded] = useState(true)
  const [showStopForm, setShowStopForm] = useState(false)
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: stop.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const totalCost = stop.stopActivities.reduce((sum, sa) => {
    const cost = Number(sa.costOverride ?? sa.activity.baseCost ?? 0)
    return sum + cost
  }, 0)

  function handleDelete() {
    if (!confirm('Delete this stop and all its activities?')) return
    startTransition(() => deleteStop(tripId, stop.id))
  }

  return (
    <div ref={setNodeRef} style={style} className="rounded-2xl bg-[#1a1d2e] border border-white/5 overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/20">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pr-3">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="text-slate-600 hover:text-slate-400 cursor-grab active:cursor-grabbing p-1 rounded"
          aria-label="Drag to reorder"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </button>

        {/* Stop number */}
        <div className="w-9 h-9 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold shrink-0">
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white truncate">{stop.cityName}</h3>
            {stop.country && <Badge label={stop.country} variant="default" />}
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
            {stop.arriveDate && <span>{formatDate(stop.arriveDate)} → {formatDate(stop.departDate)}</span>}
            {totalCost > 0 && <span>{formatCurrency(totalCost)}</span>}
            <span>{stop.stopActivities.length} activities</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setShowStopForm(!showStopForm)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={handleDelete} isLoading={isPending}>Delete</Button>
          <button
            className="p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Edit form */}
      {showStopForm && (
        <div className="px-4 pb-4 border-t border-white/5 pt-4">
          <StopForm
            tripId={tripId}
            existingStop={stop}
            onSuccess={() => setShowStopForm(false)}
          />
        </div>
      )}

      {/* Activities */}
      {expanded && (
        <div className="border-t border-white/5">
          {stop.stopActivities.length > 0 ? (
            <div className="divide-y divide-white/5">
              {stop.stopActivities.map((sa) => (
                <ActivityCard
                  key={sa.id}
                  stopActivity={sa}
                  tripId={tripId}
                  stopId={stop.id}
                />
              ))}
            </div>
          ) : (
            <p className="px-4 py-3 text-sm text-slate-500">No activities yet.</p>
          )}

          {/* Add activity */}
          {showActivityForm ? (
            <div className="p-4 border-t border-white/5">
              <ActivityForm
                tripId={tripId}
                stopId={stop.id}
                onSuccess={() => setShowActivityForm(false)}
              />
            </div>
          ) : (
            <div className="p-4">
              <Button variant="ghost" size="sm" onClick={() => setShowActivityForm(true)}>
                + Add Activity
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
