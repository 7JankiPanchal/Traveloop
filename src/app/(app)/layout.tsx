import type { Metadata } from 'next'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { Navbar } from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Lumina Travels | Curated Global Exploration',
  description: 'Handpicked for the soul. Plan your perfect multi-city trip.',
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  return (
    <div className="min-h-screen bg-surface-bright text-on-surface">
      <Navbar user={user} />
      <main className="max-w-7xl mx-auto px-6 py-8 pb-32">{children}</main>
    </div>
  )
}

