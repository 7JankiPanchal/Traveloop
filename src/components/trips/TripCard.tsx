'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteTripAction } from '@/actions/trip/deleteTrip'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import type { Trip, Stop } from '@/lib/generated/prisma/client'

interface TripCardProps {
  trip: Trip & { stops?: Stop[] }
}

export function TripCard({ trip }: TripCardProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTripAction(trip.id)
      setIsDeleting(false)
      router.refresh()
    })
  }

  return (
    <div className="group block rounded-2xl bg-[#1a1d2e] border border-white/5 p-5 hover:border-orange-500/50 transition-colors relative overflow-hidden">
      {/* Clickable area for navigating to the builder */}
      <a href={`/trips/${trip.id}/builder`} className="absolute inset-0 z-0"></a>

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-white group-hover:text-orange-400 transition-colors">
            {trip.title}
          </h3>
          {trip.description && <p className="text-sm text-slate-400 mt-1">{trip.description}</p>}
        </div>

        {/* Delete UI */}
        {isDeleting ? (
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => setIsDeleting(false)} disabled={isPending}>Cancel</Button>
            <Button size="sm" onClick={handleDelete} isLoading={isPending} className="bg-red-500 hover:bg-red-600 text-white">
              Confirm Delete
            </Button>
          </div>
        ) : (
          <button 
            onClick={(e) => { e.preventDefault(); setIsDeleting(true); }}
            className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
            title="Delete Trip"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
        )}
      </div>
      
      <div className="relative z-10 flex items-center gap-4 mt-4 text-xs font-medium text-slate-500">
        <span>{trip.stops?.length ?? 0} stops</span>
        {trip.startDate && <span>{formatDate(trip.startDate)}</span>}
        <span className="ml-auto text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
          Open Builder →
        </span>
      </div>
    </div>
  )
}
