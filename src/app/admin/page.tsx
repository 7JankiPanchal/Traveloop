import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { StatCard } from '@/components/admin/StatCard'
import { TopCitiesTable } from '@/components/admin/TopCitiesTable'
import { UserManagementTable } from '@/components/admin/UserManagementTable'
import { TrendsChart } from '@/components/admin/TrendsChart'
import { LayoutDashboard, Users, Map, Plane, Activity } from 'lucide-react'

export default async function AdminDashboardPage() {
  // Fetch Stats
  const totalUsers = await prisma.user.count()
  const totalTrips = await prisma.trip.count()
  const totalCities = await prisma.city.count()
  const totalActivities = await prisma.activity.count()

  // Fetch Top Cities
  const topCities = await prisma.city.findMany({
    orderBy: { popularityScore: 'desc' },
    take: 5,
    include: {
      _count: {
        select: { stops: true }
      }
    }
  })

  // Fetch Recent Users
  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      _count: {
        select: { trips: true }
      }
    }
  })

  // Mock Trend Data (since we don't have enough historical data)
  const trendData = [
    { name: 'Mon', trips: 12 },
    { name: 'Tue', trips: 19 },
    { name: 'Wed', trips: 15 },
    { name: 'Thu', trips: 22 },
    { name: 'Fri', trips: 30 },
    { name: 'Sat', trips: 25 },
    { name: 'Sun', trips: 35 },
  ]

  return (
    <div className="min-h-screen bg-[#FDF9F4] text-[#1C1C19] p-8 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface">Platform Insights</h1>
            </div>
            <p className="text-on-surface-variant text-lg font-medium">Comprehensive overview of Traveloop platform metrics and user activity.</p>
          </div>
          
          <div className="flex items-center gap-3 px-6 py-3 bg-white border border-[#E8E1D9] rounded-[24px] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Live System Status</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard title="Total Explorers" value={totalUsers} icon={<Users />} color="blue" />
          <StatCard title="Planned Journeys" value={totalTrips} icon={<Plane />} color="orange" />
          <StatCard title="Destinations" value={totalCities} icon={<Map />} color="green" />
          <StatCard title="Curated Activities" value={totalActivities} icon={<Activity />} color="purple" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Trends Chart */}
          <div className="lg:col-span-2">
            <TrendsChart data={trendData} />
          </div>

          {/* Top Cities */}
          <div className="lg:col-span-1">
            <TopCitiesTable cities={serialize(topCities)} />
          </div>

          {/* Recent Users */}
          <div className="lg:col-span-3">
            <UserManagementTable users={serialize(recentUsers)} />
          </div>
        </div>
      </div>
    </div>
  )
}
