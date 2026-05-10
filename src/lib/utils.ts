/** Lightweight cn() utility — avoids needing clsx/tailwind-merge. */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/** Format a Decimal/number as currency string. */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}

/** Format ISO date string to readable label. */
export function formatDate(iso: string | Date | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/**
 * Recursively serializes objects, converting Prisma Decimal types to plain
 * numbers so they can be safely passed from Server to Client Components.
 * Avoids the "Only plain objects can be passed" error.
 */
export function serialize(obj: unknown): any {
  if (obj === null || obj === undefined) return obj
  if (typeof obj === 'number' || typeof obj === 'string' || typeof obj === 'boolean') return obj
  if (Array.isArray(obj)) return obj.map(serialize)

  if (typeof obj === 'object') {
    // Detect Prisma Decimal: has constructor named 'Decimal' or internal d/s/e fields
    const ctor = (obj as any).constructor?.name
    if (ctor === 'Decimal' || (ctor !== 'Date' && 'd' in obj && 's' in obj && 'e' in obj)) {
      return Number((obj as any).toString())
    }

    // Serialize Date to ISO string
    if (obj instanceof Date) {
      return obj.toISOString()
    }

    const result: Record<string, unknown> = {}
    for (const key of Object.keys(obj)) {
      result[key] = serialize((obj as any)[key])
    }
    return result
  }

  return obj
}
