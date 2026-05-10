import type { Metadata } from 'next'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { Navbar } from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Traveloop',
  description: 'Plan your perfect multi-city trip',
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar user={user} />
      <main className="w-full">
        {children}
      </main>
    </div>
  )
}

