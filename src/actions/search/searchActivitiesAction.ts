'use server'

import { searchActivities } from '@/services/activity/searchActivities'
import { serialize } from '@/lib/utils'

export async function searchActivitiesAction(query: string, category?: string, maxCost?: number, cityId?: string) {
  // Public action, no requireUser() needed
  const activities = await searchActivities(query, category, maxCost, cityId)
  return serialize(activities)
}
