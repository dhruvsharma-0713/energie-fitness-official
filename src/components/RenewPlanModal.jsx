import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, QrCode, Lock, ArrowRight, Loader2, Dumbbell, Award, Sparkles, CreditCard, Calendar, Clock, AlertCircle } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function RenewPlanModal({ 
  isOpen, 
  onClose, 
  member, 
  onCompleteRenewal, 
  onViewReceipt 
}) {
  const plans = GYM_DETAILS?.plans || [
    { id: 'monthly-single', title: 'Monthly Single Pass', price: 1500, priceNum: 1500, duration: '1 Month', durationMonths: 1, desc: 'Full club access for 30 days.' },
    { id: 'quarterly-single', title: 'Quarterly Transformation', price: 3800, priceNum: 3800, duration: '3 Months', durationMonths: 3, desc: 'High-value 90-day transformation split.' },
    { id: 'annual-single', title: 'Annual Beast Plan', price: 11000, priceNum: 11000, duration: '12 Months', durationMonths: 12, desc: '365 days unlimited all-access membership.' },
    { id: 'annual-couple', title: 'Couple Annual VIP', price: 18000, priceNum: 18000, duration: '12 Months', durationMonths: 12, desc: 'VIP dual access pass for couples.' }
  ];

  const [selectedPlanObj, setSelectedPlanObj] = useState(plans[1] || plans[0]);
  const [includePt, setIncludePt] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay / PhonePe / Paytm)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [updatedMemberResult, setUpdatedMemberResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsProcessing(false);
      setIsSuccess(false);
      setUpdatedMemberResult(null);
      setSelectedPlanObj(plans[1] || plans[0]);
      setIncludePt(false);
    }
  }, [isOpen]);

  if (!isOpen || !member) return null;

  // Calculate Base & Total Prices
  const basePrice = selectedPlanObj.priceNum || parseInt(String(selectedPlanObj.price).replace(/\D/g, '')) || 3800;
  const ptFee = includePt ? 1000 : 0;
  const grandTotal = basePrice + ptFee;

  // Calculate New End Date
  const currentEndDate = new Date(member.endDate && member.endDate !== 'Invalid Date' ? member.endDate : '2026-12-31');
  const now = new Date();
  const startDate = currentEndDate > now ? currentEndDate : now;
  const newEndDateObj = new Date(startDate);
  newEndDateObj.setMonth(newEndDateObj.getMonth() + (selectedPlanObj.durationMonths || 3));
  const formattedNewEndDate = newEndDateObj.toISOString().split('T')[0];

  const handleConfirmRenewal = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const invoiceId = `INV-REN-${Math.floor(100000 + Math.random() * 900000)}`;

      const updatedUser = {
        ...member,
        status: 'Active',
        plan: selectedPlanObj.title,
        endDate: formattedNewEndDate,
        isPersonalTrainerAdded: includePt,
        lastRenewalDate: new Date().toISOString().split('T')[0]
      };

      const newTransaction = {
        id: invoiceId,
        invoiceId: invoiceId,
        memberName: member.name,
        memberId: member.id,
        phone: member.phone,
        planTitle: selectedPlanObj.title,
        amount: `₹${grandTotal.toLocaleString('en-IN')}`,
        amountNum: grandTotal,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        paymentMethod: paymentMethod,
        status: 'Paid',
        type: 'Membership Renewal / Extension'
      };

      setUpdatedMemberResult(updatedUser);
      setIsSuccess(true);

      if (onCompleteRenewal) {
        onCompleteRenewal(updatedUser, newTransaction);
      }
    }, 1200);
  };

  const handleCloseModal = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border-2 border-yellow-400 max-w-xl w-full p-6 md:p-8 rounded-3xl space-y-6 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-white">
        
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-lime-400 to-red-600" />

        {/* Close Button */}
        <button 
          onClick={handleCloseModal} 
          className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white transition border border-neutral-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400/20 border border-yellow-400/40 px-3 py-1 rounded-full text-yellow-400 text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> MEMBER PLAN RENEWAL & UPGRADE
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] uppercase">
                EXTEND OR UPGRADE <span className="text-yellow-400">YOUR MEMBERSHIP</span>
              </h3>
              <p className="text-xs text-[#b3b3b3]">
                Renew your plan or upgrade to lock in uninterrupted club access & 1-on-1 coaching.
              </p>
            </div>

            {/* Current Status Card */}
            <div className="bg-black p-4 rounded-2xl border border-neutral-800 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 font-bold">Member Name:</span>
                <strong className="text-white font-['Outfit']">{member.name} ({member.id})</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 font-bold">Current Active Plan:</span>
                <strong className="text-yellow-400">{member.plan || 'Quarterly Pass'}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 font-bold">Current Expiry Date:</span>
                <span className="bg-green-500/20 text-green-400 border border-green-500/40 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  {member.endDate || '2026-12-31'} (ACTIVE)
                </span>
              </div>
            </div>

            {/* Select Extension / Upgrade Plan */}
            <form onSubmit={handleConfirmRenewal} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-yellow-400 mb-2">
                  Select New Renewal Plan & Extension *
                </label>
                <div className="space-y-2 text-xs">
                  {plans.map((p) => {
                    const isSelected = selectedPlanObj.id === p.id;
                    const priceVal = p.priceNum || parseInt(String(p.price).replace(/\D/g, '')) || 0;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlanObj(p)}
                        className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                          isSelected 
                            ? 'bg-yellow-400/15 border-yellow-400 text-white shadow-md' 
                            : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-white">{p.title}</span>
                            <span className="bg-black/60 text-yellow-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-yellow-400/30">
                              {p.duration} Extension
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-0.5">{p.desc}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-black text-yellow-400 font-mono">
                            ₹{priceVal.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PT Add-on Toggle */}
              <div 
                onClick={() => setIncludePt(!includePt)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition cursor-pointer ${
                  includePt ? 'bg-lime-950/40 border-lime-400 text-lime-400' : 'bg-black border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={includePt} 
                    onChange={() => {}} 
                    className="w-4 h-4 accent-lime-400 cursor-pointer"
                  />
                  <div>
                    <p className="font-extrabold text-xs text-white">Add 1-on-1 Personal Trainer</p>
                    <p className="text-[10px] text-neutral-400">Personalized workout programming & diet guidance with Coach Ravi</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-lime-400">+₹1,000/mo</span>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
                  Payment Method
                </label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-3 text-xs text-white focus:border-yellow-400 focus:outline-none"
                >
                  <option value="UPI (Google Pay / PhonePe / Paytm)">UPI (Google Pay / PhonePe / Paytm QR)</option>
                  <option value="Credit / Debit Card">Credit / Debit Card Online Gateway</option>
                  <option value="Cash / POS at Desk">Cash / POS Counter at Gym Desk</option>
                </select>
              </div>

              {/* Order Summary & Math */}
              <div className="bg-black p-4 rounded-2xl border border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Selected Extension:</span>
                  <strong className="text-white">{selectedPlanObj.title} ({selectedPlanObj.duration})</strong>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Calculated New Expiry:</span>
                  <strong className="text-lime-400 font-mono">{formattedNewEndDate}</strong>
                </div>
                <div className="border-t border-neutral-800 pt-2 flex justify-between items-center">
                  <span className="font-extrabold text-white uppercase">Total Payable Amount:</span>
                  <strong className="text-2xl font-black text-yellow-400 font-mono">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              {/* Confirm Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-black" />
                    <span>Processing Payment & Renewal...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-black" />
                    <span>Confirm Renewal & Pay ₹{grandTotal.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

            </form>
          </>
        ) : (
          /* Confirmation & Receipt Screen */
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-block bg-yellow-400 text-black font-black text-[10px] uppercase px-3 py-1 rounded-md mb-2">
                RENEWAL SUCCESSFUL
              </div>
              <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">
                MEMBERSHIP EXTENDED!
              </h3>
              <p className="text-xs text-[#b3b3b3] mt-1">
                Your plan extension is confirmed and valid until <strong className="text-lime-400 font-mono">{updatedMemberResult.endDate}</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-black p-4 rounded-2xl border border-neutral-800 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 font-bold">Member:</span>
                <strong className="text-white">{updatedMemberResult.name} ({updatedMemberResult.id})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">Active Plan:</span>
                <strong className="text-yellow-400">{updatedMemberResult.plan}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">New Expiration Date:</span>
                <strong className="text-lime-400 font-mono">{updatedMemberResult.endDate}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">Payment Method:</span>
                <strong className="text-white">{paymentMethod}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {onViewReceipt && (
                <button
                  onClick={() => {
                    handleCloseModal();
                    onViewReceipt(updatedMemberResult);
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase py-3.5 rounded-xl transition cursor-pointer"
                >
                  View Digital Tax Receipt
                </button>
              )}
              <button
                onClick={handleCloseModal}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase py-3.5 rounded-xl border border-neutral-700 transition cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
