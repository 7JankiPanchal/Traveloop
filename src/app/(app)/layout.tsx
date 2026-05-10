import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Traveloop',
  description: 'Plan your perfect multi-city trip',
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <nav className="border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <a href="/" className="text-lg font-bold text-orange-400 tracking-tight">Traveloop</a>
        <div className="ml-auto flex items-center gap-2 text-sm text-slate-400">
          <a href="/search" className="hover:text-white transition-colors">Discover</a>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
