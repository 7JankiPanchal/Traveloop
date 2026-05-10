import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { createTripAction } from '@/actions/trip/createTrip'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { TripCard } from '@/components/trips/TripCard'
import { formatDate } from '@/lib/utils'

export default async function TripsDashboard() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Please sign in to view your trips.</p>
      </div>
    )
  }

  const trips = await prisma.trip.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      stops: true,
    },
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Trips</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your upcoming adventures</p>
        </div>

        <form action={createTripAction} className="flex gap-2">
          <input 
            name="title" 
            placeholder="e.g. Summer in Tokyo" 
            required 
            className="h-10 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
          />
          <Button type="submit">Create New Trip</Button>
        </form>
      </div>

      {trips.length === 0 ? (
        <EmptyState 
          icon="✈️" 
          title="No trips yet" 
          description="Create your first trip above to start planning!" 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  )
}
