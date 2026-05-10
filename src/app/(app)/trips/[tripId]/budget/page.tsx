import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { BudgetModule } from '@/components/trips/detail/BudgetModule'
import { Wallet, ArrowLeft } from 'lucide-react'

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
            <div className="p-2 bg-purple-500/10 rounded-xl">
              <Wallet className="w-6 h-6 text-purple-500" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Budget Tracker</h1>
          </div>
          <p className="text-slate-400 max-w-lg">
            Manage expenses and stay within your limit for <span className="text-white font-medium">{trip.title}</span>.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <BudgetModule 
          budgetLimit={Number(trip.budgetLimit)} 
          entries={entries} 
          tripId={tripId} 
        />
      </div>
    </div>
  )
}
