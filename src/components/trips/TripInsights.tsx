'use client'

import { motion } from 'motion/react'
import { Wallet, MapPin, FileText, ChevronRight, MoveUpRight } from 'lucide-react'
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Budget Insight */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-[40px] bg-[#FDF9F4] border border-[#E8E1D9] flex flex-col justify-between min-h-[220px] shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE8E1] flex items-center justify-center">
            <Wallet className="w-6 h-6 text-[#A43716]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Live Budget</span>
        </div>
        
        <div className="mt-4">
          <h3 className="text-3xl font-bold text-on-surface">₹{totalSpent.toLocaleString()}</h3>
          <p className="text-xs text-on-surface-variant font-medium mt-1">Spent out of ₹{budgetLimit.toLocaleString()}</p>
        </div>

        <div className="mt-6 space-y-2">
          <div className="h-1.5 w-full bg-[#E8E1D9] rounded-full overflow-hidden">
            <div 
              style={{ width: `${spentPercentage}%` }}
              className="h-full bg-[#A43716]"
            />
          </div>
          <div className="flex justify-between text-[10px] font-black text-on-surface-variant uppercase tracking-tighter">
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
        className="p-8 rounded-[40px] bg-[#FDF9F4] border border-[#E8E1D9] flex flex-col justify-between min-h-[220px] shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-[#E1EEFF] flex items-center justify-center">
            <MapPin className="w-6 h-6 text-[#165BA4]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Next Stop</span>
        </div>

        <div className="mt-4">
          <h3 className="text-3xl font-bold text-on-surface">
            {nextStop?.cityName || 'TBA'}
          </h3>
          <p className="text-xs text-on-surface-variant font-medium mt-1">{nextStop?.country || 'Upcoming destination'}</p>
        </div>

        <div className="mt-6">
          <a href={`/trips/${activeTrip.id}/builder`} className="flex items-center gap-2 text-xs font-black text-[#165BA4] uppercase tracking-wider hover:opacity-70 transition-all">
            View Full Itinerary <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      {/* Recent Notes Insight */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-[40px] bg-[#FDF9F4] border border-[#E8E1D9] flex flex-col justify-between min-h-[220px] shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-[#F0E1FF] flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#7E16A4]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Recent Notes</span>
        </div>

        <div className="mt-4">
          <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
            {latestNote ? `"${latestNote.body}"` : 'No notes added to this trip yet.'}
          </p>
        </div>

        <div className="mt-6">
          <button className="flex items-center gap-2 text-xs font-black text-[#7E16A4] uppercase tracking-wider hover:opacity-70 transition-all">
            Add Note <MoveUpRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
