import React, { useState } from 'react';
import { ShieldCheck, FileText, Lock, AlertCircle, RefreshCw } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function PoliciesView() {
  const [activeTab, setActiveTab] = useState('rules');

  const policyTabs = [
    { id: 'rules', label: 'Gym Floor Rules', icon: ShieldCheck },
    { id: 'terms', label: 'Membership Terms', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: Lock },
    { id: 'refund', label: 'Refund & Freeze Policy', icon: RefreshCw }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-6 pb-20">
      
      {/* Header */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-b border-neutral-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-neutral-800 border border-neutral-700 px-4 py-1.5 rounded-full text-neutral-300 text-xs font-black uppercase tracking-widest mb-4">
            <ShieldCheck className="w-4 h-4 text-lime-400" /> Legal & Governance
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-['Outfit']">
            POLICIES & <span className="text-lime-400">CLUB RULES</span>
          </h1>

          <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto mt-3">
            Guidelines and policies ensuring safety, hygiene, and transparency at Energie Fitness Bulandshahr.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {policyTabs.map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                <IconComp className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-10 shadow-2xl space-y-6">
          {activeTab === 'rules' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white font-['Outfit'] uppercase flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-lime-400" /> Code of Conduct & Gym Floor Rules
              </h2>
              <ul className="space-y-4">
                {GYM_DETAILS.gymPolicies.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-neutral-300 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <span className="w-6 h-6 rounded-full bg-lime-400/10 text-lime-400 font-bold flex items-center justify-center flex-shrink-0 text-xs border border-lime-400/30">
                      {idx + 1}
                    </span>
                    <span className="mt-0.5">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white font-['Outfit'] uppercase flex items-center gap-2">
                <FileText className="w-6 h-6 text-lime-400" /> Terms of Membership Service
              </h2>
              <ul className="space-y-4">
                {GYM_DETAILS.gymPolicies.terms.map((term, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-neutral-300 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <AlertCircle className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white font-['Outfit'] uppercase flex items-center gap-2">
                <Lock className="w-6 h-6 text-lime-400" /> Privacy & Data Security
              </h2>
              <ul className="space-y-4">
                {GYM_DETAILS.gymPolicies.privacy.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-neutral-300 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <Lock className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white font-['Outfit'] uppercase flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-lime-400" /> Cancellation, Freeze & Refund Policy
              </h2>
              <ul className="space-y-4">
                {GYM_DETAILS.gymPolicies.refund.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-neutral-300 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <RefreshCw className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
