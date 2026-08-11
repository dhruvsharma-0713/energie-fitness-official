import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck, Dumbbell, MapPin, Phone } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function ReceiptModal({ isOpen, onClose, member }) {
  if (!isOpen || !member) return null;

  const invoiceNo = `INV-EF-${member.id.replace('EF-', '')}-2026`;
  const subtotal = Math.round(member.amountPaid / 1.18);
  const gstAmount = member.amountPaid - subtotal;

  return (
    <div className="modal-overlay">
      <div className="glass-card max-w-xl w-full p-6 relative border-lime-400/40 space-y-6">
        
        {/* Top Header Buttons */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="badge badge-lime text-[10px]">Official Digital GST Invoice</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()} 
              className="btn-secondary text-xs py-1.5 px-3 border-lime-400/40 text-[#ccff00]"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE RECEIPT CONTENT CONTAINER */}
        <div className="printable-receipt space-y-6 text-left bg-slate-950 p-6 rounded-2xl border border-white/10">
          
          {/* Gym Details Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-white font-['Outfit']">ENERGIE</span>
                <span className="text-[#ccff00] font-black text-xl font-['Outfit']">FITNESS</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{GYM_DETAILS.address}, Bulandshahr, UP 203001</p>
              <p className="text-xs text-slate-400">Phone: {GYM_DETAILS.phone} • Founder: {GYM_DETAILS.founder}</p>
            </div>
            <div className="text-right font-mono text-xs text-slate-400 space-y-1">
              <p className="font-bold text-white text-sm">{invoiceNo}</p>
              <p>Date: {member.startDate}</p>
              <span className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] uppercase font-bold">PAID</span>
            </div>
          </div>

          {/* Member Details */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-white/5 p-4 rounded-xl">
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-wider">Billed To Member</p>
              <p className="text-base font-extrabold text-white mt-0.5">{member.name}</p>
              <p className="text-slate-300 font-mono">Member ID: {member.id}</p>
              <p className="text-slate-300 font-mono">Phone: {member.phone}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 font-bold uppercase tracking-wider">Subscription Validity</p>
              <p className="font-bold text-white mt-0.5">{member.startDate} to {member.endDate}</p>
              <p className="text-slate-300">Goal: {member.goal}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full text-xs text-left">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-bold">
              <tr>
                <th className="py-2">Item Description</th>
                <th className="py-2 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium text-slate-200">
              <tr>
                <td className="py-3">
                  <p className="font-bold text-white">{member.plan}</p>
                  <p className="text-[11px] text-slate-400">Gym Access, CrossFit Cage, General Coaching & Digital QR Pass</p>
                </td>
                <td className="py-3 text-right font-mono font-bold">₹{subtotal.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td className="py-2 text-slate-400">GST Breakdown (9% CGST + 9% SGST)</td>
                <td className="py-2 text-right font-mono text-slate-400">₹{gstAmount.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
            <tfoot className="border-t border-white/10 text-sm font-bold">
              <tr>
                <td className="pt-3 text-white">Grand Total Paid ({member.paymentMethod})</td>
                <td className="pt-3 text-right font-mono text-[#ccff00] text-lg">₹{member.amountPaid.toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>

          {/* Footer Note */}
          <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#ccff00]" /> Thank you for training at Energie Fitness!
            </span>
            <span className="font-mono">Authorized by Ravi (Desk)</span>
          </div>

        </div>

      </div>
    </div>
  );
}
