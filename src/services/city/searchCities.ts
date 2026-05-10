import type { CityResult } from '@/types/city'

/**
 * Searches cities via the free Nominatim (OpenStreetMap) API.
 * Swapped from Teleport API due to DNS resolution failures.
 */
export async function searchCities(query: string): Promise<CityResult[]> {
  if (!query || query.trim().length < 2) return []

  try {
    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(query.trim())}&format=json&limit=8&accept-language=en`
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Traveloop-App (development)',
        'Accept-Language': 'en',
      },
      next: { revalidate: 3600 }, // cache city search results for 1 hour
    })
    if (!res.ok) return []

    const data = await res.json()
    
    return data.map((r: any) => {
      // Nominatim returns display_name like "New Delhi, Delhi, India"
      const parts = r.display_name.split(', ')
      const country = parts.length > 1 ? parts[parts.length - 1] : ''
      const name = parts[0]

      return {
        id: String(r.place_id),
        name: name,
        country: country,
      }
    })
  } catch (error) {
        return []
  }
}
