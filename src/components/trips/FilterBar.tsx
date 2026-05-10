'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Filter, Layers, ListFilter } from 'lucide-react'

export function FilterBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center w-full">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative flex-1 group w-full">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for destinations, trips, or activities..."
          className="w-full h-16 bg-[#FDF9F4] border border-[#E8E1D9] rounded-full pl-14 pr-6 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 focus:bg-white transition-all shadow-sm"
        />
      </form>

      {/* Filter Buttons */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none h-16 px-8 bg-[#FDF9F4] border border-[#E8E1D9] rounded-full flex items-center justify-center gap-3 text-sm font-semibold text-on-surface hover:bg-white hover:border-primary/30 transition-all shadow-sm">
          <Layers className="w-4 h-4 text-on-surface-variant" />
          Group by
        </button>
        <button className="flex-1 md:flex-none h-16 px-8 bg-[#FDF9F4] border border-[#E8E1D9] rounded-full flex items-center justify-center gap-3 text-sm font-semibold text-on-surface hover:bg-white hover:border-primary/30 transition-all shadow-sm">
          <Filter className="w-4 h-4 text-on-surface-variant" />
          Filter
        </button>
        <button className="flex-1 md:flex-none h-16 px-8 bg-[#FDF9F4] border border-[#E8E1D9] rounded-full flex items-center justify-center gap-3 text-sm font-semibold text-on-surface hover:bg-white hover:border-primary/30 transition-all shadow-sm">
          <ListFilter className="w-4 h-4 text-on-surface-variant" />
          Sort by
        </button>
      </div>
    </div>
  )
}
