import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { TripsDashboardContent } from '@/components/trips/TripsDashboardContent'
import Link from 'next/link'
import { LandingHero } from '@/components/landing/LandingHero'

export default async function LandingPage() {
  const user = await getCurrentUser()

  if (user) {
    return (
      <div className="bg-[#FDF9F4] text-on-surface min-h-screen">
        <TripsDashboardContent user={user} />
      </div>
    )
  }

  return (
    <div className="bg-[#FDF9F4] text-on-surface antialiased overflow-x-hidden min-h-screen">
      <main>
        <LandingHero />

        {/* Categories Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex justify-center gap-10 md:gap-16 overflow-x-auto no-scrollbar pb-4">
            {[
              { icon: 'hiking', label: 'Adventure', color: 'bg-orange-100 text-orange-700' },
              { icon: 'temple_buddhist', label: 'Heritage', color: 'bg-red-100 text-red-700' },
              { icon: 'park', label: 'Nature', color: 'bg-green-100 text-green-700' },
              { icon: 'spa', label: 'Wellness', color: 'bg-rose-100 text-rose-700' },
            ].map((cat) => (
              <Link 
                key={cat.label} 
                href={`/search?q=${cat.label}`} 
                className="group flex flex-col items-center gap-4 min-w-max"
              >
                <div className={`w-20 h-20 rounded-full ${cat.color} flex items-center justify-center transition-all duration-500 shadow-md group-hover:scale-110`}>
                  <span className="material-symbols-outlined text-[32px]">{cat.icon}</span>
                </div>
                <span className="text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors">{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Escapes */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-display text-on-surface font-black">Featured Escapes</h2>
              <p className="text-on-surface-variant italic mt-2 text-lg">Handpicked for the soul.</p>
            </div>
            <Link href="/search" className="text-on-surface-variant font-bold text-sm flex items-center gap-2 group">
              View all <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                name: 'Santorini, Greece', 
                price: '$1,299', 
                tag: 'POPULAR', 
                tag2: 'BEST SELLER',
                img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2021&auto=format&fit=crop' 
              },
              { 
                name: 'Kyoto, Japan', 
                price: '$1,850', 
                tag: 'ECO FRIENDLY', 
                tag2: 'JOURNAL',
                img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop' 
              },
              { 
                name: 'Amalfi Coast, Italy', 
                price: '$2,400', 
                tag: 'LUXURY', 
                tag2: 'TRENDING',
                img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070&auto=format&fit=crop' 
              }
            ].map((dest) => (
              <Link key={dest.name} href={`/search?q=${dest.name}`} className="group relative aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl">
                <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-8 right-8">
                  <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white tracking-widest uppercase flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    {dest.tag}
                  </span>
                </div>

                <div className="absolute bottom-10 left-10 right-10 text-white space-y-2">
                  <span className="inline-block px-3 py-1 bg-[#A43716]/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest uppercase mb-2">
                    {dest.tag2}
                  </span>
                  <h4 className="text-3xl font-display font-black leading-tight">{dest.name}</h4>
                  <p className="text-white/80 text-sm font-medium">Starting from <span className="text-white font-bold">{dest.price}</span></p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Traveler Stories */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display text-on-surface font-black mb-16">Traveler Stories</h2>
          
          <div className="relative max-w-4xl">
            {/* Main Story Card */}
            <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl group border-4 border-white/10">
              <img src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sahara" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-yellow-500 mb-3">Editor's Pick</p>
                <h4 className="text-4xl font-display font-black mb-6">Finding Silence in the Sahara</h4>
                <button className="px-8 py-3 border border-white/30 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all">Read story</button>
              </div>
            </div>

            {/* Overlapping Card */}
            <div className="absolute -bottom-20 -right-4 md:-right-20 w-80 aspect-square rounded-[40px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-8 border-white group z-10">
              <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Kyoto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#A43716] mb-2">Journal</p>
                <h5 className="text-2xl font-display font-black mb-4">Kyoto's Hidden Temples</h5>
                <button className="text-xs font-bold underline underline-offset-8">Read story</button>
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-40 pb-12 px-6 text-center space-y-12">
          <h2 className="text-5xl font-display text-[#A43716] tracking-tighter uppercase font-bold">Traveloop</h2>
          
          <div className="flex flex-wrap justify-center gap-10 text-on-surface-variant font-bold text-sm tracking-wider">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          </div>

          <div className="text-on-surface-variant/40 text-[10px] font-black uppercase tracking-[0.2em] pt-8">
            © 2024 Traveloop. Curated Global Exploration.
          </div>
        </footer>

        {/* Mobile Bottom Nav Spacer */}
        <div className="h-32 md:hidden" />

        {/* Floating Action Button */}
        <button className="fixed bottom-32 right-8 w-16 h-16 bg-[#A43716] text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all z-50">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </main>
    </div>
  )
}