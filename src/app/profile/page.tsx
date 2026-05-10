"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Bell,
  LogOut,
  Camera,
  Star,
  ChevronDown,
  Globe,
  Shield,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// --- Components ---

const Header = () => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-6 md:px-8 shadow-sm">
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center text-white font-bold text-xl shadow-[0_4px_12px_rgba(37,99,235,0.3)] group-hover:shadow-[0_6px_16px_rgba(37,99,235,0.4)] transition-all">
        T
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900">Traveloop</span>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
        <Bell className="w-5 h-5" />
      </button>
      <button className="flex items-center gap-2 p-2 px-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors text-sm font-medium">
        <span className="hidden md:block">Log out</span>
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  </header>
);

const PreplannedTripCard = ({
  image,
  title,
  dateCreated,
}: {
  image: string;
  title: string;
  dateCreated: string;
}) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group border border-slate-100">
    <div className="relative h-48 w-full overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs px-2.5 py-1.5 rounded-full font-medium">
        {dateCreated}
      </div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="font-outfit font-semibold text-lg text-slate-900 mb-4 line-clamp-1">
        {title}
      </h3>
      <div className="mt-auto">
        <button className="w-full py-2.5 rounded-xl border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 focus:ring-4 focus:ring-blue-100 transition-all duration-200 active:scale-[0.98]">
          View
        </button>
      </div>
    </div>
  </div>
);

const PreviousTripCard = ({
  image,
  title,
  dates,
  rating,
}: {
  image: string;
  title: string;
  dates: string;
  rating: number;
}) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group border border-slate-100">
    <div className="relative h-48 w-full overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply z-10" />
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover saturate-50 transition-all duration-500 group-hover:scale-105 group-hover:saturate-100"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="font-outfit font-semibold text-lg text-slate-900 mb-1 line-clamp-1">
        {title}
      </h3>
      <p className="text-sm text-slate-500 mb-4">{dates}</p>
      
      <div className="flex items-center gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-4 h-4",
              star <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
            )}
          />
        ))}
      </div>

      <div className="mt-auto">
        <button className="w-full py-2.5 rounded-xl border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 focus:ring-4 focus:ring-blue-100 transition-all duration-200 active:scale-[0.98]">
          View
        </button>
      </div>
    </div>
  </div>
);

// --- Main Page ---

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Andersson",
    email: "alex.andersson@example.com",
    language: "English (US)",
    isPrivate: false,
  });
  
  // Track original copy to show/hide save button
  const [originalProfile, setOriginalProfile] = useState(profile);
  
  const hasChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile);

  const handleSave = () => {
    setOriginalProfile(profile);
    setIsEditing(false);
    // Simulation of save action...
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24">
      <Header />

      <main className="max-w-5xl mx-auto px-6 md:px-8 space-y-12">
        
        {/* Tier 1: Profile & Core Settings */}
        <section>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Left: Profile Image */}
            <div className="flex-shrink-0 relative group">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-md relative">
                <Image
                  src="https://picsum.photos/seed/alex123/400/400"
                  alt="Profile Photo"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                  <div className="flex flex-col items-center text-white">
                    <Camera className="w-8 h-8 mb-1" />
                    <span className="text-sm font-medium">Edit Photo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Profile Hub */}
            <div className="flex-grow w-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="font-outfit text-2xl font-bold text-slate-900 mb-1">
                    Profile Hub
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Manage your personal details and settings.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Editable Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                       Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Preferences Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Language
                      </label>
                      <div className="relative">
                        <select
                          className="appearance-none pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          value={profile.language}
                          onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                        >
                          <option value="English (US)">English (US)</option>
                          <option value="French (FR)">Française (FR)</option>
                          <option value="Spanish (ES)">Español (ES)</option>
                        </select>
                        <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Privacy
                      </label>
                      <div className="flex items-center gap-3 h-[42px]">
                        <button
                          onClick={() => setProfile({ ...profile, isPrivate: !profile.isPrivate })}
                          className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2",
                            profile.isPrivate ? "bg-blue-600" : "bg-slate-200"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                              profile.isPrivate ? "translate-x-6" : "translate-x-1"
                            )}
                          />
                        </button>
                        <span className="text-sm font-medium text-slate-700">
                          {profile.isPrivate ? "Private Profile" : "Public Profile"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end flex-grow">
                    <button className="text-sm font-medium text-red-500/80 hover:text-red-600 transition-colors flex items-center gap-1.5 focus:outline-none focus:underline underline-offset-4">
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </button>
                  </div>
                </div>

                {/* Save Action */}
                <AnimatePresence>
                  {hasChanges && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button
                          onClick={handleSave}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-blue-500/30 active:scale-95"
                        >
                          Save Changes
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Tier 2: Preplanned Trips */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-outfit text-2xl font-bold text-slate-900">
              Preplanned Trips
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PreplannedTripCard
              image="https://picsum.photos/seed/santorini/800/600"
              title="Santorini Getaway"
              dateCreated="Added Sep 12"
            />
            <PreplannedTripCard
              image="https://picsum.photos/seed/kyoto/800/600"
              title="Autumn in Kyoto"
              dateCreated="Added Oct 05"
            />
            <PreplannedTripCard
              image="https://picsum.photos/seed/iceland/800/600"
              title="Nordic Expedition"
              dateCreated="Added Nov 21"
            />
          </div>
        </section>

        {/* Tier 3: Previous Trips */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-outfit text-2xl font-bold text-slate-900">
              Previous Trips
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PreviousTripCard
              image="https://picsum.photos/seed/rome/800/600"
              title="Roman Holiday"
              dates="Jun 10 - Jun 18, 2025"
              rating={5}
            />
            <PreviousTripCard
              image="https://picsum.photos/seed/banff/800/600"
              title="Banff National Park"
              dates="Aug 05 - Aug 12, 2024"
              rating={4}
            />
            <PreviousTripCard
              image="https://picsum.photos/seed/bali/800/600"
              title="Bali Surf & Yoga"
              dates="Feb 14 - Mar 01, 2024"
              rating={5}
            />
          </div>
        </section>

      </main>
    </div>
  );
}