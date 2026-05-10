import React from 'react';
import { Download, FileText } from 'lucide-react';

export default function InvoiceActions() {
  return (
    <footer className="h-20 bg-white border-t border-slate-200 px-6 lg:px-8 flex flex-wrap items-center justify-between shrink-0 w-full z-10 max-w-7xl mx-auto">
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download Invoice</span>
          <span className="sm:hidden">Download</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Export as PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <div className="text-[10px] uppercase font-bold text-slate-400">Amount Due</div>
          <div className="text-lg font-black text-slate-900">$22,000.00</div>
        </div>
        <button className="px-8 py-3 bg-[#2563EB] text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors uppercase tracking-widest text-xs">
          Mark as Paid
        </button>
      </div>
    </footer>
  );
}
