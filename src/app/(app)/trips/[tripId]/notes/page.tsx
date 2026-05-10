import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { NoteEditor } from '@/components/notes/NoteEditor'
import { NoteCard } from '@/components/notes/NoteCard'
import { EmptyState } from '@/components/ui/EmptyState'
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
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500/10 rounded-xl">
              <StickyNote className="w-6 h-6 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Trip Journal</h1>
          </div>
          <p className="text-slate-400 max-w-lg">
            Record memories, travel tips, and important details for your journey to <span className="text-white font-medium">{trip.title}</span>.
          </p>
        </div>
      </div>

      <NoteEditor tripId={tripId} stops={stops} />

      {notes.length === 0 ? (
        <EmptyState
          icon="✍️"
          title="Your journal is empty"
          description="Start documenting your trip by adding your first note above."
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
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
