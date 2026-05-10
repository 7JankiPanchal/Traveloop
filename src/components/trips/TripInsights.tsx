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
        className="p-6 rounded-[32px] bg-[#1a1d2e] border border-white/5 space-y-4 hover:border-orange-500/30 transition-all group"
      >
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-orange-500" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live Budget</span>
        </div>
        
        <div>
          <h3 className="text-2xl font-black text-white">₹{totalSpent.toLocaleString()}</h3>
          <p className="text-xs text-slate-400 mt-1">Spent out of ₹{budgetLimit.toLocaleString()}</p>
        </div>

        <div className="space-y-2">
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${spentPercentage}%` }}
              className="h-full bg-gradient-to-r from-orange-500 to-red-500"
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
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
        className="p-6 rounded-[32px] bg-[#1a1d2e] border border-white/5 space-y-4 hover:border-blue-500/30 transition-all group"
      >
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-blue-500" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Next Stop</span>
        </div>

        {nextStop ? (
          <div>
            <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
              {nextStop.cityName}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{nextStop.country || 'Upcoming destination'}</p>
          </div>
        ) : (
          <p className="text-sm text-slate-500">No upcoming stops scheduled.</p>
        )}

        <a href={`/trips/${activeTrip.id}/builder`} className="flex items-center gap-2 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors">
          View Full Itinerary <ChevronRight className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Recent Notes Insight */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-[32px] bg-[#1a1d2e] border border-white/5 space-y-4 hover:border-purple-500/30 transition-all group"
      >
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-purple-500" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Recent Notes</span>
        </div>

        {latestNote ? (
          <div className="space-y-1">
            <p className="text-sm text-white font-medium line-clamp-2">
              "{latestNote.body}"
            </p>
            <p className="text-[10px] text-slate-500 uppercase font-bold">
              {formatDate(latestNote.createdAt)}
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-500">No notes added to this trip yet.</p>
        )}

        <button className="flex items-center gap-2 text-xs font-bold text-purple-500 hover:text-purple-400 transition-colors">
          Add Note <TrendingUp className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  )
}
