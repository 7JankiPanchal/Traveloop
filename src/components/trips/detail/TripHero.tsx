'use client'

import { motion } from 'motion/react'
import { Calendar, MapPin, Share2, MoreVertical } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface TripHeroProps {
  trip: any
}

export function TripHero({ trip }: TripHeroProps) {
  const coverImage = trip.coverPhotoUrl || `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop`

  return (
    <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <motion.img 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        src={coverImage} 
        alt={trip.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/60 via-transparent to-[#030303]/60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-12 px-8">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="px-4 py-1.5 bg-orange-500 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20">
              Active Journey
            </div>
            {trip.isPublic && (
              <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                Public Trip
              </div>
            )}
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-tight">
                {trip.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/70">
                <div className="flex items-center gap-2 font-medium">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  {trip.startDate ? (
                    <span>{formatDate(trip.startDate)} → {formatDate(trip.endDate)}</span>
                  ) : (
                    <span>Dates not set</span>
                  )}
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>{trip.stops?.length || 0} Destinations</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-3"
            >
              <button className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/10 text-white transition-all">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/10 text-white transition-all">
                <MoreVertical className="w-6 h-6" />
              </button>
              <a href={`/trips/${trip.id}/builder`} className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
                Edit Trip
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
