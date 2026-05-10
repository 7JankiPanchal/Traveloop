import React from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal, ArrowUpDown, Bell, ChevronDown } from 'lucide-react';

export default function InvoiceHeader() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center shrink-0 w-full">
      <div className="px-6 lg:px-8 w-full mx-auto max-w-7xl flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            T
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">Traveloop</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Utility Cluster */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
          <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200">
            <ArrowUpDown className="h-4 w-4" />
            Sort
            <ChevronDown className="h-3 w-3 ml-1" />
          </button>
          <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
          </button>
          <button className="h-9 w-9 rounded-full overflow-hidden border border-slate-200 ml-1">
            <Image src="https://picsum.photos/seed/user/100/100" alt="User" width={36} height={36} className="object-cover" referrerPolicy="no-referrer" />
          </button>
        </div>
      </div>
    </header>
  );
}
