import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default async function SavedPage() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Heart className="w-16 h-16 text-outline-variant" />
        <h1 className="text-2xl font-bold text-on-surface">Sign in to see saved places</h1>
        <Link href="/login" className="px-8 py-3 bg-primary text-white rounded-full font-bold">
          Log In
        </Link>
      </div>
    )
  }

  // For now, let's just show an empty state or fetch some placeholders
  // In a real app, you'd have a 'savedPlaces' or 'favorites' table
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Heart className="w-6 h-6 text-primary fill-primary" />
        </div>
        <h1 className="text-4xl font-bold text-on-surface tracking-tight">Saved Journeys</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-surface-container/30 rounded-[40px] border border-outline-variant border-dashed">
        <div className="w-20 h-20 bg-surface-bright rounded-full flex items-center justify-center shadow-xl">
          <Heart className="w-8 h-8 text-outline-variant" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-on-surface">No saved journeys yet</h3>
          <p className="text-on-surface-variant max-w-sm">
            Start exploring and tap the heart icon to save your favorite destinations here.
          </p>
        </div>
        <Link href="/" className="px-8 py-3 bg-primary text-white rounded-full font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          Explore Destinations
        </Link>
      </div>
    </div>
  )
}
