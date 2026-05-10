import { createAvatar } from '@dicebear/core'
import { avataaars } from '@dicebear/collection'

/**
 * Generates a Data URI for a random avatar based on a seed (e.g. user email).
 */
export function generateAvatarDataUri(seed: string) {
  const avatar = createAvatar(avataaars, {
    seed,
    // Add any specific options here
  })

  return avatar.toDataUri()
}
