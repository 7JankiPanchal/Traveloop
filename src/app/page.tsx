import { TripsDashboardContent } from '@/components/trips/TripsDashboardContent'
import Link from 'next/link'
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
    <div className="bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed antialiased overflow-x-hidden relative min-h-screen">
      <div className="fixed inset-0 grain-overlay z-[60] pointer-events-none"></div>

      <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-md shadow-sm dark:shadow-none transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center px-margin-mobile h-16 w-full max-w-7xl mx-auto">
          <span className="material-symbols-outlined text-primary dark:text-inverse-primary cursor-pointer hover:opacity-80 transition-opacity">menu</span>
          <h1 className="font-display-lg text-headline-md tracking-tighter text-primary dark:text-inverse-primary">TRAVELOOP</h1>
          <Link href="/login" className="flex items-center justify-center">
            <span className="material-symbols-outlined text-primary dark:text-inverse-primary cursor-pointer hover:opacity-80 transition-opacity">login</span>
          </Link>
        </div>
      </header>

      <main className="pb-32">
        {/* Hero Section */}
        <section className="relative h-[751px] w-full flex flex-col justify-end items-center px-margin-mobile pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Sunset view" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM6vZBhZP9Auuv75lAuoy3bv8jVG1WmGZzwveqkjX-kL2XPkjrlkFcHIqeJLfHc9r5Ocs6b3_CDhba8Jmku7zcoFr1JUgzTTXGFvfZNxPGqdEdutyeZcuhIa7lqpdRSVIPgAKUriicIvwgcAbbH7_GbjIpYU47ON19eSoyfFeaPYcdu7NKihitD50gItBWU7l1B6v9vSnHK60GU_MwK4fob1hT3ckFjXgrdpXWZurFK9tEKH3yu4zaZLnC4tZ8L8WtEiGzsw2-EylG"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20"></div>
          </div>
          <div className="relative z-10 w-full max-w-lg space-y-6 text-center">
            <h2 className="font-display-lg text-display-lg-mobile text-white drop-shadow-md">The world is yours to explore.</h2>
            <div className="bg-white/30 backdrop-blur-xl rounded-full p-2 flex items-center shadow-xl border border-white/40">
              <div className="pl-4 pr-2 text-primary">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <input 
                className="bg-transparent border-none focus:ring-0 w-full font-body-md text-white placeholder:text-white/80 outline-none" 
                placeholder="Where to next?" 
                type="text"
              />
              <Link href="/signup">
                <button className="bg-primary text-white rounded-full h-10 px-6 font-label-sm hover:bg-primary-container transition-all active:scale-95">
                  Discover
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-margin-mobile max-w-7xl mx-auto">
          <div className="flex justify-between md:justify-center md:gap-16 items-center gap-4 overflow-x-auto no-scrollbar py-4">
            <div className="flex flex-col items-center gap-2 group cursor-pointer shrink-0">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed-dim flex items-center justify-center text-secondary shadow-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">hiking</span>
              </div>
              <span className="font-label-sm text-on-surface-variant">Adventure</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer shrink-0">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shadow-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">account_balance</span>
              </div>
              <span className="font-label-sm text-on-surface-variant">Heritage</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer shrink-0">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shadow-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">park</span>
              </div>
              <span className="font-label-sm text-on-surface-variant">Nature</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer shrink-0">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shadow-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">spa</span>
              </div>
              <span className="font-label-sm text-on-surface-variant">Wellness</span>
            </div>
          </div>
        </section>

        {/* Featured Destinations */}
        <section className="py-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-end px-margin-mobile mb-6">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Featured Escapes</h3>
              <p className="font-body-md text-on-surface-variant italic font-serif">Handpicked for the soul.</p>
            </div>
            <button className="font-label-sm text-primary flex items-center gap-1">
              View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="flex gap-gutter overflow-x-auto no-scrollbar snap-x snap-mandatory px-margin-mobile pb-8">
            {/* Santorini Card */}
            <div className="snap-start shrink-0 w-72 rounded-xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(164,55,22,0.12)] bg-surface-container-low">
              <div className="relative h-96">
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  <span className="text-[10px] font-label-sm text-white">POPULAR</span>
                </div>
                <img alt="Santorini" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeDXplozl70dje2mY0MpprhWYPmG_QXecxK3Pvtz880E_W24GZl6za4uWc_4N4BpXFRqP-Mzscb52lYvCo6zmNczIkFwyXr-d9ya4wpZ9nifVFo0FlXQbndT-XfiyUeFLN9NVcYAJ0uPmHWtbVzXCCKx1j1UvhoQBjcxifz-6djmtyG0-tXJpXaqNQKmwVq6_GkP7KXLIwQ0-WxF0d4pwgtHnwyblKdoxnQHGMRT91rQtXU_B0pVAAOFUC8MBK6m3j8lrMIWqNAWnY"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="font-label-sm bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full text-[10px] mb-2 inline-block">BEST SELLER</span>
                  <h4 className="font-headline-md text-body-lg">Santorini, Greece</h4>
                  <p className="font-body-md text-sm opacity-90">Starting from $1,299</p>
                </div>
              </div>
            </div>
            
            {/* Kyoto Card */}
            <div className="snap-start shrink-0 w-72 rounded-xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(164,55,22,0.12)] bg-surface-container-low">
              <div className="relative h-96">
                <img alt="Kyoto" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA84qf4-5o6ZbbpqahKVpjfBP7tE3Gb3oL9mUYalM7fisG_14Jm9gyGZOWu7fqCU39A62JF8C_q88d6MPSKRgtjOpoxwIrmCOzHRuNNXRlQ2AfwHi1DLVrSmkCm6egSXiEdHbVz5q1qEgecilXZt8k2D7UZJ-k6R04H0zfgte13OxDSymgFhgBkZOpw5eYixMj083yXhhDEs6rf9Lesk6_rCNH7snj8I4ANOXnannVKa8BHohp9nXNjwE1zEiozOT-q_xWZ-aON0b8z"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="font-label-sm bg-tertiary-container text-white px-2 py-1 rounded-full text-[10px] mb-2 inline-block">ECO-FRIENDLY</span>
                  <h4 className="font-headline-md text-body-lg">Kyoto, Japan</h4>
                  <p className="font-body-md text-sm opacity-90">Starting from $1,850</p>
                </div>
              </div>
            </div>

            {/* Machu Picchu Card */}
            <div className="snap-start shrink-0 w-72 rounded-xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(164,55,22,0.12)] bg-surface-container-low">
              <div className="relative h-96">
                <img alt="Machu Picchu" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcVR9mw68vxl7o4OEbBR7Pl9XcmKffVDQlChgDLxd62S52SAyHIKR9N-jYNl8daCDXJa43JLvl1dUN0qfWVVzP701MdynG_x2UVndHo2GB9TooMMK2mi5awmEV7bbNrHHlrQXLoh-cRAA2j_nKaIsHLI5t2jLFinU3d-GyTl5FJu6qU3nmUw2ZZ4sVLCc4HDzOLwzeA191voNu34BdLkgGOA053iGNLeFp-VFsrx2z298rsduzSSZxKBDIOnXJS8Q-M2PwF3rdSA_D"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="font-label-sm bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full text-[10px] mb-2 inline-block">ADVENTURE</span>
                  <h4 className="font-headline-md text-body-lg">Cusco, Peru</h4>
                  <p className="font-body-md text-sm opacity-90">Starting from $1,420</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Traveler Stories */}
        <section className="py-12 px-margin-mobile max-w-7xl mx-auto">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-8">Traveler Stories</h3>
          <div className="relative flex flex-col md:flex-row gap-6">
            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-video shadow-lg w-[90%] md:w-[60%] z-10 self-start">
              <img alt="Travel Story 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCugTiG6UhCIFnYgI2xMHJBqb2EvNidWOJ2wgm9R-bU5Cw5Hb07Vxh-RuOkaJi-Omzi1TS-HPVhwSxdulAhk_RsK4U3lrOqVakyvWQCnofJU6hvYp7qSyljMvef8EwY4_jl_3FXmUKJfIBeBRI4kPNuaZmsLSZOgaW00OIpSvSJvOOgSPFRJa185rojnwOJyRojlnWXU05hUmfUps20P3FFTegIFKrrsPdeNUeqkMEt4CK9yArDUbINs0n-47M8P0wDfAvY6oczi1sM"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <p className="font-label-sm text-secondary-fixed-dim tracking-[0.2em] uppercase mb-1 text-[10px]">Editor's Pick</p>
                <h4 className="font-headline-md text-white text-lg mb-2">Finding Silence in the Sahara</h4>
                <button className="self-start text-white border-b border-white/40 font-label-sm text-xs pb-1">Read Story</button>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden aspect-square md:aspect-[4/3] shadow-lg w-[70%] md:w-[45%] -mt-16 md:mt-16 md:-ml-24 z-20 self-end border-4 border-background">
              <img alt="Travel Story 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA84qf4-5o6ZbbpqahKVpjfBP7tE3Gb3oL9mUYalM7fisG_14Jm9gyGZOWu7fqCU39A62JF8C_q88d6MPSKRgtjOpoxwIrmCOzHRuNNXRlQ2AfwHi1DLVrSmkCm6egSXiEdHbVz5q1qEgecilXZt8k2D7UZJ-k6R04H0zfgte13OxDSymgFhgBkZOpw5eYixMj083yXhhDEs6rf9Lesk6_rCNH7snj8I4ANOXnannVKa8BHohp9nXNjwE1zEiozOT-q_xWZ-aON0b8z"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <p className="font-label-sm text-secondary-fixed-dim tracking-[0.2em] uppercase mb-1 text-[10px]">Journey</p>
                <h4 className="font-headline-md text-white text-lg mb-2">Kyoto's Hidden Temples</h4>
                <button className="self-start text-white border-b border-white/40 font-label-sm text-xs pb-1">Read Story</button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full block pt-10 pb-32 border-t border-outline-variant bg-surface-container-lowest dark:bg-inverse-surface mt-12">
          <div className="flex flex-col items-center gap-unit px-margin-mobile">
            <h2 className="font-display-lg text-headline-md text-primary">TRAVELOOP</h2>
            <div className="flex gap-6 my-4">
              <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
            <div className="flex gap-6 mb-6">
              <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Us</a>
              <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">About</a>
            </div>
            <p className="font-body-md text-on-surface-variant text-center opacity-60">© 2024 Traveloop. Curated Global Exploration.</p>
          </div>
        </footer>
      </main>

      {/* FAB Contextual - Links to signup */}
      <Link href="/signup">
        <button className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-90 transition-transform z-40 ring-4 ring-primary/20">
          <span className="material-symbols-outlined text-[28px]">add</span>
        </button>
      </Link>
    </div>
  )
}