'use client'

import { useState, useEffect, useTransition } from 'react'
import { assignActivity } from '@/actions/activity/assignActivity'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ActivityForm } from './ActivityForm'
import type { Activity } from '@/lib/generated/prisma/client'

interface ActivitySearchModalProps {
  tripId: string
  stopId: string
  cityId?: string | null
  onClose: () => void
}

const CATEGORIES = ['Food', 'Transport', 'Nature', 'Culture', 'Adventure', 'Shopping', 'Accommodation', 'Other']

export function ActivitySearchModal({ tripId, stopId, cityId, onClose }: ActivitySearchModalProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [maxCost, setMaxCost] = useState('')
  const [results, setResults] = useState<Activity[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [showCustomForm, setShowCustomForm] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      setIsSearching(true)
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (category) params.set('category', category)
      if (maxCost) params.set('maxCost', maxCost)
      if (cityId) params.set('cityId', cityId)

      try {
        const res = await fetch(`/api/activities/search?${params.toString()}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data)
        }
      } catch (err) {
        console.error('Failed to fetch activities', err)
      } finally {
        setIsSearching(false)
      }
    }

    const timeout = setTimeout(fetchResults, 300)
    return () => clearTimeout(timeout)
  }, [query, category, maxCost, cityId])

  const handleAdd = (activityId: string) => {
    startTransition(async () => {
      await assignActivity(tripId, stopId, activityId)
      onClose()
    })
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition-colors'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-[#131521] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
        <div className="p-4 border-b border-white/10 flex justify-between items-center shrink-0">
          <h2 className="text-lg font-semibold text-white">Add Activity</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">✕</button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {showCustomForm ? (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-slate-300">Create Custom Activity</h3>
                <Button size="sm" variant="ghost" onClick={() => setShowCustomForm(false)}>Back to Search</Button>
              </div>
              <ActivityForm tripId={tripId} stopId={stopId} onSuccess={onClose} />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  placeholder="Search activities..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className={inputClass}
                />
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className={inputClass}
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input
                  type="number"
                  placeholder="Max Cost (USD)"
                  value={maxCost}
                  onChange={e => setMaxCost(e.target.value)}
                  className={inputClass}
                  min="0"
                />
              </div>

              {/* Results */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Search Results</h3>
                {isSearching ? (
                  <p className="text-sm text-slate-500">Searching...</p>
                ) : results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map(activity => (
                      <div key={activity.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-orange-500/30 transition-colors">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">{activity.name}</h4>
                            {activity.category && <Badge label={activity.category} variant="default" />}
                          </div>
                          {activity.description && <p className="text-xs text-slate-400 mt-1 line-clamp-1">{activity.description}</p>}
                          <div className="flex gap-3 text-xs text-slate-500 mt-1">
                            {activity.baseCost != null && <span className="text-emerald-400">${Number(activity.baseCost)}</span>}
                            {activity.durationMinutes && <span>{activity.durationMinutes}m</span>}
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleAdd(activity.id)} isLoading={isPending}>Add</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No activities found matching your criteria.</p>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 text-center">
                <p className="text-sm text-slate-400 mb-3">Can't find what you're looking for?</p>
                <Button variant="secondary" onClick={() => setShowCustomForm(true)}>
                  Create Custom Activity
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
