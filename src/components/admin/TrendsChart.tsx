'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TrendsChartProps {
  data: { name: string; trips: number }[]
}

export function TrendsChart({ data }: TrendsChartProps) {
  return (
    <div className="p-10 bg-white border border-[#E8E1D9] rounded-[48px] shadow-sm h-[450px]">
      <h2 className="text-2xl font-black mb-10 flex items-center gap-3 tracking-tighter">
        <span className="w-2 h-2 rounded-full bg-[#A43716]"></span>
        Journey Trends
      </h2>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A43716" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#A43716" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E1D9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#8C7B72', fontSize: 12, fontWeight: 600 }} 
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#8C7B72', fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E8E1D9', 
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 'bold',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
              }}
              itemStyle={{ color: '#A43716' }}
            />
            <Area 
              type="monotone" 
              dataKey="trips" 
              stroke="#A43716" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorTrips)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
