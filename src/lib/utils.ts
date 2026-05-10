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
 * Ensures all objects are plain objects to avoid Next.js serialization errors.
 */
export function serialize<T>(data: T): T {
  if (data === null || data === undefined) return data
  
  // Handle Dates - Next.js handles them if they are plain Date objects
  if (data instanceof Date) return data as any
  
  // Handle Prisma Decimal or objects with toNumber()
  if (typeof data === 'object' && data !== null) {
    // Check if it's a Prisma Decimal (often identified by its prototype or toNumber)
    if ((data as any).constructor?.name === 'Decimal' || 
        ('toNumber' in data && typeof (data as any).toNumber === 'function')) {
      return (data as any).toNumber()
    }
  }

  // Handle Arrays
  if (Array.isArray(data)) {
    return data.map(item => serialize(item)) as any
  }

  // Handle Objects
  if (typeof data === 'object' && data !== null) {
    const result: any = {}
    for (const key of Object.keys(data)) {
      result[key] = serialize((data as any)[key])
    }
    return result as T
  }

  return data
}

