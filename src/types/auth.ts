// Authenticated user shape exposed by the auth abstraction.
// Intentionally minimal — auth provider details stay inside getCurrentUser.ts.
export interface AuthUser {
  id: string
  email: string
  name: string
  avatarUrl?: string
}
