import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  variant?: 'default' | 'accent' | 'green' | 'red' | 'blue'
  className?: string
}

const variants = {
  default: 'bg-white/10 text-slate-300',
  accent: 'bg-orange-500/20 text-orange-300',
  green: 'bg-emerald-500/20 text-emerald-300',
  red: 'bg-red-500/20 text-red-300',
  blue: 'bg-blue-500/20 text-blue-300',
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {label}
    </span>
  )
}
