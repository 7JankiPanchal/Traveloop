'use client'

import { useState } from 'react'
import { CitySearchInput } from '@/components/city-search/CitySearchInput'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { StopForm } from '@/components/itinerary/StopForm'
import type { CityResult } from '@/types/city'

interface TripOption {
  id: string
  title: string
}

interface SearchClientProps {
  trips: TripOption[]
}

export function SearchClient({ trips }: SearchClientProps) {
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null)
  const [selectedTripId, setSelectedTripId] = useState<string>('')
  const [showAddStopDialog, setShowAddStopDialog] = useState(false)

  const handleAddCityClick = () => {
    if (!selectedTripId) return
    setShowAddStopDialog(true)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Discover Destinations</h1>
        <p className="text-slate-400 text-sm mt-1">Search cities to add to your trip itinerary</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">City Search</h2>
        <CitySearchInput
          onSelect={(city) => {
            setSelectedCity(city)
            setShowAddStopDialog(false) // reset dialog state when city changes
          }}
          placeholder="Search cities worldwide…"
        />

        {selectedCity && (
          <div className="rounded-2xl bg-[#1a1d2e] border border-white/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-4xl hidden sm:block">🌆</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{selectedCity.name}</h3>
              <p className="text-slate-400 text-sm">{selectedCity.country}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <select
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                value={selectedTripId}
                onChange={(e) => setSelectedTripId(e.target.value)}
              >
                <option value="" disabled className="text-slate-500">Select a trip...</option>
                {trips.map(trip => (
                  <option key={trip.id} value={trip.id} className="bg-[#1a1d2e] text-white">
                    {trip.title}
                  </option>
                ))}
              </select>
              
              <Button 
                onClick={handleAddCityClick} 
                disabled={!selectedTripId}
                size="sm"
              >
                Add to Trip
              </Button>
            </div>
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

      {showAddStopDialog && selectedTripId && selectedCity && (
        <section className="mt-8">
          <div className="rounded-2xl bg-[#1a1d2e] border border-white/5 p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Add {selectedCity.name} to Trip</h3>
            <StopForm
              tripId={selectedTripId}
              existingStop={{
                id: 'new-stop',
                tripId: selectedTripId,
                cityName: selectedCity.name,
                country: selectedCity.country,
                cityId: null,
                sortOrder: 0,
                arriveDate: null,
                departDate: null,
                estimatedBudget: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                stopActivities: []
              }}
              onSuccess={() => {
                setShowAddStopDialog(false)
                setSelectedCity(null)
              }}
            />
          </div>
        </section>
      )}
    </div>
  )
}
