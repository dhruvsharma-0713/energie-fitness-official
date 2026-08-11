import React, { useState } from 'react';
import { Ticket, X, CheckCircle2, User, Phone, Calendar, Clock, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

export default function FreeTrialModal({ isOpen, onClose, onAddLead }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    slot: 'Morning Slot (7 AM - 9 AM)',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState(null);

  if (!isOpen) return null;

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
      const ticketId = `EF-TRIAL-${Math.floor(100000 + Math.random() * 900000)}`;

      const newLeadObj = {
        id: `LD-${Math.floor(500 + Math.random() * 500)}`,
        name: formData.name.trim(),
        phone: `+91 ${cleanPhone}`,
        date: formData.date,
        slot: formData.slot,
        status: 'New Lead',
        note: `Generated 1-Day Trial Ticket (${ticketId})`
      };

      // Automatically push directly into backend database state
      if (onAddLead) {
        onAddLead(newLeadObj);
      }

      setGeneratedTicket({
        ticketId,
        name: formData.name.trim(),
        phone: `+91 ${cleanPhone}`,
        slot: formData.slot,
        date: formData.date
      });

      setIsSuccess(true);
    }, 1200);
  };

  const handleCloseModal = () => {
    setIsSuccess(false);
    setGeneratedTicket(null);
    setFormData({
      name: '',
      phone: '',
      slot: 'Morning Slot (7 AM - 9 AM)',
      date: new Date().toISOString().split('T')[0]
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border-2 border-red-600/60 max-w-md w-full p-6 md:p-8 rounded-3xl space-y-6 relative shadow-2xl overflow-hidden">
        
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600" />

        {/* Close Button */}
        <button 
          onClick={handleCloseModal} 
          className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white transition border border-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-red-600/20 border border-red-600/40 px-3 py-1 rounded-full text-yellow-400 text-[10px] font-black uppercase tracking-widest">
                <Ticket className="w-3.5 h-3.5 text-red-500" /> 100% FREE VIP TRIAL PASS
              </div>
              <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">
                CLAIM YOUR <span className="text-yellow-400">1-DAY PASS</span>
              </h3>
              <p className="text-xs text-[#b3b3b3]">
                Experience all machines, CrossFit cage, and meet Coach Ravi with zero obligations.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
                  Full Name *
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
                <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
                    Visit Date
                  </label>
                  <input 
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3 py-3 text-xs text-white focus:border-yellow-400 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
                    Slot
                  </label>
                  <select 
                    value={formData.slot}
                    onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl px-2 py-3 text-xs text-white focus:border-yellow-400 focus:outline-none transition"
                  >
                    <option value="Morning Slot (6 AM - 9 AM)">Morning (6 - 9 AM)</option>
                    <option value="Evening Slot (5 PM - 9:30 PM)">Evening (5 - 9:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Interactive CTA Button with loading spinner & micro-interactions */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-yellow-400/20 transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Syncing & Generating Pass...</span>
                  </div>
                ) : (
                  <>
                    <span>Generate Digital Trial Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Confirmation State with Digital Pass Ticket (No manual WhatsApp requirement) */
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-block bg-yellow-400 text-black font-black text-[10px] uppercase px-3 py-1 rounded-md mb-2">
                PASS SAVED TO DATABASE
              </div>
              <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">
                TRIAL PASS CONFIRMED!
              </h3>
              <p className="text-xs text-[#b3b3b3] mt-1">
                Your 1-Day Trial Ticket has been saved into the gym database. Show code <strong className="text-yellow-400 font-mono">{generatedTicket.ticketId}</strong> at front desk upon arrival.
              </p>
            </div>

            {/* Ticket Card Summary */}
            <div className="bg-black p-4 rounded-2xl border border-neutral-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">Ticket ID:</span>
                <strong className="text-yellow-400 font-mono">{generatedTicket.ticketId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">Holder:</span>
                <strong className="text-white">{generatedTicket.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">Slot & Date:</span>
                <strong className="text-white">{generatedTicket.date} ({generatedTicket.slot})</strong>
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs uppercase py-3.5 rounded-xl border border-neutral-700 transition"
            >
              Done & Return to Site
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
