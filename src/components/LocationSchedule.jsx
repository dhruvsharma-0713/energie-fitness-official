import React from 'react';
import { MapPin, Clock, Phone, Navigation, MessageCircle, ShieldCheck } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function LocationSchedule() {
  return (
    <section id="location" className="py-20 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 px-4 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full border border-lime-500/30 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-2">
            📍 Official Club Finder
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-['Outfit'] leading-tight">
            OUR <span className="text-yellow-400">CLUB</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Discover Bulandshahr’s highest-rated fitness club. Located conveniently on Shikarpur Bypass Road near Tanda / Bhoor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Address & Contact Card */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between hover:border-lime-500/50 transition-all">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-lime-400/10 text-lime-400 border border-lime-400/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white font-['Outfit']">Gym Location</h3>
                  <p className="text-xs text-neutral-400">Shikarpur Bypass Road, Bhoor</p>
                </div>
              </div>

              <p className="text-neutral-200 text-sm leading-relaxed">
                <strong>{GYM_DETAILS.address}</strong>, Bulandshahr, Uttar Pradesh - 203001
              </p>

              <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700 space-y-1 text-xs">
                <p className="text-neutral-400">Management Desk Contact</p>
                <p className="text-base font-extrabold text-white font-mono">Head Coach Ravi: {GYM_DETAILS.phone}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex flex-wrap gap-3">
              <a 
                href={GYM_DETAILS.mapUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn-primary text-xs"
              >
                <Navigation className="w-4 h-4" /> Google Maps Directions
              </a>

              <a 
                href={`https://wa.me/${GYM_DETAILS.whatsapp}?text=Hi%20Ravi%20ji,%20I%20want%20to%20visit%20Energie%20Fitness.`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Desk
              </a>
            </div>

          </div>

          {/* Timings Card */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between hover:border-lime-500/50 transition-all">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-400/10 text-purple-400 border border-purple-400/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white font-['Outfit']">Operating Slots</h3>
                  <p className="text-xs text-neutral-400">Morning & Evening Availability</p>
                </div>
              </div>

              <div className="space-y-3" id="timings">
                {GYM_DETAILS.timingSlots.map((slot, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-neutral-800/60 border border-neutral-700 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-lime-400 uppercase tracking-wider">{slot.name}</span>
                      <p className="text-sm font-bold text-white font-mono">{slot.hours}</p>
                    </div>
                    <span className="badge badge-purple text-[10px]">{slot.days}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-800/40 border border-neutral-700 text-xs text-neutral-300">
              <p className="font-semibold flex items-center gap-1 text-purple-400">
                <ShieldCheck className="w-4 h-4" /> Supervision Guarantee
              </p>
              <p className="text-neutral-400 text-[11px] mt-0.5">Trainer guidance & personal coaching available during both morning and evening slots.</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
