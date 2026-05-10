import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { BudgetModule } from '@/components/trips/detail/BudgetModule'
import { TripTabs } from '@/components/trips/TripTabs'
import Link from 'next/link'
import { Wallet } from 'lucide-react'

export default async function TripBudgetPage({ 
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
      budgetEntries: {
        orderBy: { recordedAt: 'desc' }
      }
    }
  })

  if (!trip) return <div>Trip not found</div>

  const entries = serialize(trip.budgetEntries)

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-on-surface tracking-tight">Budget Tracker</h1>
            </div>
            <p className="text-on-surface-variant max-w-lg">
              Manage expenses and stay within your limit for <span className="text-primary font-bold">{trip.title}</span>.
            </p>
          </div>
        </div>

        <TripTabs tripId={tripId} />
      </div>

      <div className="max-w-2xl pt-2">
        <BudgetModule 
          budgetLimit={Number(trip.budgetLimit)} 
          entries={entries} 
          tripId={tripId} 
        />
      </div>
    </div>
  )
}

