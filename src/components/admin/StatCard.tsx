import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: number
  icon: ReactNode
  color: 'blue' | 'orange' | 'green' | 'purple'
}

export function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    orange: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    green: 'text-green-500 bg-green-500/10 border-green-500/20',
    purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  }

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-2xl border ${colorClasses[color]}`}>
          {icon}
        </div>
        <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">{title}</span>
      </div>
      <div className="text-4xl font-bold text-white tracking-tight">
        {value.toLocaleString()}
      </div>
    </div>
  )
}
