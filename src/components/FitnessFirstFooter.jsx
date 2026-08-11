import React from 'react';
import { Dumbbell, Phone, MapPin, MessageSquare, Youtube, Instagram, Facebook, ShieldCheck, ArrowUp, ExternalLink, Clock, Lock } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function FitnessFirstFooter({ setCurrentView, setActiveRole, onOpenTrialModal }) {
  
  const handleNavClick = (viewName) => {
    setActiveRole('visitor');
    setCurrentView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#121212] via-[#0d0d0d] to-[#050505] text-white border-t-2 border-red-600 pt-16 pb-8 relative overflow-hidden">
      
      {/* Red Background Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30">
                <Dumbbell className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="bg-red-600 text-white px-2 py-0.5 rounded font-black text-lg tracking-tight font-['Outfit']">
                    ENERGIE
                  </span>
                  <span className="text-yellow-400 font-black text-xl font-['Outfit'] tracking-tight">
                    FITNESS
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mt-0.5">
                  BULANDSHAHR CLUB
                </span>
              </div>
            </div>

            <p className="text-[#b3b3b3] text-xs leading-relaxed max-w-sm font-medium">
              Bulandshahr's #1 high-tech fitness center featuring pin-loaded strength machines, functional CrossFit arena, and 1-on-1 personal coaching with Coach Ravi.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>{GYM_DETAILS.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{GYM_DETAILS.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#b3b3b3]">
                <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Mon - Sat: 05:30 AM - 09:30 PM</span>
              </div>
            </div>
          </div>

          {/* Col 3: SERVICES */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-400 font-['Outfit']">
              SERVICES
            </h4>
            <ul className="space-y-2 text-xs text-[#b3b3b3] font-bold">
              <li><button onClick={() => handleNavClick('train-with-us')} className="hover:text-yellow-400 transition">Strength & Rigs</button></li>
              <li><button onClick={() => handleNavClick('train-with-us')} className="hover:text-yellow-400 transition">CrossFit Arena & Cage</button></li>
              <li><button onClick={() => handleNavClick('train-with-us')} className="hover:text-yellow-400 transition">Personal Training</button></li>
              <li><button onClick={() => handleNavClick('train-with-us')} className="hover:text-yellow-400 transition">Cardio Fat Burn Zone</button></li>
              <li><button onClick={() => handleNavClick('train-with-us')} className="hover:text-yellow-400 transition">Couple Fitness Special</button></li>
              <li><button onClick={() => handleNavClick('train-with-us')} className="hover:text-yellow-400 transition">Class Timetable</button></li>
            </ul>
          </div>

          {/* Col 4: MEMBERSHIP */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-400 font-['Outfit']">
              MEMBERSHIP
            </h4>
            <ul className="space-y-2 text-xs text-[#b3b3b3] font-bold">
              <li><button onClick={() => handleNavClick('membership')} className="hover:text-yellow-400 transition">Membership Packages</button></li>
              <li><button onClick={() => handleNavClick('membership')} className="hover:text-yellow-400 transition">Couple Pass Deals</button></li>
              <li><button onClick={() => handleNavClick('try-us')} className="hover:text-yellow-400 transition">Claim 1-Day Free Pass</button></li>
              <li><button onClick={() => handleNavClick('club-finder')} className="hover:text-yellow-400 transition">Bulandshahr Club Finder</button></li>
              <li><button onClick={() => handleNavClick('membership')} className="hover:text-yellow-400 transition">Membership Matrix</button></li>
              <li><button onClick={() => handleNavClick('membership')} className="hover:text-yellow-400 transition">Membership FAQs</button></li>
            </ul>
          </div>

          {/* Col 5: POLICIES & LEGAL */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-400 font-['Outfit']">
              POLICIES & LEGAL
            </h4>
            <ul className="space-y-2 text-xs text-[#b3b3b3] font-bold">
              <li><button onClick={() => handleNavClick('policies')} className="hover:text-yellow-400 transition">Gym Floor Rules</button></li>
              <li><button onClick={() => handleNavClick('policies')} className="hover:text-yellow-400 transition">Terms of Service</button></li>
              <li><button onClick={() => handleNavClick('policies')} className="hover:text-yellow-400 transition">Privacy Policy</button></li>
              <li><button onClick={() => handleNavClick('policies')} className="hover:text-yellow-400 transition">Refund & Freeze Policy</button></li>
              <li><button onClick={() => handleNavClick('about')} className="hover:text-yellow-400 transition">About Coach Ravi</button></li>
            </ul>
          </div>

          {/* Col 6: CONTACT & SOCIAL HANDLES */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-400 font-['Outfit']">
              CONTACT & SOCIALS
            </h4>
            <p className="text-[#b3b3b3] text-xs font-medium">
              Follow our official handles for daily workout routines and transformation updates.
            </p>

            <div className="flex flex-col gap-2">
              <a 
                href={GYM_DETAILS.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/40 p-2.5 rounded-xl text-xs font-black transition flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Youtube className="w-4 h-4 fill-red-500 text-black" /> YouTube Channel (@energiefitness1060)
                </span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a 
                href={`https://wa.me/${GYM_DETAILS.whatsapp}?text=Hi%20Coach%20Ravi,%20I%20want%20to%20connect`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400/10 hover:bg-yellow-400 text-yellow-400 hover:text-black border border-yellow-400/30 p-2.5 rounded-xl text-xs font-black transition flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-yellow-400" /> Official WhatsApp
                </span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a 
                href={GYM_DETAILS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600/10 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 p-2.5 rounded-xl text-xs font-black transition flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-purple-400" /> Instagram (@energie_fitnessbsr)
                </span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#b3b3b3]">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">Energie Fitness Bulandshahr</strong>. All rights reserved. Built by <a href="https://dhruvii.dev" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline font-black">Dhruvii</a>.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => { setActiveRole('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-neutral-500 hover:text-yellow-400 text-[11px] flex items-center gap-1 transition font-mono bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800"
              title="Coach Ravi Desk (Ctrl+Shift+A or ?admin=true)"
            >
              <Lock className="w-3 h-3 text-red-500" /> Staff Desk Access
            </button>

            <button
              onClick={scrollToTop}
              className="bg-neutral-900 hover:bg-red-600 text-white border border-neutral-800 p-2.5 rounded-xl flex items-center gap-2 text-xs font-black uppercase transition"
            >
              Back to Top <ArrowUp className="w-4 h-4 text-yellow-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
