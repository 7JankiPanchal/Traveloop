import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { User, Mail, Phone, MapPin, Globe, Calendar, Camera } from 'lucide-react'

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    return <div className="text-center py-20 text-slate-400">Please sign in.</div>
  }

  // Fetch more details if needed, but getCurrentUser usually has enough for basics
  // Let's re-fetch to be sure we have everything from the DB
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!dbUser) return null

  const profile = serialize(dbUser)

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl border border-outline-variant" />
        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl border-4 border-background overflow-hidden bg-surface-container-high shadow-xl">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl as string} alt={profile.firstName ?? 'User'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-black text-on-surface/10">
                  {profile.firstName?.[0]}
                </div>
              )}
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-white text-black rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-xl">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="pb-4">
            <h1 className="text-4xl font-black tracking-tighter text-on-surface">
              {profile.firstName || 'Traveler'} {profile.lastName || ''}
            </h1>
            <p className="text-on-surface-variant font-medium">Explorer since {new Date(profile.createdAt).getFullYear()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        {/* Contact Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-surface-container border border-outline-variant rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              About Me
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{profile.email}</span>
              </div>
              {profile.phoneNumber && (
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{profile.phoneNumber}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-on-surface-variant">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{profile.city || 'Location not set'}, {profile.country || 'Earth'}</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{profile.language === 'en' ? 'English' : profile.language}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-surface-container border border-outline-variant rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-on-surface">Bio</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {profile.additionalInfo || "No bio added yet. Tell us about your travel philosophy!"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container border border-outline-variant rounded-3xl p-6 text-center">
              <div className="text-3xl font-black text-on-surface mb-1">0</div>
              <div className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">Countries</div>
            </div>
            <div className="bg-surface-container border border-outline-variant rounded-3xl p-6 text-center">
              <div className="text-3xl font-black text-on-surface mb-1">0</div>
              <div className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">Adventures</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
