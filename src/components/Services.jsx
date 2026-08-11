import React from 'react';
import { Dumbbell, Zap, Users, Target, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function Services({ onOpenTrialModal, services }) {
  const activeServices = services || GYM_DETAILS.services;

  const iconMap = {
    Dumbbell: <Dumbbell className="w-6 h-6 text-yellow-400" />,
    Zap: <Zap className="w-6 h-6 text-red-500" />,
    Users: <Users className="w-6 h-6 text-yellow-400" />,
    Target: <Target className="w-6 h-6 text-red-500" />,
    Heart: <Heart className="w-6 h-6 text-yellow-400" />
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-[#0d0d0d] border-t border-red-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="w-full max-w-6xl mx-auto px-4 text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 px-4 py-1.5 rounded-full text-yellow-400 text-xs font-black uppercase tracking-widest">
            <Zap className="w-4 h-4 text-red-500" /> High-Performance Facilities
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-['Outfit'] leading-tight">
            TRAIN WITH <span className="text-yellow-400">THE BEST</span> IN BULANDSHAHR
          </h2>
          <p className="text-[#b3b3b3] text-sm sm:text-base max-w-2xl mx-auto">
            Modern pin-loaded strength machines, heavy dumbbell arena, CrossFit cage, and personal coaching.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-[#121212] border border-neutral-800 rounded-2xl p-6 hover:border-red-600 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center border border-red-600/40 shadow-md">
                  {iconMap[service.icon] || <Dumbbell className="w-6 h-6 text-yellow-400" />}
                </div>

                <div>
                  <h3 className="text-xl font-black text-white font-['Outfit'] mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-[#b3b3b3] text-xs leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-neutral-300 pt-3 border-t border-neutral-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" /> Advanced Imported Equipment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> Certified Coach Supervision
                  </li>
                </ul>
              </div>

              <div className="pt-5 mt-5 border-t border-neutral-800">
                <button 
                  onClick={onOpenTrialModal} 
                  className="w-full text-xs font-black uppercase text-neutral-300 hover:text-yellow-400 flex items-center justify-between transition"
                >
                  <span>Experience in 1-Day Trial</span>
                  <ArrowRight className="w-4 h-4 text-yellow-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
