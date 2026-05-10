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
            className="absolute bottom-20 right-0 w-[300px] bg-surface border border-outline-variant rounded-[32px] p-6 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500" />
            <h3 className="text-on-surface font-bold mb-4">Start New Journey</h3>
            
            <form action={createTripAction} className="space-y-4">
              <input
                name="title"
                placeholder="Where to next? (e.g. Kyoto)"
                required
                autoFocus
                className="w-full h-12 bg-surface-bright border border-outline-variant rounded-2xl px-4 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
              />
              <button 
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
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
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all border border-outline-variant ${
          isOpen ? 'bg-surface text-on-surface' : 'bg-primary text-white shadow-primary/20 border-transparent'
        }`}
      >
        {isOpen ? <X /> : <Plus className="w-8 h-8" />}
      </motion.button>
    </div>
  )
}
