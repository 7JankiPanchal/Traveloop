'use server'

import { searchActivities } from '@/services/activity/searchActivities'

export async function searchActivitiesAction(query: string, category?: string, maxCost?: number, cityId?: string) {
  // Public action, no requireUser() needed
  return searchActivities(query, category, maxCost, cityId)
}
