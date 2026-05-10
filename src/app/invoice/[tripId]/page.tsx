import { notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft, Printer, MapPin, Calendar, DollarSign } from 'lucide-react'

interface InvoicePageProps {
  params: Promise<{ tripId: string }>
}

export async function generateMetadata({ params }: InvoicePageProps) {
  const { tripId } = await params
  const trip = await prisma.trip.findUnique({ where: { id: tripId }, select: { title: true } })
  return { title: `Invoice — ${trip?.title ?? 'Trip'} | Traveloop` }
}

export default async function TripInvoicePage({ params }: InvoicePageProps) {
  const { tripId } = await params
  const user = await getCurrentUser()

  if (!user) {
    return <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>Please sign in to view invoices.</div>
  }

  const trip = await prisma.trip.findUnique({
    where: { id: tripId, userId: user.id },
    include: {
      budgetEntries: { orderBy: { recordedAt: 'desc' } },
      stops: { orderBy: { sortOrder: 'asc' }, include: { city: true } },
    },
  })

  if (!trip) notFound()

  const data = serialize(trip)
  const total = data.budgetEntries.reduce((sum: number, e: any) => sum + Number(e.amount), 0)

  const categoryTotals: Record<string, number> = {}
  for (const entry of data.budgetEntries) {
    categoryTotals[entry.category] = (categoryTotals[entry.category] ?? 0) + Number(entry.amount)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'inherit' }}>
      {/* Print-friendly invoice */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        {/* Nav */}
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="no-print">
          <Link
            href={`/trips/${tripId}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              textDecoration: 'none', color: '#64748b', fontSize: 14, fontWeight: 500,
            }}
          >
            <ArrowLeft size={16} />
            Back to Trip
          </Link>
          <button
            onClick={() => window.print()}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#0f172a', color: '#fff', border: 'none',
              borderRadius: 10, padding: '8px 18px', cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
            }}
          >
            <Printer size={14} />
            Print Invoice
          </button>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 32, borderBottom: '2px solid #e2e8f0', paddingBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 800, color: '#0f172a' }}>
                Travel Invoice
              </h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>
                {data.title}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 24, color: '#f97316' }}>
                ${total.toFixed(2)}
              </p>
              <p style={{ margin: '2px 0 0', color: '#94a3b8', fontSize: 12 }}>Total Expenses</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
            {data.startDate && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#475569' }}>
                <Calendar size={14} color="#f97316" />
                {new Date(data.startDate).toLocaleDateString()} — {new Date(data.endDate).toLocaleDateString()}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#475569' }}>
              <MapPin size={14} color="#f97316" />
              {data.stops.length} stop{data.stops.length !== 1 ? 's' : ''}
            </div>
            {data.budgetLimit && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#475569' }}>
                <DollarSign size={14} color="#f97316" />
                Budget: ${Number(data.budgetLimit).toFixed(2)}
              </div>
            )}
          </div>
        </div>

        {/* Category Summary */}
        {Object.keys(categoryTotals).length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 16px', color: '#1e293b' }}>Expense Summary</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
              {Object.entries(categoryTotals).map(([cat, amt]) => (
                <div
                  key={cat}
                  style={{
                    background: '#f1f5f9',
                    borderRadius: 12,
                    padding: '12px 16px',
                    borderLeft: '3px solid #f97316',
                  }}
                >
                  <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>{cat}</p>
                  <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>${amt.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expense Table */}
        {data.budgetEntries.length > 0 ? (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 16px', color: '#1e293b' }}>All Expenses</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  {['Date', 'Category', 'Description', 'Amount'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.budgetEntries.map((entry: any) => (
                  <tr key={entry.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 12px', color: '#64748b' }}>
                      {new Date(entry.recordedAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ background: '#fef3c7', color: '#92400e', borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 600 }}>
                        {entry.category}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#334155', fontWeight: 500 }}>{entry.label}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0f172a' }}>${Number(entry.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '2px solid #e2e8f0' }}>
                  <td colSpan={3} style={{ padding: '12px 12px', fontWeight: 700, color: '#0f172a', textAlign: 'right', fontSize: 15 }}>Total</td>
                  <td style={{ padding: '12px 12px', fontWeight: 800, fontSize: 18, color: '#f97316' }}>${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
            No expenses recorded yet.
          </div>
        )}

        <p style={{ marginTop: 40, textAlign: 'center', fontSize: 12, color: '#cbd5e1' }}>
          Generated by Traveloop — your personal travel planner
        </p>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  )
}
