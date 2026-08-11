import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, QrCode, Lock, ArrowRight, Loader2, Copy, Building2 } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function CheckoutModal({ isOpen, onClose, selectedPlan, onCompletePayment }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'UPI (Google Pay / PhonePe)',
    isCouple: false,
    partnerName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  if (!isOpen || !selectedPlan) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newId = `EF-${Math.floor(1005 + Math.random() * 9000)}`;
      const todayStr = new Date().toISOString().split('T')[0];
      
      const newMember = {
        id: newId,
        name: formData.isCouple && formData.partnerName ? `${formData.name} & ${formData.partnerName}` : formData.name,
        phone: formData.phone,
        email: formData.email || `${formData.name.toLowerCase().replace(' ', '.')}@example.com`,
        plan: selectedPlan.name,
        planType: selectedPlan.id,
        startDate: todayStr,
        endDate: '2026-11-15',
        status: 'Active',
        paymentStatus: 'Paid',
        amountPaid: selectedPlan.finalPrice || selectedPlan.price,
        paymentMethod: formData.paymentMethod,
        qrCode: `${newId}-${formData.name.split(' ')[0].toUpperCase()}`,
        streak: 1,
        totalCheckIns: 1,
        goal: 'General Fitness & Strength',
        isCouple: formData.isCouple,
        partnerName: formData.partnerName || null,
        workoutRoutine: [
          { day: "Mon - Sat", muscle: "Full Gym Routine", exercises: "Treadmill 15m, Dumbbell Press 4x12, Squats 4x15" }
        ]
      };

      onCompletePayment(newMember);
      setPaymentSuccess(newMember);
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card max-w-xl w-full p-6 relative border-lime-400/40 space-y-6 max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={() => { setPaymentSuccess(null); onClose(); }} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!paymentSuccess ? (
          <form onSubmit={handlePay} className="space-y-5">
            <div className="text-center space-y-1">
              <span className="badge badge-lime text-[10px]">Instant Pass Checkout</span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">
                BUY MEMBERSHIP PASS
              </h3>
              <p className="text-xs text-[#ccff00] font-bold">{selectedPlan.name} • ₹{(selectedPlan.finalPrice || selectedPlan.price).toLocaleString('en-IN')}</p>
            </div>

            <div className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Rahul Sharma" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Phone Number (WhatsApp)</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+91 98765 43210" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                />
              </div>

              {selectedPlan.isCouple && (
                <div>
                  <label className="block text-rose-300 font-bold mb-1">Partner Full Name (Couple Plan)</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Neha Sharma" 
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value, isCouple: true })}
                    className="input-field border-rose-500/40"
                  />
                </div>
              )}

              {/* PAYMENT RECEIVING PLACEHOLDERS (RAVI DESK) */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <p className="font-bold text-white uppercase text-[11px] flex items-center justify-between">
                  <span>Ravi's Payment Gateway & Desk Details</span>
                  <span className="text-[#ccff00]">UPI & Cash Accepted</span>
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <p className="text-slate-400">Gym UPI ID (Desk)</p>
                    <p className="font-mono font-bold text-[#ccff00]">energie.fitness@upi</p>
                    <p className="text-[10px] text-slate-500">or 8384855909@paytm</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <p className="text-slate-400">Gym Desk Cash</p>
                    <p className="font-bold text-white">Pay at Counter</p>
                    <p className="text-[10px] text-slate-500">Shikarpur Bypass Desk</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[10px] text-slate-400 flex items-center justify-between">
                  <span><strong>Bank Transfer Placeholder:</strong> State Bank of India • A/C: 398401029384 • IFSC: SBIN0001234</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Select Payment Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {['UPI (Google Pay / PhonePe)', 'Paytm / BHIM UPI', 'Cash at Gym Counter', 'Credit / Debit Card'].map((mode) => (
                    <button 
                      key={mode}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: mode })}
                      className={`p-3 rounded-xl border text-left font-semibold transition ${
                        formData.paymentMethod === mode 
                          ? 'border-[#ccff00] bg-[#ccff00]/10 text-white' 
                          : 'border-white/10 bg-white/5 text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full btn-primary py-3.5 text-center justify-center font-bold text-sm uppercase tracking-wider"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing Payment...
                </span>
              ) : (
                <span>Confirm Payment & Activate Pass (₹{(selectedPlan.finalPrice || selectedPlan.price).toLocaleString('en-IN')})</span>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="badge badge-lime text-[10px]">Payment Recorded!</span>
              <h3 className="text-xl font-black text-white font-['Outfit'] mt-1">
                MEMBERSHIP ACTIVATED
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Member ID: {paymentSuccess.id}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 space-y-2 text-left">
              <p><strong>Member:</strong> {paymentSuccess.name}</p>
              <p><strong>Plan:</strong> {paymentSuccess.plan}</p>
              <p><strong>Amount Paid:</strong> ₹{paymentSuccess.amountPaid}</p>
              <p className="text-[#ccff00]">Digital QR Pass generated in Member Portal!</p>
            </div>

            <button 
              onClick={() => { setPaymentSuccess(null); onClose(); }} 
              className="w-full btn-primary py-3 text-center justify-center"
            >
              Access My Member Portal & QR Pass
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
