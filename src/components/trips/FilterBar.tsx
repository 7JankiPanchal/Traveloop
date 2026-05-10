'use client'

import { Search, Filter, Layers, ListFilter } from 'lucide-react'

export function FilterBar() {
  return (
    <div suppressHydrationWarning className="flex flex-col md:flex-row gap-4 items-center">
      {/* Search Input */}
      <div className="relative flex-1 group w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Search for destinations, trips, or activities..."
          className="w-full h-14 bg-white/5 border border-white/10 rounded-[20px] pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <button className="flex-1 md:flex-none h-14 px-6 bg-white/5 border border-white/10 rounded-[20px] flex items-center justify-center gap-2 text-sm font-bold text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all">
          <Layers className="w-4 h-4" />
          Group by
        </button>
        <button className="flex-1 md:flex-none h-14 px-6 bg-white/5 border border-white/10 rounded-[20px] flex items-center justify-center gap-2 text-sm font-bold text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button className="flex-1 md:flex-none h-14 px-6 bg-white/5 border border-white/10 rounded-[20px] flex items-center justify-center gap-2 text-sm font-bold text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all">
          <ListFilter className="w-4 h-4" />
          Sort by
        </button>
      </div>
    </div>
  )
}
