'use client'

import { useState } from 'react'
import { Plus, X, Plane } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { createTripAction } from '@/actions/trip/createTrip'

export function PlanTripFAB() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[300px] bg-[#1a1a1c] border border-white/10 rounded-[32px] p-6 shadow-2xl shadow-black/50 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-purple-500" />
            <h3 className="text-white font-bold mb-4">Start New Journey</h3>
            
            <form action={createTripAction} className="space-y-4">
              <input
                name="title"
                placeholder="Where to next? (e.g. Kyoto)"
                required
                autoFocus
                className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
              <button 
                type="submit"
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                <Plane className="w-4 h-4" />
                Plan Trip
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${
          isOpen ? 'bg-white text-black' : 'bg-orange-500 text-white shadow-orange-500/20'
        }`}
      >
        {isOpen ? <X /> : <Plus className="w-8 h-8" />}
      </motion.button>
    </div>
  )
}
