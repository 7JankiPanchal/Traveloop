'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CitySearchInput } from '@/components/city-search/CitySearchInput'
import { Button } from '@/components/ui/Button'
import { createTripAction } from '@/actions/trip/createTrip'
import type { CityResult } from '@/types/city'

// Dummy suggestions for now
const SUGGESTIONS = [
  { id: '1', name: 'Tokyo', country: 'Japan', emoji: '🗼' },
  { id: '2', name: 'Paris', country: 'France', emoji: '🥐' },
  { id: '3', name: 'New York', country: 'USA', emoji: '🗽' },
  { id: '4', name: 'Rome', country: 'Italy', emoji: '🏛️' },
  { id: '5', name: 'Bali', country: 'Indonesia', emoji: '🏝️' },
  { id: '6', name: 'London', country: 'UK', emoji: '💂' },
]

export default function CreateTripPage() {
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null)
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    
    const formData = new FormData(e.currentTarget)
    if (selectedCity) {
      formData.set('cityName', selectedCity.name)
      formData.set('country', selectedCity.country)
    }

    try {
      await createTripAction(formData)
    } catch (error) {
            setIsPending(false)
    }
  }

  const inputClass = "w-full bg-surface-container border border-outline rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
  const labelClass = "text-sm font-medium text-on-surface-variant mb-2 block"

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-on-surface mb-6">Create a new Trip</h1>
        
        <div className="rounded-2xl bg-surface-bright border border-outline-variant overflow-hidden">
          <div className="bg-surface-container px-6 py-4 border-b border-outline-variant">
            <h2 className="font-semibold text-on-surface">Plan a new trip</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className={labelClass}>Trip Name</label>
              <input 
                type="text" 
                name="title" 
                required 
                placeholder="e.g. Summer in Tokyo" 
                className={inputClass} 
              />
            </div>
            
            <div>
              <label className={labelClass}>Select a Place</label>
              <CitySearchInput 
                placeholder="Search cities worldwide..." 
                onSelect={setSelectedCity} 
              />
              {selectedCity && (
                <div className="mt-3 inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm">
                  <span>Selected: {selectedCity.name}, {selectedCity.country}</span>
                  <button 
                    type="button" 
                    onClick={() => setSelectedCity(null)}
                    className="hover:text-on-surface"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Start Date</label>
                <input 
                  type="date" 
                  name="startDate" 
                  className={inputClass} 
                  required
                />
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <input 
                  type="date" 
                  name="endDate" 
                  className={inputClass} 
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="button" variant="ghost" className="mr-3" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" isLoading={isPending}>Create Trip</Button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-on-surface mb-4">Suggestions for Places to Visit / Activities to perform</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SUGGESTIONS.map(suggestion => (
            <div 
              key={suggestion.id} 
              className="rounded-2xl bg-surface-bright border border-outline-variant p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-outline-variant/30 transition-colors"
              onClick={() => setSelectedCity({ id: suggestion.id, name: suggestion.name, country: suggestion.country })}
            >
              <span className="text-4xl">{suggestion.emoji}</span>
              <div className="text-center">
                <h3 className="font-semibold text-on-surface">{suggestion.name}</h3>
                <p className="text-xs text-on-surface-variant">{suggestion.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
