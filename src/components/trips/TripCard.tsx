'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteTripAction } from '@/actions/trip/deleteTrip'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import type { Trip, Stop } from '@/lib/generated/prisma/client'
import { MapPin, Calendar, Trash2, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

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

  // Generate a plausible Unsplash image based on title or a random one
  const imageUrl = trip.coverPhotoUrl || `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop`

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative h-[450px] rounded-[40px] overflow-hidden bg-surface border border-outline-variant shadow-2xl transition-all hover:border-primary/30"
    >
      {/* Background Image */}
      <img 
        src={imageUrl} 
        alt={trip.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white">
            <MapPin className="w-3 h-3 text-primary" />
            {trip.stops?.length ?? 0} Stops
          </div>

          {!isDeleting ? (
            <button 
              onClick={(e) => { e.preventDefault(); setIsDeleting(true); }}
              className="p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => setIsDeleting(false)}
                className="px-3 py-1 bg-white/10 rounded-full text-xs text-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={isPending}
                className="px-3 py-1 bg-red-500 rounded-full text-xs text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">
              {trip.title}
            </h3>
            {trip.startDate && (
              <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                <Calendar className="w-4 h-4 text-primary" />
                {formatDate(trip.startDate)} {trip.endDate && `→ ${formatDate(trip.endDate)}`}
              </div>
            )}
          </div>

          <a 
            href={`/trips/${trip.id}`}
            className="flex items-center justify-between w-full p-5 bg-white/10 backdrop-blur-xl rounded-[24px] border border-white/10 text-white font-bold group/btn hover:bg-white/20 transition-all"
          >
            Manage Journey
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
              <ArrowRight className="w-5 h-5" />
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
