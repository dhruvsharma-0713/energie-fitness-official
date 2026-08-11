import React, { useState } from 'react';
import { Check, Heart, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function Pricing({ onSelectPlan, plans }) {
  const [includePT, setIncludePT] = useState(false);
  const activePlans = plans || GYM_DETAILS.plans;

  return (
    <section id="plans" className="py-16 md:py-24 bg-[#0d0d0d] border-t border-red-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 px-4 py-1.5 rounded-full text-yellow-400 text-xs font-black uppercase tracking-widest">
            <Tag className="w-4 h-4 text-red-500" /> Transparent Pricing & Packages
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase font-['Outfit']">
            MEMBERSHIP <span className="text-yellow-400">PACKAGES</span>
          </h2>
          <p className="text-[#b3b3b3] text-sm sm:text-base">
            Choose single passes or save big with our exclusive <strong>Couple Packages</strong> and Annual Memberships.
          </p>

          {/* PT Add-on Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className="text-xs sm:text-sm font-bold text-white">Add 1-on-1 Personal Trainer (+₹1,000/mo)</span>
            <button 
              onClick={() => setIncludePT(!includePT)} 
              className={`w-12 h-7 rounded-full p-1 transition duration-300 ${includePT ? 'bg-yellow-400' : 'bg-neutral-800'}`}
              aria-label="Toggle Personal Trainer"
            >
              <div className={`w-5 h-5 rounded-full bg-black transition transform duration-300 ${includePT ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {activePlans.map((plan) => {
            const finalPrice = includePT ? plan.price + 1000 : plan.price;

            return (
              <div 
                key={plan.id}
                className={`bg-[#121212] border rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 hover:border-red-600 hover:scale-[1.02] shadow-xl ${
                  plan.isCouple 
                    ? 'border-red-600/60 bg-[#170a0a]' 
                    : plan.badge === 'Popular' 
                      ? 'border-yellow-400/60' 
                      : 'border-neutral-800'
                }`}
              >
                {/* Popular / Best Value Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={`badge ${
                      plan.isCouple ? 'bg-red-600 text-white font-black' : 'bg-yellow-400 text-black font-black'
                    } text-[10px] uppercase px-3 py-1 rounded-full shadow-lg`}>
                      {plan.isCouple && <Heart className="w-3 h-3 fill-current inline mr-1" />}
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-5 pt-2">
                  <div>
                    <h3 className="text-xl font-black text-white font-['Outfit']">{plan.name}</h3>
                    <p className="text-xs text-[#b3b3b3] font-bold mt-1">{plan.duration}</p>
                  </div>

                  {/* Price Display */}
                  <div className="py-3 border-y border-neutral-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white font-['Outfit']">₹{finalPrice.toLocaleString('en-IN')}</span>
                      {plan.originalPrice && (
                        <span className="text-xs text-neutral-500 line-through font-mono">₹{plan.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                    {includePT && (
                      <p className="text-[11px] text-yellow-400 font-extrabold mt-1">+ Personal Trainer Guidance Included</p>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs text-neutral-300">
                    {plan.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Button */}
                <div className="pt-6 mt-6 border-t border-neutral-800">
                  <button 
                    onClick={() => onSelectPlan({ ...plan, finalPrice, includePT })}
                    className={`w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg ${
                      plan.isCouple 
                        ? 'bg-red-600 hover:bg-red-500 text-white' 
                        : 'bg-yellow-400 hover:bg-yellow-300 text-black'
                    }`}
                  >
                    <span>Get Plan Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
