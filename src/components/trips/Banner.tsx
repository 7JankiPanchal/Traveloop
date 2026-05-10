'use client'

import { motion } from 'motion/react'

interface BannerProps {
  image?: string
  query?: string
  title: string
  subtitle: string
}

export function Banner({ title, subtitle, image, query }: BannerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[400px] md:h-[500px] w-full rounded-[60px] overflow-hidden group shadow-2xl shadow-black/5"
    >
      <img 
        src={image || `https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop`} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tighter drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-xl font-medium drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </motion.div>
  )
}
