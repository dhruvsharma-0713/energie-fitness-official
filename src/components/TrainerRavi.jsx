import React from 'react';
import { Award, ShieldCheck, Dumbbell, Flame, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function TrainerRavi({ onOpenTrialModal }) {
  return (
    <section className="py-16 md:py-24 bg-[#0d0d0d] border-t border-red-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121212] border border-red-600/40 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Background Red Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Trainer Image Frame */}
            <div className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-red-600/60 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1600&q=80" 
                alt="Coach Ravi - Founder & Head Coach at Energie Fitness" 
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1600&q=80';
                  e.currentTarget.onerror = null;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs uppercase px-3 py-1 rounded-md tracking-wider shadow-lg">
                HEAD COACH & FOUNDER
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-[#0d0d0d]/90 backdrop-blur-md p-3.5 rounded-xl border border-neutral-800">
                <div className="text-white font-black text-base font-['Outfit']">COACH RAVI</div>
                <div className="text-yellow-400 text-xs font-bold">10+ Years Bodybuilding & CrossFit Expertise</div>
              </div>
            </div>

            {/* Trainer Info Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 px-3.5 py-1.5 rounded-full text-yellow-400 text-xs font-black uppercase tracking-widest">
                <Award className="w-4 h-4 text-red-500" /> Certified Transformation Specialist
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-['Outfit'] leading-tight break-words px-1">
                TRAIN UNDER <span className="text-yellow-400 inline-block">COACH RAVI</span>
              </h2>

              <p className="text-[#b3b3b3] text-sm md:text-base leading-relaxed">
                Whether your target is aggressive body fat loss, muscle gain, functional CrossFit conditioning, or dual couple workout routines — Coach Ravi provides personalized instruction, posture checks, and custom dietician macro charts.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm font-bold text-neutral-200">
                <div className="flex items-center gap-2.5 bg-black/60 p-3 rounded-xl border border-neutral-800">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>Certified Personal Fitness Trainer</span>
                </div>

                <div className="flex items-center gap-2.5 bg-black/60 p-3 rounded-xl border border-neutral-800">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>CrossFit & Functional Cage Specialist</span>
                </div>

                <div className="flex items-center gap-2.5 bg-black/60 p-3 rounded-xl border border-neutral-800">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>Customized Diet & Macro Charts</span>
                </div>

                <div className="flex items-center gap-2.5 bg-black/60 p-3 rounded-xl border border-neutral-800">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Couple Partner Exercise Routines</span>
                </div>
              </div>

              {/* Action Triggers */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onOpenTrialModal}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-yellow-400/20 transition transform hover:-translate-y-0.5"
                >
                  Book Session With Ravi
                </button>

                <a
                  href={`https://wa.me/${GYM_DETAILS.whatsapp}?text=Hi%20Coach%20Ravi,%20I%20want%20to%20start%20personal%20training`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/20 transition flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Coach Ravi
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
