'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function BudgetInsights() {
  const chartData = [
    { name: 'Spent (within budget)', value: 20000, color: '#94a3b8' }, // slate-400
    { name: 'Over budget', value: 2000, color: '#ef4444' } // red-500
  ];

  return (
    <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col shadow-sm relative overflow-hidden h-full">
      {/* Decorative Background Glow */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-semibold text-slate-600">Budget Tracking</span>
        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider">Over Budget</span>
      </div>

      <div className="flex-1 flex items-center w-full">
        <div className="relative w-24 h-24 shrink-0 mx-auto md:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={40}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-slate-900">110%</span>
          </div>
        </div>

        <div className="ml-6 hidden md:block">
          <div className="text-2xl font-bold text-slate-900">$22,000</div>
          <div className="text-[11px] text-slate-400 uppercase font-bold tracking-tight">Spent of $20,000</div>
          <div className="mt-1 text-sm font-bold text-red-600">-$2,000 Remaining</div>
        </div>
      </div>

      <button className="w-full mt-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 uppercase tracking-wide transition-colors">
        View Full Budget
      </button>
    </div>
  );
}
