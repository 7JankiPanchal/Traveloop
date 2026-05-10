/**
 * Centralized image configuration for Traveloop.
 * Add all external image hostnames here to match next.config allowedOrigins.
 */

export const IMAGE_DOMAINS = [
  'images.unsplash.com',
  'lh3.googleusercontent.com',
  'avatars.githubusercontent.com',
]

/**
 * Returns a safe fallback image URL for destinations.
 */
export function cityFallbackImage(cityName: string): string {
  // Use a deterministic color-based placeholder
  const encoded = encodeURIComponent(cityName)
  return `https://placehold.co/800x450/1e293b/f97316?text=${encoded}`
}
