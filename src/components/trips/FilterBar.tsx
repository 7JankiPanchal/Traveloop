'use client'

import { Search, Filter, Layers, ListFilter } from 'lucide-react'

export function FilterBar() {
  return (
    <div suppressHydrationWarning className="flex flex-col md:flex-row gap-4 items-center">
      {/* Search Input */}
      <div className="relative flex-1 group w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Search for destinations, trips, or activities..."
          className="w-full h-14 bg-surface border border-outline-variant rounded-[20px] pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 focus:bg-surface-bright transition-all"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <button className="flex-1 md:flex-none h-14 px-6 bg-surface border border-outline-variant rounded-[20px] flex items-center justify-center gap-2 text-sm font-bold text-on-surface-variant hover:bg-surface-container hover:border-outline transition-all">
          <Layers className="w-4 h-4" />
          Group by
        </button>
        <button className="flex-1 md:flex-none h-14 px-6 bg-surface border border-outline-variant rounded-[20px] flex items-center justify-center gap-2 text-sm font-bold text-on-surface-variant hover:bg-surface-container hover:border-outline transition-all">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button className="flex-1 md:flex-none h-14 px-6 bg-surface border border-outline-variant rounded-[20px] flex items-center justify-center gap-2 text-sm font-bold text-on-surface-variant hover:bg-surface-container hover:border-outline transition-all">
          <ListFilter className="w-4 h-4" />
          Sort by
        </button>
      </div>
    </div>
  )
}
