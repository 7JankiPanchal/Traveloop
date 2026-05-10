import { TripsDashboardContent } from '@/components/trips/TripsDashboardContent'
import Link from 'next/link'
import Image from 'next/image'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'

export default async function LandingPage() {
  const user = await getCurrentUser()

  if (user) {
    return (
      <div className="bg-[#0f1117] min-h-screen">
        <TripsDashboardContent user={user} />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-white overflow-hidden font-sans">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/travel_hero_background_1778402042680.png"
          alt="Traveloop Hero"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
            Traveloop
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          {user ? (
            <Link 
              href="/trips" 
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="px-6 py-2.5 bg-white text-black rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/60">New Way to Travel</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-tight">
          Plan Your Next <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-purple-600">
            Epic Adventure
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform to discover, organize, and experience multi-city journeys with ease. 
          Powered by smart budgeting and curated activities.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href={user ? "/trips" : "/signup"}
            className="w-full sm:w-auto px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/30"
          >
            {user ? "View Your Trips" : "Start Planning for Free"}
          </Link>
          <button className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all backdrop-blur-md">
            Watch Demo
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full text-left">
          {[
            { title: "Smart Itinerary", desc: "Drag and drop your way to a perfect schedule.", icon: "🗓️" },
            { title: "Cost Tracking", desc: "Stay within budget with real-time expense monitoring.", icon: "💰" },
            { title: "Local Insights", desc: "Discover hidden gems curated by our travel community.", icon: "🌍" },
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-orange-500/30 transition-all group">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-orange-600/10 rounded-full blur-[150px] z-0"></div>

      {/* Footer / Admin Link */}
      <footer className="relative z-10 py-10 border-t border-white/5 flex justify-center">
        <Link href="/admin" className="text-[10px] uppercase tracking-[0.2em] text-white/10 hover:text-white/40 transition-colors">
          Admin Control Center
        </Link>
      </footer>
    </div>
  )
}