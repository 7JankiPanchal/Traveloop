import React from 'react';
import Image from 'next/image';

export default function InvoiceHero() {
  return (
    <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row gap-6 items-center shadow-sm relative h-full">
      {/* Left Column: Image */}
      <div className="w-full md:w-32 md:h-32 shrink-0 aspect-square md:aspect-auto">
        <div className="w-full h-full relative rounded-xl overflow-hidden bg-slate-200 shrink-0">
          <Image 
            src="https://picsum.photos/seed/paris/400/400" 
            alt="Europe Destination" 
            fill 
            className="object-cover" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-2 left-2 text-[10px] bg-white/80 backdrop-blur rounded px-1.5 font-bold uppercase">PARIS</div>
        </div>
      </div>

      {/* Center + Right Columns Wrapper */}
      <div className="flex-1 flex flex-col md:flex-row justify-between w-full h-full gap-4">
        {/* Center Column: Trip Details */}
        <div className="flex flex-col flex-1 justify-center">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            Trip to Europe Adventure
          </h1>
          <div className="mt-1 text-sm text-slate-500 font-medium flex items-center flex-wrap gap-x-2">
            <span>Oct 12 — Oct 28, 2026</span>
            <span className="hidden md:inline">•</span>
            <span>Created by James</span>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-2 overflow-hidden">
              {['James', 'Arjun', 'Jerry', 'Cristina'].map((name) => (
                <div key={name} className="inline-block relative h-8 w-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-sm overflow-hidden">
                  <Image 
                    src={`https://picsum.photos/seed/${name}avatar/100/100`} 
                    alt={name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
            <span className="text-xs text-slate-400 font-medium ml-2">+2 Travelers</span>
          </div>
        </div>

        {/* Right Column: Invoice Metadata */}
        <div className="flex flex-col shrink-0 justify-between py-1 md:text-right">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">INV-2026-89A2</div>
            <div className="text-xs text-slate-500 mt-1">Issued: Nov 02, 2026</div>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">
              Pending Payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
