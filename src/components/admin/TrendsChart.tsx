'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TrendsChartProps {
  data: { name: string; trips: number }[]
}

export function TrendsChart({ data }: TrendsChartProps) {
  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl h-[400px]">
      <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
        Journey Trends
      </h2>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1c', 
                border: '1px solid #ffffff10', 
                borderRadius: '16px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#f97316' }}
            />
            <Area 
              type="monotone" 
              dataKey="trips" 
              stroke="#f97316" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTrips)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
