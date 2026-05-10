import React from 'react';
import { BedDouble, PlaneTakeoff } from 'lucide-react';

export default function ExpenseTable() {
  return (
    <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
          <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10">
            <tr className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
              <th scope="col" className="py-4 px-6 w-12 text-center">#</th>
              <th scope="col" className="py-4 px-6">Category</th>
              <th scope="col" className="py-4 px-6 w-1/3 min-w-[250px]">Description</th>
              <th scope="col" className="py-4 px-6 text-right">Qty / Details</th>
              <th scope="col" className="py-4 px-6 text-right">Unit Cost</th>
              <th scope="col" className="py-4 px-6 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50 transition-colors group">
              <td className="py-4 px-6 text-center text-sm text-slate-400">01</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <BedDouble className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Hotel</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="text-sm font-medium text-slate-900">The Parisian Grand Hotel</div>
                <div className="text-[11px] text-slate-400 mt-0.5">2 x Executive Suites</div>
              </td>
              <td className="py-4 px-6 text-right text-sm text-slate-600">
                5 Nights
              </td>
              <td className="py-4 px-6 text-right font-mono text-sm text-slate-600">
                $1,500.00
              </td>
              <td className="py-4 px-6 text-right font-bold text-slate-900">
                $7,500.00
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors group">
              <td className="py-4 px-6 text-center text-sm text-slate-400">02</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <PlaneTakeoff className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Flight</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="text-sm font-medium text-slate-900">Roundtrip Flights (JFK → CDG)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Air France - Premium Economy</div>
              </td>
              <td className="py-4 px-6 text-right text-sm text-slate-600">
                4 Passengers
              </td>
              <td className="py-4 px-6 text-right font-mono text-sm text-slate-600">
                $3,625.00
              </td>
              <td className="py-4 px-6 text-right font-bold text-slate-900">
                $14,500.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* 5. Financial Summary */}
      <div className="border-t border-slate-200 p-6 flex justify-end shrink-0">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm text-slate-500">
            <span>Subtotal</span>
            <span className="font-mono text-slate-700">$22,000.00</span>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>Tax (5.0%)</span>
            <span className="font-mono text-slate-700">$1,100.00</span>
          </div>
          <div className="flex justify-between text-sm text-slate-400 italic">
            <span>Loyalty Discount</span>
            <span className="font-mono text-emerald-600">-$1,100.00</span>
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
            <span className="text-base font-bold text-slate-900">Grand Total</span>
            <span className="text-3xl font-black tracking-tight text-slate-900">$22,000.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
