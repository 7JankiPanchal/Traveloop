'use client'

import { motion } from 'motion/react'
import { MapPin, ArrowRight, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ItineraryModuleProps {
  stops: any[]
  tripId: string
}

export function ItineraryModule({ stops, tripId }: ItineraryModuleProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-[23px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-primary/50 via-outline/30 to-transparent" />

      <div className="space-y-12">
        {stops.length > 0 ? stops.map((stop, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            key={stop.id} 
            className="relative flex gap-8 group"
          >
            {/* Stop Point */}
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-surface-bright border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <span className="text-sm font-black text-on-surface">{index + 1}</span>
              </div>
            </div>

            {/* Stop Card */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-on-surface tracking-tight group-hover:text-primary transition-colors">
                      {stop.cityName}
                    </h3>
                    {index === 0 && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase rounded-full">
                        Starting Point
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-on-surface-variant font-medium">{stop.country || 'Destination'}</p>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-bold text-outline uppercase tracking-widest bg-surface-container px-4 py-2 rounded-full border border-outline-variant">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {stop.arriveDate ? formatDate(stop.arriveDate) : 'TBD'}
                  </div>
                  <ArrowRight className="w-3 h-3" />
                  <div>{stop.departDate ? formatDate(stop.departDate) : 'TBD'}</div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-[32px] bg-surface-container border border-outline-variant hover:border-primary/50 transition-all space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-outline">
                    <MapPin className="w-3 h-3 text-primary" />
                    Planned Activities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stop.stopActivities?.length > 0 ? stop.stopActivities.map((sa: any) => (
                      <span key={sa.id} className="px-3 py-1 bg-surface-container border border-outline-variant rounded-lg text-xs text-on-surface-variant">
                        {sa.activity.name}
                      </span>
                    )) : (
                      <span className="text-xs text-outline/80">No activities added yet</span>
                    )}
                  </div>
                </div>

                <div className="p-6 rounded-[32px] bg-surface-container border border-outline-variant hover:border-primary/50 transition-all space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                    Budget Allocation
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-black text-on-surface">
                        ₹{Number(stop.estimatedBudget || 0).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-outline font-bold uppercase">Estimated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="text-center py-12 bg-surface-container rounded-[40px] border border-dashed border-outline">
            <p className="text-outline font-medium">Your journey is a blank canvas. Start adding stops!</p>
            <a href={`/trips/${tripId}/builder`} className="mt-4 inline-block text-primary font-bold hover:underline">
              Add your first stop
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
