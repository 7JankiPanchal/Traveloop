'use client'

import { motion } from 'motion/react'

interface BannerProps {
  image: string
  title: string
  subtitle: string
}

export function Banner({ image, title, subtitle }: BannerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[300px] md:h-[400px] w-full rounded-[40px] overflow-hidden group shadow-2xl shadow-primary/10"
    >
      <img 
        src={image} 
        alt="Banner" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute bottom-10 left-10 right-10">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
          {title}
        </h1>
        <p className="text-lg text-slate-200 max-w-xl font-medium leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[100px] -z-10" />
    </motion.div>
  )
}
