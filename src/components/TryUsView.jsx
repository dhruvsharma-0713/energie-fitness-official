import React, { useState } from 'react';
import { Ticket, CheckCircle2, Calendar, Clock, User, Phone, Sparkles, ArrowRight, ShieldCheck, Printer, AlertCircle } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function TryUsView({ onAddLead }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    slot: 'Morning Slot (7 AM - 9 AM)',
    interest: 'CrossFit & General Gym',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const errs = {};
    
    // Name validation: Min 2 non-empty chars
    if (!formData.name || formData.name.trim().length < 2) {
      errs.name = 'Full name must be at least 2 characters long';
    }

    // Phone validation: Exact 10 digits starting with 6-9
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = 'Phone number is required';
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'Enter a valid 10-digit mobile number (e.g. 9876543210)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanPhone = formData.phone.replace(/\D/g, '');
      const ticketId = `EF-PASS-${Math.floor(100000 + Math.random() * 900000)}`;
      const ticketObj = {
        ...formData,
        phone: `+91 ${cleanPhone}`,
        ticketId,
        status: 'VERIFIED_1DAY_FREE',
        issuedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      // Automatically push directly into backend database state (Requirement 3)
      if (onAddLead) {
        onAddLead({
          id: `LD-${Math.floor(500 + Math.random() * 500)}`,
          name: formData.name.trim(),
          phone: `+91 ${cleanPhone}`,
          date: formData.date,
          slot: formData.slot,
          status: 'New Lead',
          note: `Free Trial Pass Claimed (${formData.interest})`
        });
      }

      setGeneratedTicket(ticketObj);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white pt-6 pb-20">
      
      {/* Hero Header */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#121212] via-[#0d0d0d] to-[#0d0d0d] border-b border-neutral-800 text-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 px-4 py-1.5 rounded-full text-yellow-400 text-xs font-black uppercase tracking-widest mb-6">
            <Ticket className="w-4 h-4 text-red-500" /> 100% Free VIP Demo Pass
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight font-['Outfit']">
            TRY US <span className="text-yellow-400">FOR FREE</span>
          </h1>

          <p className="text-[#b3b3b3] text-base md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed font-medium">
            Get 1-Day full access to Bulandshahr’s premier fitness club. Test all machines, try our CrossFit cage, and meet Coach Ravi with zero obligations.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Benefits Left Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#121212] border border-neutral-800 p-6 rounded-3xl space-y-6 shadow-xl">
                <h3 className="text-xl font-extrabold text-white font-['Outfit'] uppercase">
                  WHAT'S INCLUDED IN YOUR <span className="text-yellow-400">FREE PASS</span>
                </h3>

                <div className="space-y-4 text-xs md:text-sm text-neutral-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold">Full Gym Floor Access</strong>
                      <span>Unlimited use of pin-loaded machines & cardio area.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold">CrossFit Arena Session</strong>
                      <span>Experience battle ropes, kettlebells, and functional cage training.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold">Trainer Consultation</strong>
                      <span>Free fitness assessment & posture advice from Coach Ravi.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold">Zero Joining Fee Guarantee</strong>
                      <span>Exclusive bonus discount if you upgrade after your trial.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 text-xs text-[#b3b3b3] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  <span>Instant digital pass generation with zero payment needed.</span>
                </div>
              </div>
            </div>

            {/* Form Right Box */}
            <div className="lg:col-span-7 bg-[#121212] border border-neutral-800 p-6 md:p-8 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-black text-white font-['Outfit'] mb-6 uppercase flex items-center gap-2">
                <Ticket className="w-6 h-6 text-yellow-400" /> Book Your Free Trial Ticket
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-black uppercase text-neutral-300 mb-2">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-yellow-400 focus:outline-none transition"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-[11px] font-bold mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-neutral-300 mb-2">
                    10-Digit Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    <input 
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:border-yellow-400 focus:outline-none transition"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-[11px] font-bold mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-neutral-300 mb-2">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                      <input 
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-yellow-400 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-neutral-300 mb-2">
                      Preferred Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                      <select 
                        value={formData.slot}
                        onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                        className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-yellow-400 focus:outline-none transition"
                      >
                        <option value="Morning Slot (6 AM - 8 AM)">Morning (6 AM - 8 AM)</option>
                        <option value="Morning Slot (8 AM - 10 AM)">Morning (8 AM - 10 AM)</option>
                        <option value="Evening Slot (5 PM - 7 PM)">Evening (5 PM - 7 PM)</option>
                        <option value="Evening Slot (7 PM - 9:30 PM)">Evening (7 PM - 9:30 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-neutral-300 mb-2">
                    Primary Fitness Interest
                  </label>
                  <select 
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-yellow-400 focus:outline-none transition"
                  >
                    <option value="CrossFit & General Gym">CrossFit & General Gym Access</option>
                    <option value="Weight Loss HIIT">Weight Loss & Fat Burn Routine</option>
                    <option value="Personal Coaching">1-on-1 Personal Training with Coach Ravi</option>
                    <option value="Couple Pass Special">Couple Special Package Inquiry</option>
                  </select>
                </div>

                {/* Requirement 2 & 3: Redesigned CTA Button with micro-interactions & auto database sync */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-black font-black text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-yellow-400/20 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Generating Pass & Syncing Database...</span>
                    </div>
                  ) : (
                    <>
                      <span>Generate Digital Trial Pass</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        ) : (
          /* Generated Ticket Pass View (No manual WhatsApp requirement) */
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-gradient-to-b from-[#121212] via-black to-[#121212] border-2 border-yellow-400 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl text-center">
              
              {/* Ticket Top Badge */}
              <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-black text-xs uppercase px-4 py-1.5 rounded-full mb-6 shadow-md">
                <Ticket className="w-4 h-4" /> OFFICIAL 1-DAY FREE VIP TICKET
              </div>

              <h2 className="text-3xl font-black text-white font-['Outfit'] mb-1">
                ENERGIE FITNESS BULANDSHAHR
              </h2>
              <p className="text-[#b3b3b3] text-xs mb-6">{GYM_DETAILS.fullAddress}</p>

              {/* Barcode Simulation */}
              <div className="bg-white p-4 rounded-2xl max-w-xs mx-auto mb-6 shadow-lg text-black">
                <div className="flex justify-center items-center gap-1 h-12 mb-2">
                  {[4, 2, 6, 1, 3, 5, 2, 4, 1, 6, 3, 2, 5, 4, 1, 3, 2, 6, 4, 2].map((w, i) => (
                    <div key={i} className="bg-black h-full" style={{ width: `${w}px` }} />
                  ))}
                </div>
                <div className="font-mono font-bold text-xs tracking-widest uppercase">
                  {generatedTicket.ticketId}
                </div>
              </div>

              {/* Details Summary */}
              <div className="grid grid-cols-2 gap-3 bg-[#0d0d0d] p-4 rounded-2xl border border-neutral-800 text-left text-xs mb-6">
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Pass Holder</span>
                  <strong className="text-white font-bold">{generatedTicket.name}</strong>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Contact</span>
                  <strong className="text-white font-bold">{generatedTicket.phone}</strong>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Valid Date</span>
                  <strong className="text-yellow-400 font-bold">{generatedTicket.date}</strong>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Chosen Slot</span>
                  <strong className="text-yellow-400 font-bold">{generatedTicket.slot}</strong>
                </div>
              </div>

              <div className="text-xs text-[#b3b3b3] leading-relaxed border-t border-neutral-800 pt-4">
                Saved into the gym database! Please present code <strong className="text-white font-mono">{generatedTicket.ticketId}</strong> at front desk upon arrival.
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => window.print()}
                className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase px-5 py-3.5 rounded-xl border border-neutral-700 transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print Pass Ticket
              </button>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-5 py-3.5 rounded-xl transition"
              >
                Book Another Pass
              </button>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
