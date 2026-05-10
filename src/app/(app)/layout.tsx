import type { Metadata } from 'next'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { AppNavbar } from '@/components/layout/AppNavbar'

export const metadata: Metadata = {
  title: 'Traveloop — Personalized Travel Planning',
  description:
    'Plan your perfect multi-city trip with itinerary builder, budget tracker, packing lists, and community sharing.',
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  const navUser = user
    ? {
        id: user.id,
        firstName: user.firstName ?? null,
        email: user.email,
        avatarUrl: user.avatarUrl ?? null,
      }
    : null

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#f1f5f9' }}>
      {navUser && <AppNavbar user={navUser} />}
      <main style={{ paddingTop: navUser ? 56 : 0, minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}
