import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: number
  icon: ReactNode
  color: 'blue' | 'orange' | 'green' | 'purple'
}

export function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
    orange: 'text-[#A43716] bg-orange-50 border-orange-100',
    green: 'text-green-600 bg-green-50 border-green-100',
    purple: 'text-purple-600 bg-purple-50 border-purple-100',
  }

  return (
    <div className="p-8 bg-white border border-[#E8E1D9] rounded-[40px] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-5 mb-6">
        <div className={`p-4 rounded-2xl border ${colorClasses[color]}`}>
          {icon}
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">{title}</span>
      </div>
      <div className="text-5xl font-black text-on-surface tracking-tighter">
        {value.toLocaleString()}
      </div>
    </div>
  )
}
