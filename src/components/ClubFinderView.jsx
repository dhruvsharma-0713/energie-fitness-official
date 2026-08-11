import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Dumbbell, ShieldCheck, ExternalLink, Navigation, CheckCircle2 } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';
import ClubGallery from './ClubGallery';

export default function ClubFinderView({ onOpenTrialModal }) {
  return (
    <div className="min-h-screen bg-black text-white pt-6 pb-20">
      
      {/* Header */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-b border-neutral-800 text-center overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-10 px-4 space-y-4 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-lime-500/30 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-2">
            📍 Official Club Finder
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-['Outfit'] leading-tight">
            OUR <span className="text-yellow-400">CLUB</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Discover Bulandshahr’s highest-rated fitness club. Located conveniently at Shikarpur Bypass Road with top-tier equipment and spacious CrossFit arena.
          </p>
        </div>
      </section>

      {/* Main Club Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-10 shadow-2xl space-y-10">
          
          {/* Top Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block bg-lime-400 text-black font-extrabold text-xs uppercase px-3 py-1 rounded-md">
                MAIN FLAGSHIP BRANCH
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-['Outfit']">
                ENERGIE FITNESS <span className="text-lime-400">BULANDSHAHR</span>
              </h2>

              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                {GYM_DETAILS.fullAddress}
              </p>

              {/* Quick Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
                <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-lime-400/10 text-lime-400 flex items-center justify-center border border-lime-400/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] uppercase font-bold block">Front Desk Phone</span>
                    <strong className="text-white font-bold">{GYM_DETAILS.phone}</strong>
                  </div>
                </div>

                <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] uppercase font-bold block">WhatsApp Desk</span>
                    <strong className="text-emerald-400 font-bold">Available 24/7</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={GYM_DETAILS.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-lime-400/20 transition flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4" /> Get Directions on Google Maps <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onOpenTrialModal}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-neutral-700 transition"
                >
                  Book 1-Day Trial Pass
                </button>
              </div>
            </div>

            {/* Right Timings Box */}
            <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-lg font-extrabold text-white font-['Outfit'] uppercase flex items-center gap-2 border-b border-neutral-800 pb-3">
                <Clock className="w-5 h-5 text-lime-400" /> CLUB OPERATING HOURS
              </h3>

              <div className="space-y-4 text-xs md:text-sm">
                {GYM_DETAILS.timingSlots.map((slot, index) => (
                  <div key={index} className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800/80">
                    <div className="flex items-center justify-between font-bold text-white mb-1">
                      <span>{slot.name}</span>
                      <span className="text-lime-400 font-mono text-xs">{slot.hours}</span>
                    </div>
                    <div className="text-neutral-400 text-xs flex items-center justify-between">
                      <span>Days: {slot.days}</span>
                      <span className="text-[11px] text-neutral-400 font-medium">({slot.note})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Map Embed Frame */}
          <div className="rounded-2xl overflow-hidden border-2 border-red-600/40 aspect-video md:aspect-[21/9] bg-neutral-950 relative shadow-2xl group">
            <iframe
              title="Energie Fitness Bulandshahr Map Location"
              src="https://maps.google.com/maps?q=Energie+Fitness,+Shikarpur+Bypass+Rd,+Faislabad,+Bulandshahr,+Uttar+Pradesh+203001&t=&z=17&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-full border-0 filter brightness-90 contrast-110 hover:brightness-100 transition-all duration-300"
              allowFullScreen=""
              loading="lazy"
            />
            
            {/* Direct Open Overlay Pill */}
            <a 
              href={GYM_DETAILS.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-black/20 transition transform hover:-translate-y-0.5 z-10"
            >
              <Navigation className="w-4 h-4 text-black" /> Open in Google Maps App <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* Facilities Gallery */}
      <ClubGallery />

    </div>
  );
}
