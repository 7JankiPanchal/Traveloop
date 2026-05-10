import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { TripCard } from '@/components/trips/TripCard'
import { CityCardSmall } from '@/components/trips/CityCardSmall'
import { TripInsights } from '@/components/trips/TripInsights'
import { EmptyState } from '@/components/ui/EmptyState'
import Link from 'next/link'

export default async function TripsDashboard() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'Montserrat', sans-serif" }}>
        <p style={{ color: '#58423c' }}>Please <Link href="/login" style={{ color: '#a43716', fontWeight: 600 }}>sign in</Link> to view your trips.</p>
      </div>
    )
  }

  const featuredCities = await prisma.city.findMany({
    orderBy: { popularityScore: 'desc' },
    take: 5,
  })

  const userTrips = await prisma.trip.findMany({
    where: { userId: user.id },
    orderBy: { startDate: 'asc' },
    include: {
      stops: true,
      budgetEntries: true,
      noteItems: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
  })

  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const ongoingTrips = userTrips.filter(t => t.startDate && t.endDate && t.startDate <= now && t.endDate >= now)
  const upcomingTrips = userTrips.filter(t => !t.startDate || t.startDate > now)
  const completedTrips = userTrips.filter(t => t.endDate && t.endDate < now)

  const activeTrip = ongoingTrips[0] || upcomingTrips[0] || userTrips[0]
  const serializedOngoing = serialize(ongoingTrips)
  const serializedUpcoming = serialize(upcomingTrips)
  const serializedCompleted = serialize(completedTrips)
  const cities = serialize(featuredCities)

  return (
    <div style={{ padding: '32px 20px 100px', maxWidth: 1200, margin: '0 auto', fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`
        .lumina-section-divider {
          height: 1px;
          background: linear-gradient(to right, rgba(164,55,22,0.2), transparent);
          margin: 8px 0 24px;
        }
        .lumina-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1c1c19;
        }
        .lumina-section-title.muted { color: #8c7b72; }
        .lumina-section-title.active { color: #a43716; }
      `}</style>

      {/* Hero Banner */}
      <div
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          height: 220,
          backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          marginBottom: 32,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(164,55,22,0.7) 0%, rgba(0,0,0,0.2) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '28px 32px',
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 36,
              fontWeight: 700,
              color: '#fff',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            My Adventures
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 }}>
            Hello, {user.name} 👋 — here&apos;s your world.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/trips/new"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: '#a43716',
            color: '#fff',
            borderRadius: 10,
            padding: '10px 20px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          + New Trip
        </Link>
      </div>

      {/* Active Trip Insights */}
      {activeTrip && (
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <h2 className="lumina-section-title active">Current Adventure</h2>
            <div className="lumina-section-divider" style={{ flex: 1 }} />
          </div>
          <TripInsights activeTrip={serialize(activeTrip)} />
        </section>
      )}

      {/* Ongoing Trips */}
      {serializedOngoing.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <h2 className="lumina-section-title active">Ongoing Trips</h2>
            <div className="lumina-section-divider" style={{ flex: 1 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {serializedOngoing.map((trip: any) => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </section>
      )}

      {/* Upcoming Trips */}
      {serializedUpcoming.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <h2 className="lumina-section-title">Upcoming Trips</h2>
            <div className="lumina-section-divider" style={{ flex: 1 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {serializedUpcoming.map((trip: any) => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </section>
      )}

      {/* Completed Trips */}
      {serializedCompleted.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <h2 className="lumina-section-title muted">Completed Trips</h2>
            <div className="lumina-section-divider" style={{ flex: 1 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, opacity: 0.8 }}>
            {serializedCompleted.map((trip: any) => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </section>
      )}

      {/* Empty State */}
      {userTrips.length === 0 && (
        <EmptyState
          title="No trips planned yet"
          description="Start by exploring destinations or creating your first adventure."
        />
      )}

      {/* Top Regional Selections */}
      {cities.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <h2 className="lumina-section-title">Top Destinations</h2>
            <div className="lumina-section-divider" style={{ flex: 1 }} />
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
            {cities.map((city: any) => <CityCardSmall key={city.id} city={city} />)}
          </div>
        </section>
      )}

      {/* Floating New Trip Button */}
      <Link
        href="/trips/new"
        style={{
          position: 'fixed',
          bottom: 88,
          right: 20,
          width: 52,
          height: 52,
          borderRadius: '50%',
          backgroundColor: '#a43716',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          boxShadow: '0 8px 20px rgba(164,55,22,0.35)',
          textDecoration: 'none',
          zIndex: 40,
        }}
      >
        +
      </Link>
    </div>
  )
}
