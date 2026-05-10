import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { PackingModule } from '@/components/trips/detail/PackingModule'
import { TripTabs } from '@/components/trips/TripTabs'
import Link from 'next/link'
import { Luggage } from 'lucide-react'

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
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Luggage className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-on-surface tracking-tight">Packing List</h1>
            </div>
            <p className="text-on-surface-variant max-w-lg">
              Ensure you have everything you need for your adventure to <span className="text-primary font-bold">{trip.title}</span>.
            </p>
          </div>
        </div>

        <TripTabs tripId={tripId} />
      </div>

      <div className="max-w-2xl pt-2">
        <PackingModule items={items} tripId={tripId} />
      </div>
    </div>
  )
}

