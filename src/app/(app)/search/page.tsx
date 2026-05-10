'use client'

import { useState } from 'react'
import { CitySearchInput } from '@/components/city-search/CitySearchInput'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import type { CityResult } from '@/types/city'

export default function SearchPage() {
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null)

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Discover Destinations</h1>
        <p className="text-slate-400 text-sm mt-1">Search cities to add to your trip itinerary</p>
      </div>

      {/* City Search */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">City Search</h2>
        <CitySearchInput
          onSelect={setSelectedCity}
          placeholder="Search cities worldwide…"
        />

        {selectedCity && (
          <div className="rounded-2xl bg-[#1a1d2e] border border-white/5 p-5 flex items-center gap-4">
            <span className="text-4xl">🌆</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{selectedCity.name}</h3>
              <p className="text-slate-400 text-sm">{selectedCity.country}</p>
            </div>
            <Badge label="Selected" variant="accent" />
          </div>
        )}

        {!selectedCity && (
          <EmptyState
            icon="🔍"
            title="Search for a city"
            description="Type at least 2 characters to see city suggestions"
          />
        )}
      </section>
    </div>
  )
}
