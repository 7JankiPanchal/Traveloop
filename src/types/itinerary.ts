import type { Trip, Stop, Activity, StopActivity } from '@/lib/generated/prisma/client'

// ─── Enriched stop with its activities ─────────────────────────────────────
export type StopActivityWithDetail = StopActivity & {
  activity: Activity
}

export type StopWithActivities = Stop & {
  stopActivities: StopActivityWithDetail[]
}

export type TripWithStops = Trip & {
  stops: StopWithActivities[]
}

// ─── Grouped / transformed shapes (used in Feature 6 view) ─────────────────
export interface DayGroup {
  date: string          // ISO date string 'YYYY-MM-DD'
  label: string         // 'Day 1', 'Day 2', etc.
  stopId: string
  cityName: string
  activities: StopActivityWithDetail[]
  dayTotal: number
}

export interface StopGroup {
  stop: StopWithActivities
  total: number
}

export interface ItineraryTotals {
  overall: number
  perStop: Record<string, number>
  byCategory: Record<string, number>
}

export interface ItineraryData {
  trip: TripWithStops
  groupedByStop: StopGroup[]
  groupedByDay: DayGroup[]
  totals: ItineraryTotals
}

// ─── Filter/sort state (Feature 6 controls) ────────────────────────────────
export type GroupMode = 'stop' | 'day' | 'category'
export type SortMode = 'date' | 'cost' | 'duration'

export interface ItineraryFilters {
  searchQuery: string
  cityFilter: string | null
  categoryFilter: string | null
  groupMode: GroupMode
  sortMode: SortMode
}
