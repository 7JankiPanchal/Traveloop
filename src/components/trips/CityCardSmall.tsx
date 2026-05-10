'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

interface CityCardSmallProps {
  city: {
    id: string
    name: string
    country: string
    coverPhotoUrl?: string
  }
}

export function CityCardSmall({ city }: CityCardSmallProps) {
  // Use a default Unsplash image if none provided
  const imageUrl = city.coverPhotoUrl || `https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=2070&auto=format&fit=crop`

  return (
    <Link href={`/search?q=${encodeURIComponent(city.name)}`}>
      <motion.div 
        whileHover={{ y: -5 }}
        className="flex-shrink-0 w-[140px] md:w-[180px] space-y-3 cursor-pointer group"
      >
        <div className="relative aspect-square rounded-[32px] overflow-hidden border border-outline-variant shadow-xl transition-all group-hover:border-primary/30 group-hover:shadow-primary/10">
          <img 
            src={imageUrl} 
            alt={city.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>
        <div>
          <h3 className="font-bold text-on-surface text-sm md:text-base group-hover:text-primary transition-colors">{city.name}</h3>
          <p className="text-[10px] md:text-xs text-on-surface-variant font-bold uppercase tracking-wider">{city.country}</p>
        </div>
      </motion.div>
    </Link>
  )
}
