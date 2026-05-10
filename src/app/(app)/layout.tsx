import type { Metadata } from 'next'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { LogoutButton } from '@/components/auth/LogoutButton'

export const metadata: Metadata = {
  title: 'Traveloop',
  description: 'Plan your perfect multi-city trip',
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a href="/" className="text-xl font-bold text-orange-500 tracking-tight">Traveloop</a>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <a href="/trips" className="hover:text-white transition-colors">My Trips</a>
            <a href="/search" className="hover:text-white transition-colors">Discover</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-white">Hi, {user.name}</span>
                <LogoutButton />
              </div>
              {user.avatarUrl && (
                <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-white/5">
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}

