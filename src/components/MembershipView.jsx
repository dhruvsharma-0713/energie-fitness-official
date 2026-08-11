import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, Tag, ArrowRight, HelpCircle, Gift, PhoneCall } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';
import Pricing from './Pricing';

export default function MembershipView({ onSelectPlan, onOpenTrialModal, plans, specialOffers }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const activeOffers = specialOffers || GYM_DETAILS.specialOffers;

  return (
    <div className="min-h-screen bg-black text-white pt-6 pb-20">
      
      {/* Header Banner */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-b border-neutral-800 text-center overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/30 px-4 py-1.5 rounded-full text-lime-400 text-xs font-black uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" /> Transparent Pricing & Couple Special Offers
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-['Outfit'] leading-tight">
            MEMBERSHIP <span className="text-lime-400">PACKAGES & OFFERS</span>
          </h1>

          <p className="text-neutral-400 text-base md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed font-medium">
            Invest in your health with Bulandshahr’s best value gym packages. Flexible payment options via UPI, Card, or Cash with zero hidden fees.
          </p>
        </div>
      </section>

      {/* Exciting Offers Ticker Cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-lime-400 font-black text-xs uppercase tracking-widest mb-6">
          <Tag className="w-4 h-4" /> Active Membership Deals
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeOffers.map((offer) => (
            <div 
              key={offer.id} 
              className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 hover:border-lime-400/50 p-6 rounded-2xl relative overflow-hidden group shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 bg-lime-400 text-black font-extrabold text-[10px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                {offer.tag}
              </div>

              <div className="w-10 h-10 rounded-xl bg-lime-400/10 text-lime-400 flex items-center justify-center mb-4 border border-lime-400/20">
                <Gift className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-extrabold text-white font-['Outfit'] mb-2">
                {offer.title}
              </h3>

              <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                {offer.desc}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800 text-xs">
                <span className="text-neutral-400">Promo Code: <strong className="text-lime-400 font-mono tracking-wider">{offer.code}</strong></span>
                <button
                  onClick={() => onOpenTrialModal(offer)}
                  className="bg-lime-400/10 hover:bg-lime-400 text-lime-400 hover:text-black border border-lime-400/40 px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition duration-200 transform hover:scale-105 cursor-pointer shadow-md"
                >
                  <span>Claim Deal</span> <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Interactive Pricing Section */}
      <Pricing onSelectPlan={onSelectPlan} plans={plans} />

      {/* Feature Comparison Table */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight font-['Outfit']">
            MEMBERSHIP <span className="text-lime-400">BENEFITS COMPARISON</span>
          </h2>
          <p className="text-neutral-400 text-sm mt-2">Compare what's included in each plan type</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-neutral-950 text-neutral-300 font-extrabold uppercase border-b border-neutral-800">
                <th className="p-4 md:p-6">Feature / Facility</th>
                <th className="p-4 md:p-6 text-center">Monthly Single</th>
                <th className="p-4 md:p-6 text-center text-lime-400">Quarterly Transformation</th>
                <th className="p-4 md:p-6 text-center text-amber-400">Couple Annual VIP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              <tr>
                <td className="p-4 md:p-6 font-bold text-white">Full Gym & Pin-Loaded Rigs</td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /></td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /></td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 font-bold text-white">CrossFit Arena & Battle Ropes</td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /></td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /></td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 font-bold text-white">Customized Diet & Macro Chart</td>
                <td className="p-4 md:p-6 text-center text-neutral-400">-</td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /></td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 font-bold text-white">1-on-1 Personal Trainer Included</td>
                <td className="p-4 md:p-6 text-center text-neutral-400">General Guidance</td>
                <td className="p-4 md:p-6 text-center text-neutral-400">Optional Add-on</td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /> (3 Months)</td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 font-bold text-white">Digital QR Pass & Attendance Logger</td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /></td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /></td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /> (Dual Pass)</td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 font-bold text-white">Locker & Steam Room Access</td>
                <td className="p-4 md:p-6 text-center text-neutral-400">-</td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /></td>
                <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-lime-400 mx-auto" /> VIP Locker</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-black uppercase tracking-widest mb-2">
            <HelpCircle className="w-4 h-4" /> Got Questions?
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-['Outfit'] uppercase">
            FREQUENTLY ASKED <span className="text-lime-400">QUESTIONS</span>
          </h2>
        </div>

        <div className="space-y-4">
          {GYM_DETAILS.faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full text-left p-5 text-white font-extrabold text-sm md:text-base flex items-center justify-between gap-4 hover:text-lime-400 transition"
              >
                <span>{faq.q}</span>
                <span className="text-lime-400 text-xl font-bold">{activeFaq === index ? '−' : '+'}</span>
              </button>
              {activeFaq === index && (
                <div className="px-5 pb-5 text-neutral-400 text-xs md:text-sm leading-relaxed border-t border-neutral-800/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-white font-bold text-base">Have custom requirements or corporate bookings?</h4>
            <p className="text-neutral-400 text-xs">Speak directly with Coach Ravi for customized packages.</p>
          </div>
          <a
            href="tel:+918384855909"
            className="bg-lime-400 text-black font-extrabold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:bg-lime-300 transition whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" /> Call +91 83848 55909
          </a>
        </div>
      </section>

    </div>
  );
}
