'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

export function LandingHero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center px-6 overflow-hidden">
      {/* Background Image with optimized overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Luxury Travel" 
          className="w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2072&auto=format&fit=crop"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-surface-bright"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-5xl text-center space-y-12">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-6xl md:text-8xl text-white leading-[1.1] drop-shadow-2xl tracking-tight max-w-4xl mx-auto font-black"
        >
          The world is yours <br /> to explore.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/95 backdrop-blur-2xl rounded-full p-2 flex items-center shadow-2xl border border-white/20 max-w-xl mx-auto group pr-2 mt-8"
        >
          <div className="pl-6 pr-3 text-primary">
            <span className="material-symbols-outlined text-2xl">location_on</span>
          </div>
          <input 
            className="bg-transparent border-none focus:ring-0 w-full font-medium text-lg text-on-surface placeholder:text-on-surface-variant/60 outline-none h-14" 
            placeholder="Where to next?" 
            type="text"
          />
          <Link href="/search">
            <button className="bg-[#A43716] text-white rounded-full h-14 px-10 font-bold text-sm hover:opacity-90 transition-all active:scale-95 shadow-lg whitespace-nowrap">
              Discover
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="material-symbols-outlined text-white/50 text-3xl">expand_more</span>
      </div>
    </section>
  )
}
