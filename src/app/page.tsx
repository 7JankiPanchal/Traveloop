'use client';

import React from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Plus, 
  Filter,
  ArrowUpDown,
  LayoutGrid,
  CheckCircle2,
  Clock,
  Eye,
  RefreshCcw,
  Share2,
  X
} from 'lucide-react';

export default function TraveloopDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 relative font-sans text-slate-800">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center text-white font-bold text-xl shadow-[0_4px_12px_rgba(37,99,235,0.3)] group-hover:shadow-[0_6px_16px_rgba(37,99,235,0.4)] transition-all">
              V
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Venture Traveloop</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right mr-2">
              <p className="text-sm font-semibold text-slate-900">Welcome back, Alex</p>
              <p className="text-xs text-slate-500 font-medium">Ready for your next adventure?</p>
            </div>
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-200 via-blue-400 to-teal-300 shadow-sm cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-white">
                <Image src="https://picsum.photos/seed/user-alex/150/150" alt="Alex Profile" width={48} height={48} referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-12">
        {/* Hero Banner Area */}
        <section className="relative w-full h-[400px] md:h-[480px]">
          <Image 
            src="https://picsum.photos/seed/coastal-city/1920/800" 
            alt="Hero Banner" 
            fill 
            className="object-cover"
            referrerPolicy="no-referrer"
            priority
          />
          {/* Subtle premium filter gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/40 to-slate-900/80 backdrop-blur-[1px]"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 -mt-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-xl text-center max-w-4xl leading-tight text-shadow-sm">
              Where will Venture Traveloop take you next?
            </h1>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent"></div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 -mt-20 md:-mt-24">
          
          {/* Search & Filter Row */}
          <div className="bg-white/70 backdrop-blur-2xl rounded-2xl p-3 md:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 flex flex-col lg:flex-row gap-3 md:gap-4 mb-20 relative before:absolute before:inset-0 before:rounded-2xl before:ring-1 before:ring-white/80 before:pointer-events-none">
            <div className="flex-1 relative group">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#2563EB] transition-colors" />
              <input 
                type="text" 
                placeholder="Search destinations, experiences, or trips..." 
                className="w-full pl-14 pr-6 py-4 md:py-4 bg-white/80 border border-slate-200/60 focus:bg-white rounded-xl text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all shadow-inner focus:shadow-sm text-base"
              />
            </div>
            
            <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1 lg:pb-0 shrink-0">
              <button className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-white text-slate-700 font-medium hover:text-[#2563EB] hover:border-blue-200 hover:shadow-sm transition-all focus:ring-2 focus:ring-[#2563EB]/20 outline-none">
                <LayoutGrid className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-[#2563EB]" />
                <span className="whitespace-nowrap">Group by</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-white text-slate-700 font-medium hover:text-[#2563EB] hover:border-blue-200 hover:shadow-sm transition-all focus:ring-2 focus:ring-[#2563EB]/20 outline-none">
                <Filter className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-[#2563EB]" />
                <span className="whitespace-nowrap">Filter</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-white text-slate-700 font-medium hover:text-[#2563EB] hover:border-blue-200 hover:shadow-sm transition-all focus:ring-2 focus:ring-[#2563EB]/20 outline-none">
                <ArrowUpDown className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-[#2563EB]" />
                <span className="whitespace-nowrap">Sort by</span>
              </button>
              <div className="w-[1px] h-8 bg-slate-200 mx-1 hidden lg:block"></div>
              <button className="flex items-center justify-center gap-1.5 px-4 py-4 rounded-xl text-slate-500 font-medium hover:text-red-500 transition-colors hover:bg-red-50/50">
                <X className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Clear Filters</span>
              </button>
            </div>
          </div>

          {/* Section 1: Top Regional Selections */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Top Regional Selections</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {[
                { name: 'Europe', seed: 'colosseum-rome', label: 'Historic Charms' },
                { name: 'Asia', seed: 'kyoto-temple', label: 'Cultural Wonders' },
                { name: 'Americas', seed: 'yosemite-valley', label: 'Natural Epics' },
                { name: 'Island Escapes', seed: 'maldives-resort', label: 'Tropical Serenity' },
                { name: 'Off-grid', seed: 'mountain-yurt', label: 'Wild Remote' }
              ].map((region, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative h-48 md:h-56 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col justify-end bg-slate-900">
                    <Image 
                      src={`https://picsum.photos/seed/${region.seed}/400/600`}
                      alt={region.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                    <div className="relative p-5 z-10 w-full transform transition-transform duration-300 group-hover:translate-y-0">
                      <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">{region.label}</p>
                      <h3 className="font-bold text-white text-xl md:text-2xl tracking-tight">{region.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Previous Trips */}
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Previous Trips</h2>
              <div className="h-px bg-slate-200 flex-1 hidden sm:block mx-8"></div>
              <button className="text-sm font-semibold text-[#2563EB] hover:underline self-start sm:self-auto">View All History</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Tokyo Exploration', 
                  dates: 'Oct 10 - Oct 24, 2024', 
                  image: 'tokyo-neon', 
                  location: 'Tokyo, JP',
                  status: 'Completed', 
                  statusIcon: <CheckCircle2 className="w-3.5 h-3.5" />,
                  statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  completed: true
                },
                { 
                  title: 'Swiss Alps Skiing', 
                  dates: 'Jan 05 - Jan 12, 2025', 
                  image: 'swiss-matterhorn', 
                  location: 'Zermatt, CH',
                  status: 'Completed', 
                  statusIcon: <CheckCircle2 className="w-3.5 h-3.5" />,
                  statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  completed: true
                },
                { 
                  title: 'Amalfi Coast Retreat', 
                  dates: 'Aug 15 - Aug 25, 2026', 
                  image: 'amalfi-coast', 
                  location: 'Amalfi, IT',
                  status: 'Upcoming', 
                  statusIcon: <Clock className="w-3.5 h-3.5" />,
                  statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
                  completed: false
                },
              ].map((trip, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.12)] hover:-translate-y-2 hover:border-blue-100 transition-all duration-500 group flex flex-col h-full">
                  <div className="w-full h-56 relative overflow-hidden">
                    <Image 
                      src={`https://picsum.photos/seed/${trip.image}/600/400`} 
                      alt={trip.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out ken-burns" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                       <div className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm flex items-center gap-1.5 ${trip.statusColor}`}>
                         {trip.statusIcon}
                         {trip.status}
                       </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col bg-white">
                    <div className="flex items-center gap-1.5 text-[#2563EB] text-xs font-bold uppercase tracking-widest mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{trip.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#2563EB] transition-colors leading-tight">{trip.title}</h3>
                    <p className="text-sm font-medium text-slate-500 mb-6">{trip.dates}</p>
                    
                    {/* Action Bar */}
                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100 gap-2">
                       <button className="flex-1 flex justify-center items-center gap-2 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-[#2563EB] hover:text-white text-slate-700 text-sm font-semibold transition-colors duration-300">
                         <Eye className="w-4 h-4" />
                         <span>View Details</span>
                       </button>
                       {trip.completed && (
                         <>
                           <button className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors tooltip-trigger relative group/btn" aria-label="Rebook">
                              <RefreshCcw className="w-4 h-4" />
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity">Rebook</span>
                           </button>
                           <button className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors tooltip-trigger relative group/btn" aria-label="Share">
                              <Share2 className="w-4 h-4" />
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity">Share</span>
                           </button>
                         </>
                       )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-8 right-8 z-50 flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] text-white font-bold shadow-[0_8px_32px_rgba(13,148,136,0.35)] hover:shadow-[0_12px_44px_rgba(13,148,136,0.5)] hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 ring-2 ring-white/20">
        <Plus className="w-5 h-5 flex-shrink-0" />
        <span className="text-base tracking-wide whitespace-nowrap">Plan a trip</span>
      </button>

      {/* Global styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .text-shadow-sm {
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
      `}} />
    </div>
  );
}
