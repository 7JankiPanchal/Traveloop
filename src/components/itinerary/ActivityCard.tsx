'use client'

import { useState, useTransition } from 'react'
import { deleteActivity } from '@/actions/activity/deleteActivity'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ActivityForm } from './ActivityForm'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { StopActivityWithDetail } from '@/types/itinerary'

interface ActivityCardProps {
  stopActivity: StopActivityWithDetail
  tripId: string
  stopId: string
}

const categoryColors: Record<string, 'default' | 'accent' | 'green' | 'blue' | 'red'> = {
  Food: 'accent',
  Transport: 'blue',
  Nature: 'green',
  Culture: 'blue',
  Adventure: 'red',
}

export function ActivityCard({ stopActivity, tripId, stopId }: ActivityCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { activity } = stopActivity
  const cost = Number(stopActivity.costOverride ?? activity.baseCost ?? 0)
  const cat = activity.category ?? 'Other'

  function handleDelete() {
    startTransition(() => deleteActivity(tripId, stopId, stopActivity.id))
  }

  if (isEditing) {
    return (
      <div className="p-4 bg-white/5">
        <ActivityForm
          tripId={tripId}
          stopId={stopId}
          existingStopActivity={stopActivity}
          onSuccess={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 group hover:bg-white/[0.03] transition-colors">
      <div className="w-2 h-2 rounded-full bg-orange-500/60 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white truncate">{activity.name}</span>
          <Badge label={cat} variant={categoryColors[cat] ?? 'default'} />
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
          {stopActivity.scheduledDate && <span>{formatDate(stopActivity.scheduledDate)}</span>}
          {activity.durationMinutes && <span>{activity.durationMinutes}m</span>}
          {cost > 0 && <span className="text-emerald-400">{formatCurrency(cost)}</span>}
        </div>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
        <Button variant="danger" size="sm" onClick={handleDelete} isLoading={isPending}>✕</Button>
      </div>
    </div>
  )
}
