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
 * Recursively converts Prisma Decimals to numbers for Client Component serialization.
 * Also ensures dates are serialized if needed, though Next.js handles simple Dates.
 */
export function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}
