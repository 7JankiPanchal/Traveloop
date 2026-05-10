'use client'

import { useState, useTransition, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { reorderStops } from '@/actions/stop/reorderStops'
import { StopCard } from './StopCard'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import type { StopWithActivities } from '@/types/itinerary'

interface StopListProps {
  tripId: string
  initialStops: StopWithActivities[]
}

export function StopList({ tripId, initialStops }: StopListProps) {
  const [stops, setStops] = useState(initialStops)
  const [isPending, startTransition] = useTransition()

  // Sync state with props when initialStops changes (e.g. after revalidation)
  useEffect(() => {
    setStops(initialStops)
  }, [initialStops])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = stops.findIndex((s) => s.id === active.id)
    const newIndex = stops.findIndex((s) => s.id === over.id)
    const reordered = arrayMove(stops, oldIndex, newIndex)

    // Optimistic update
    setStops(reordered)

    // Persist
    startTransition(async () => {
      await reorderStops(tripId, reordered.map((s) => s.id))
    })
  }

  if (stops.length === 0) {
    return (
      <EmptyState
        icon="✈️"
        title="No stops yet"
        description="Add your first city to start building your itinerary."
      />
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={stops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {stops.map((stop, index) => (
            <StopCard
              key={stop.id}
              stop={stop}
              tripId={tripId}
              index={index}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
