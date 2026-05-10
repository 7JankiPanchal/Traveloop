// City result shape returned by the Teleport API abstraction
export interface CityResult {
  id: string           // teleport geoname-id or slug
  name: string
  country: string
  region?: string
  population?: number
  photoUrl?: string
}

// What gets stored in the DB (Stop.cityName, Stop.country)
export interface CitySelection {
  cityName: string
  country: string
  cityId?: string      // set only when the City exists in local DB
}
