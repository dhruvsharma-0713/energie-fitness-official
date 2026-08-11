import React, { useState } from 'react';
import { ShieldCheck, FileText, AlertTriangle, RefreshCcw, X, CheckCircle2 } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function PoliciesModal({ isOpen, onClose, policies }) {
  const [activeTab, setActiveTab] = useState('rules');
  const gymPolicies = policies || GYM_DETAILS.gymPolicies;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="bg-[#121212] border-2 border-red-600/60 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in relative text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-neutral-900 to-yellow-950/40 px-6 py-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-yellow-400">
            <ShieldCheck className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="text-xl font-black font-['Outfit'] uppercase text-white">
                ENERGIE FITNESS POLICIES & RULES
              </h3>
              <p className="text-[11px] text-neutral-400">Official Club Decorum & Operating Guidelines</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-neutral-900 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="bg-[#0a0a0a] px-6 py-3 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto text-xs font-black uppercase">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'rules' ? 'bg-yellow-400 text-black shadow-md' : 'text-neutral-400 hover:text-white'}`}
          >
            Floor Rules
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'terms' ? 'bg-yellow-400 text-black shadow-md' : 'text-neutral-400 hover:text-white'}`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'privacy' ? 'bg-yellow-400 text-black shadow-md' : 'text-neutral-400 hover:text-white'}`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('refund')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'refund' ? 'bg-yellow-400 text-black shadow-md' : 'text-neutral-400 hover:text-white'}`}
          >
            Refund & Freeze
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
          
          {activeTab === 'rules' && (
            <div className="space-y-3">
              <h4 className="text-xs font-black text-yellow-400 uppercase flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Mandatory Gym Floor Rules
              </h4>
              <div className="space-y-2">
                {gymPolicies.rules?.map((rule, idx) => (
                  <div key={idx} className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h4 className="text-xs font-black text-yellow-400 uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-500" /> Club Terms & Conditions
              </h4>
              <div className="space-y-2">
                {gymPolicies.terms?.map((term, idx) => (
                  <div key={idx} className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span>{term}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h4 className="text-xs font-black text-yellow-400 uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-500" /> Member Data Protection & Security
              </h4>
              <div className="space-y-2">
                {gymPolicies.privacy?.map((p, idx) => (
                  <div key={idx} className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-3">
              <h4 className="text-xs font-black text-yellow-400 uppercase flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 text-red-500" /> Membership Freeze & Refund Terms
              </h4>
              <div className="space-y-2">
                {gymPolicies.refund?.map((ref, idx) => (
                  <div key={idx} className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span>{ref}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#0a0a0a] px-6 py-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-6 py-2.5 rounded-xl transition"
          >
            I Agree & Understand
          </button>
        </div>

      </div>
    </div>
  );
}
