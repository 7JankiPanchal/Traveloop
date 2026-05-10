'use client'

import { motion } from 'motion/react'
import { Calendar, MapPin, Share2, MoreVertical } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface TripHeroProps {
  trip: any
}

export function TripHero({ trip }: TripHeroProps) {
  // Determine search query for dynamic image
  const destinationQuery = trip.title || (trip.stops && trip.stops[0]?.city?.name) || 'travel'
  
  // Use a dynamic Unsplash search URL that works without API key for display
  const dynamicCover = trip.coverPhotoUrl || `https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop` 
  
  // Actually, to truly match the country, we can use keywords
  const countryImageMap: Record<string, string> = {
    'India': 'https://images.unsplash.com/photo-1524492707947-2f85a514d735?q=80&w=2071&auto=format&fit=crop',
    'Japan': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    'France': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
    'Italy': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070&auto=format&fit=crop',
    'Greece': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2021&auto=format&fit=crop'
  }

  const coverImage = trip.coverPhotoUrl || countryImageMap[trip.title] || countryImageMap[trip.stops?.[0]?.city?.name] || dynamicCover

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
      <div className="absolute inset-0 bg-gradient-to-t from-surface-bright via-surface-bright/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface-bright/60 via-transparent to-surface-bright/60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-12 px-8">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="px-4 py-1.5 bg-primary rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20">
              Active Journey
            </div>
            {trip.isPublic && (
              <div className="px-4 py-1.5 bg-surface-container/50 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-on-surface border border-outline">
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
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-on-surface leading-tight">
                {trip.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-on-surface-variant">
                <div className="flex items-center gap-2 font-medium">
                  <Calendar className="w-5 h-5 text-primary" />
                  {trip.startDate ? (
                    <span>{formatDate(trip.startDate)} → {formatDate(trip.endDate)}</span>
                  ) : (
                    <span>Dates not set</span>
                  )}
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <MapPin className="w-5 h-5 text-primary" />
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
              <button className="p-4 bg-surface-container/80 hover:bg-surface-container backdrop-blur-xl rounded-2xl border border-outline text-on-surface transition-all">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="p-4 bg-surface-container/80 hover:bg-surface-container backdrop-blur-xl rounded-2xl border border-outline text-on-surface transition-all">
                <MoreVertical className="w-6 h-6" />
              </button>
              <a href={`/trips/${trip.id}/builder`} className="px-8 py-4 bg-on-surface text-surface-bright font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
                Edit Trip
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
