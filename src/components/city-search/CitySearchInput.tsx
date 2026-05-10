'use client'

import { useState, useCallback } from 'react'
import { useCitySearch } from '@/hooks/useCitySearch'
import { EmptyState } from '@/components/ui/EmptyState'
import type { CityResult } from '@/types/city'

interface CitySearchInputProps {
  onSelect: (city: CityResult) => void
  placeholder?: string
}

export function CitySearchInput({ onSelect, placeholder = 'Search cities…' }: CitySearchInputProps) {
  const { query, setQuery, results, isLoading, error } = useCitySearch()
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = useCallback((city: CityResult) => {
    onSelect(city)
    setQuery('')
    setIsOpen(false)
  }, [onSelect, setQuery])

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true) }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {isLoading && (
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-2 bg-[#1a1d2e] border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/40">
          {error && <p className="text-sm text-red-400 p-4">{error}</p>}
          {!isLoading && results.length === 0 && !error && (
            <p className="text-sm text-slate-400 p-4">No cities found for "{query}"</p>
          )}
          {results.map((city) => (
            <button
              key={city.id}
              onMouseDown={() => handleSelect(city)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
            >
              <span className="text-lg">🌍</span>
              <div>
                <p className="text-sm font-medium text-white">{city.name}</p>
                <p className="text-xs text-slate-400">{city.country}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
