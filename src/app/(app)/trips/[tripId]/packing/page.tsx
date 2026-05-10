import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { PackingModule } from '@/components/trips/detail/PackingModule'
import { Luggage, ArrowLeft } from 'lucide-react'

export default async function TripPackingPage({ 
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
      packingItems: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!trip) return <div>Trip not found</div>

  const items = serialize(trip.packingItems)

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <a 
            href={`/trips/${tripId}`}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-4 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </a>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <Luggage className="w-6 h-6 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Packing List</h1>
          </div>
          <p className="text-slate-400 max-w-lg">
            Ensure you have everything you need for your adventure to <span className="text-white font-medium">{trip.title}</span>.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <PackingModule items={items} tripId={tripId} />
      </div>
    </div>
  )
}
