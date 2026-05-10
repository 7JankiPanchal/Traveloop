'use server'

import { searchCities } from '@/services/city/searchCities'
import { serialize } from '@/lib/utils'

export async function searchCitiesAction(query: string) {
  // Public action, no requireUser() needed
  const cities = await searchCities(query)
  return serialize(cities)
}
