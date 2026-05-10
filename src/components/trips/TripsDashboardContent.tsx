'use client'

import { motion } from 'motion/react'
import { Banner } from './Banner'
import { FilterBar } from './FilterBar'
import { TripInsights } from './TripInsights'
import { TripCard } from './TripCard'
import { CityCardSmall } from './CityCardSmall'
import { PlanTripFAB } from './PlanTripFAB'
import { EmptyState } from '@/components/ui/EmptyState'
import { serialize } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface Props {
  user: any
}

export function TripsDashboardContent({ user }: Props) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/trips/dashboard')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to fetch dashboard data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117]">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const { trips, featuredCities, activeTrip } = data || { trips: [], featuredCities: [], activeTrip: null }

  return (
    <div className="relative pb-24 space-y-12 max-w-7xl mx-auto px-8 pt-12">
      <Banner 
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
        title={`Welcome back, ${user.firstName || 'Traveler'}`} 
        subtitle="Your next adventure is just a few clicks away"
      />

      <FilterBar />

      {activeTrip && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white whitespace-nowrap">Current Adventure Insights</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>
          <TripInsights activeTrip={activeTrip} />
        </section>
      )}

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white whitespace-nowrap">Top Regional Selections</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {featuredCities.map((city: any) => (
            <CityCardSmall key={city.id} city={city} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white whitespace-nowrap">Your Journeys</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </div>
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip: any) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No trips planned yet" 
            description="Start by exploring destinations or creating your first adventure."
          />
        )}
      </section>

      <PlanTripFAB />
    </div>
  )
}
