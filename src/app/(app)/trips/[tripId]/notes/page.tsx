import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { NoteEditor } from '@/components/notes/NoteEditor'
import { NoteCard } from '@/components/notes/NoteCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { TripTabs } from '@/components/trips/TripTabs'
import Link from 'next/link'
import { StickyNote, Filter } from 'lucide-react'

export default async function TripNotesPage({ 
  params 
}: { 
  params: Promise<{ tripId: string }> 
}) {
  const { tripId } = await params
  const user = await getCurrentUser()

  if (!user) return null

  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: user.id },
    include: {
      stops: true,
      noteItems: {
        include: {
          stop: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!trip) return <div>Trip not found</div>

  const notes = serialize(trip.noteItems)
  const stops = serialize(trip.stops)

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <StickyNote className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-on-surface tracking-tight">Trip Journal</h1>
            </div>
            <p className="text-on-surface-variant max-w-lg">
              Record memories, travel tips, and important details for your journey to <span className="text-primary font-bold">{trip.title}</span>.
            </p>
          </div>
        </div>

        <TripTabs tripId={tripId} />
      </div>

      <div className="pt-2">
        <NoteEditor tripId={tripId} stops={stops} />
      </div>

      {notes.length === 0 ? (
        <EmptyState
          icon="✍️"
          title="Your journal is empty"
          description="Start documenting your trip by adding your first note above."
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-widest">Recent Entries</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {notes.map((note: any) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

