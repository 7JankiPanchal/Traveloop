'use client'

import { motion } from 'motion/react'
import { Banner } from './Banner'
import { FilterBar } from './FilterBar'
import { TripInsights } from './TripInsights'
import { TripCard } from './TripCard'
import { PlanTripFAB } from './PlanTripFAB'
import { EmptyState } from '@/components/ui/EmptyState'
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
    <div className="min-h-screen flex items-center justify-center bg-[#FDF9F4]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const { trips, activeTrip } = data || { trips: [], activeTrip: null }

  // Dynamic banner image based on active trip
  const countryImageMap: Record<string, string> = {
    'India': 'https://images.unsplash.com/photo-1524492707947-2f85a514d735?q=80&w=2071&auto=format&fit=crop',
    'Japan': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    'France': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
    'Italy': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070&auto=format&fit=crop',
    'Greece': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2021&auto=format&fit=crop'
  }
  
  const bannerImage = activeTrip?.title && countryImageMap[activeTrip.title] 
    ? countryImageMap[activeTrip.title]
    : `https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop`

  return (
    <div className="bg-[#FDF9F4] min-h-screen">
      <div className="relative pb-24 space-y-12 max-w-7xl mx-auto px-6 md:px-12 pt-12">
        <Banner 
          image={bannerImage} 
          title={`Welcome back, ${user.firstName || 'Traveler'}`} 
          subtitle={activeTrip ? `Your journey to ${activeTrip.title} is waiting` : "Your next adventure is just a few clicks away"}
        />

        <FilterBar />

        {activeTrip && (
          <section className="space-y-8">
            <div className="flex items-center gap-6">
              <h2 className="text-xl font-bold text-on-surface whitespace-nowrap tracking-tight">Current Adventure Insights</h2>
              <div className="h-[1px] w-full bg-[#E8E1D9]" />
            </div>
            <TripInsights activeTrip={activeTrip} />
          </section>
        )}

        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold text-on-surface whitespace-nowrap tracking-tight">Your Journeys</h2>
            <div className="h-[1px] w-full bg-[#E8E1D9]" />
          </div>
          {trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
    </div>
  )
}
