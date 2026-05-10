'use client'

import { motion } from 'motion/react'
import { Wallet, MapPin, FileText, TrendingUp, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface TripInsightsProps {
  activeTrip: any
}

export function TripInsights({ activeTrip }: TripInsightsProps) {
  if (!activeTrip) return null

  // Calculate budget stats
  const totalSpent = activeTrip.budgetEntries?.reduce((sum: number, entry: any) => sum + Number(entry.amount), 0) || 0
  const budgetLimit = Number(activeTrip.budgetLimit) || 1
  const spentPercentage = Math.min((totalSpent / budgetLimit) * 100, 100)
  
  // Find next stop
  const nextStop = activeTrip.stops?.sort((a: any, b: any) => a.sortOrder - b.sortOrder)[0]
  
  // Latest note
  const latestNote = activeTrip.noteItems?.[0]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Budget Insight */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-[32px] bg-surface border border-outline-variant space-y-4 hover:border-primary/30 transition-all group"
      >
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Live Budget</span>
        </div>
        
        <div>
          <h3 className="text-2xl font-black text-on-surface">₹{totalSpent.toLocaleString()}</h3>
          <p className="text-xs text-on-surface-variant mt-1">Spent out of ₹{budgetLimit.toLocaleString()}</p>
        </div>

        <div className="space-y-2">
          <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${spentPercentage}%` }}
              className="h-full bg-gradient-to-r from-primary to-orange-500"
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase">
            <span>{Math.round(spentPercentage)}% Used</span>
            <span>₹{(budgetLimit - totalSpent).toLocaleString()} Left</span>
          </div>
        </div>
      </motion.div>

      {/* Next Stop Insight */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-[32px] bg-surface border border-outline-variant space-y-4 hover:border-blue-500/30 transition-all group"
      >
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Next Stop</span>
        </div>

        {nextStop ? (
          <div>
            <h3 className="text-2xl font-black text-on-surface group-hover:text-blue-600 transition-colors">
              {nextStop.cityName}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">{nextStop.country || 'Upcoming destination'}</p>
          </div>
        ) : (
          <p className="text-sm text-on-surface-variant">No upcoming stops scheduled.</p>
        )}

        <a href={`/trips/${activeTrip.id}/builder`} className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
          View Full Itinerary <ChevronRight className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Recent Notes Insight */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-[32px] bg-surface border border-outline-variant space-y-4 hover:border-purple-500/30 transition-all group"
      >
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Recent Notes</span>
        </div>

        {latestNote ? (
          <div className="space-y-1">
            <p className="text-sm text-on-surface font-medium line-clamp-2">
              "{latestNote.body}"
            </p>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold">
              {formatDate(latestNote.createdAt)}
            </p>
          </div>
        ) : (
          <p className="text-sm text-on-surface-variant">No notes added to this trip yet.</p>
        )}

        <button className="flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors">
          Add Note <TrendingUp className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  )
}
