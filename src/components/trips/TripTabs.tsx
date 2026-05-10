'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Map, 
  Wallet, 
  Package, 
  StickyNote,
  Settings
} from 'lucide-react'

interface TripTabsProps {
  tripId: string
}

export function TripTabs({ tripId }: TripTabsProps) {
  const pathname = usePathname()

  const tabs = [
    { 
      label: 'Itinerary', 
      href: `/trips/${tripId}/builder`, 
      icon: LayoutDashboard,
      active: pathname.endsWith('/builder')
    },
    { 
      label: 'Timeline', 
      href: `/trips/${tripId}/view`, 
      icon: Map,
      active: pathname.endsWith('/view')
    },
    { 
      label: 'Budget', 
      href: `/trips/${tripId}/budget`, 
      icon: Wallet,
      active: pathname.endsWith('/budget')
    },
    { 
      label: 'Packing', 
      href: `/trips/${tripId}/packing`, 
      icon: Package,
      active: pathname.endsWith('/packing')
    },
    { 
      label: 'Notes', 
      href: `/trips/${tripId}/notes`, 
      icon: StickyNote,
      active: pathname.endsWith('/notes')
    },
  ]

  return (
    <div className="flex items-center gap-1 bg-surface-container/50 p-1 rounded-2xl border border-outline-variant w-fit mx-auto md:mx-0 overflow-x-auto no-scrollbar max-w-full">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
              tab.active 
                ? "bg-primary text-white shadow-md shadow-primary/20" 
                : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
            )}
          >
            <Icon className={cn("w-4 h-4", tab.active ? "text-white" : "text-on-surface-variant")} />
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
