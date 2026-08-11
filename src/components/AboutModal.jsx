import React from 'react';
import { X, Sparkles, MapPin, Clock, Award, ShieldCheck, Dumbbell, ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function AboutModal({ isOpen, onClose, onOpenTrialModal }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border-2 border-yellow-400/60 max-w-2xl w-full p-6 md:p-8 rounded-3xl space-y-6 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-white">
        
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-lime-400" />

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white transition border border-neutral-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-lime-400/10 border border-lime-400/30 px-3 py-1 rounded-full text-lime-400 text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" /> About Energie Fitness Bulandshahr
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] uppercase">
            OUR STORY & <span className="text-lime-400">MISSION</span>
          </h3>
          <p className="text-xs text-[#b3b3b3]">
            Bulandshahr’s premier health club, CrossFit arena, and personal coaching facility.
          </p>
        </div>

        {/* Gym Story Overview */}
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 text-xs leading-relaxed text-neutral-300">
          <p>
            Founded by <strong className="text-white">Coach Ravi</strong>, Energie Fitness was built with a vision to bring high-precision biomechanical strength machines, a rubberized dumbbell arena up to 50kg, and dedicated functional CrossFit rigs to Bulandshahr.
          </p>
          <p>
            Whether your goal is aggressive fat loss, hypertrophy muscle building, or couple fitness routines, our team provides 1-on-1 guidance, posture checks, and tailored nutrition charts.
          </p>
        </div>

        {/* Coach Ravi Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-black border border-neutral-800 space-y-1">
            <div className="flex items-center gap-2 text-yellow-400 font-extrabold uppercase">
              <Award className="w-4 h-4 text-red-500" /> Head Coach Ravi
            </div>
            <p className="text-neutral-400 text-[11px]">10+ Years Bodybuilding & Functional Training Expertise</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black border border-neutral-800 space-y-1">
            <div className="flex items-center gap-2 text-lime-400 font-extrabold uppercase">
              <ShieldCheck className="w-4 h-4 text-lime-400" /> Safety & Hygiene
            </div>
            <p className="text-neutral-400 text-[11px]">Sanitized equipment floor & 24/7 CCTV security surveillance</p>
          </div>
        </div>

        {/* Timings & Address Details */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-white font-extrabold uppercase border-b border-neutral-800 pb-2">
            <MapPin className="w-4 h-4 text-yellow-400" /> Location & Facility Slots
          </div>

          <p className="text-neutral-300">
            <strong>Address:</strong> {GYM_DETAILS.fullAddress}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            {GYM_DETAILS.timingSlots.map((slot, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800/80">
                <span className="text-yellow-400 font-bold block">{slot.name} ({slot.days})</span>
                <span className="text-white font-mono">{slot.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              if (onOpenTrialModal) onOpenTrialModal();
            }}
            className="w-full sm:w-1/2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Book 1-Day Free Trial Pass</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-1/2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase py-3.5 rounded-xl border border-neutral-700 transition cursor-pointer"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
}
