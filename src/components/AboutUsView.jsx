import React from 'react';
import { Dumbbell, Award, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import TrainerRavi from './TrainerRavi';
import ClientStories from './ClientStories';

export default function AboutUsView({ onOpenTrialModal }) {
  return (
    <div className="min-h-screen bg-black text-white pt-6 pb-20">
      
      {/* Header */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-b border-neutral-800 text-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/30 px-4 py-1.5 rounded-full text-lime-400 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" /> About Energie Fitness Bulandshahr
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight font-['Outfit']">
            OUR STORY & <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">MISSION</span>
          </h1>

          <p className="text-neutral-400 text-base md:text-xl max-w-3xl mx-auto mt-4 leading-relaxed font-medium">
            Founded with a vision to deliver world-class fitness infrastructure, personalized coaching, and a vibrant community atmosphere right here in Bulandshahr.
          </p>
        </div>
      </section>

      {/* Main Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-4 hover:border-lime-400/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-lime-400/10 border border-lime-400/30 text-lime-400 flex items-center justify-center">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white font-['Outfit'] uppercase">World-Class Rigs</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Equipped with pin-loaded biomechanical strength machines, rubberized dumbbell setups up to 50kg, and custom powerlifting platforms.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-4 hover:border-lime-400/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white font-['Outfit'] uppercase">Certified Personal Coaching</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Led by Head Coach Ravi with certified expertise in functional bodybuilding, powerlifting, weight loss routines, and customized macro dietician charts.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-4 hover:border-lime-400/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white font-['Outfit'] uppercase">Couples & Family Friendly</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Clean, safe, hygienic, and welcoming environment tailored for individuals, couples, and fitness enthusiasts of all age groups.
            </p>
          </div>
        </div>
      </section>

      {/* Trainer Ravi Section */}
      <TrainerRavi />

      {/* Testimonials */}
      <ClientStories />

    </div>
  );
}
