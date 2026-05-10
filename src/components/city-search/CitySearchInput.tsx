'use client'

import { useState, useCallback, useEffect } from 'react'
import { useCitySearch } from '@/hooks/useCitySearch'
import { EmptyState } from '@/components/ui/EmptyState'
import type { CityResult } from '@/types/city'

interface CitySearchInputProps {
  onSelect: (city: CityResult) => void
  placeholder?: string
  initialQuery?: string
}

export function CitySearchInput({ onSelect, placeholder = 'Search cities…', initialQuery = '' }: CitySearchInputProps) {
  const { query, setQuery, results, isLoading, error } = useCitySearch()
  
  // Sync state with initialQuery (e.g. from URL params)
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      setIsOpen(true)
    }
  }, [initialQuery, setQuery])

  const [isOpen, setIsOpen] = useState(Boolean(initialQuery))

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
          className="w-full bg-surface-container border border-outline rounded-2xl pl-10 pr-4 py-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {isLoading && (
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-2 bg-surface-bright border border-outline rounded-2xl overflow-hidden shadow-xl shadow-black/5">
          {error && <p className="text-sm text-error p-4">{error}</p>}
          {!isLoading && results.length === 0 && !error && (
            <p className="text-sm text-on-surface-variant p-4">No cities found for "{query}"</p>
          )}
          {results.map((city) => (
            <button
              key={city.id}
              onMouseDown={() => handleSelect(city)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors text-left"
            >
              <span className="text-lg">🌍</span>
              <div>
                <p className="text-sm font-medium text-on-surface">{city.name}</p>
                <p className="text-xs text-on-surface-variant">{city.country}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
