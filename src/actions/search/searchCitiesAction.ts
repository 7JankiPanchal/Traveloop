'use server'

import { searchCities } from '@/services/city/searchCities'

export async function searchCitiesAction(query: string) {
  // Public action, no requireUser() needed
  return searchCities(query)
}
