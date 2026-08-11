import React, { useState, useEffect, useRef } from 'react';
import { Dumbbell, Menu, X, UserCheck, LogOut, ChevronDown, MapPin, Phone, MessageSquare, Ticket, Sparkles, Clock, LogIn, ShieldAlert, FileText, MoreVertical, Info, Compass, ShieldCheck } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function Navbar({ 
  activeRole, 
  setActiveRole, 
  currentView, 
  setCurrentView, 
  onOpenTrialModal, 
  onOpenAuthModal,
  onOpenPoliciesModal,
  currentUser,
  onUserLogout,
  onLogoutAdmin,
  isAdminUnlocked 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const moreMenuRef = useRef(null);

  const isAuthenticatedMember = Boolean(currentUser) || activeRole === 'member';

  useEffect(() => {
    // Secret keyboard shortcut Ctrl + Shift + R for Root User Entry Point
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'R' || e.key === 'r')) {
        e.preventDefault();
        setCurrentView('root-portal');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCurrentView]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (viewName) => {
    if (activeRole === 'admin') setActiveRole('visitor');
    
    // Gateway security: If authenticated member clicks try-us, redirect to member portal
    if (isAuthenticatedMember && viewName === 'try-us') {
      setActiveRole('member');
      setMoreMenuOpen(false);
      setMobileMenuOpen(false);
      return;
    }

    setCurrentView(viewName);
    setMoreMenuOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d0d0d]/95 backdrop-blur-md border-b-2 border-red-600 shadow-2xl">
      
      {/* Top Mini Contact Bar */}
      <div className="hidden lg:block bg-[#050505] border-b border-neutral-900 py-1.5 px-4 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-yellow-400" />
              {GYM_DETAILS.fullAddress}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              Mon - Sat: 05:30 AM - 09:30 PM | Sun: 06:00 AM - 09:00 AM
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${GYM_DETAILS.phone.replace(/ /g, '')}`} 
              className="flex items-center gap-1 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5 text-yellow-400" /> {GYM_DETAILS.phone}
            </a>
            <a 
              href={`https://wa.me/${GYM_DETAILS.whatsapp}?text=Hi%20Coach%20Ravi,%20I%20have%20an%20inquiry`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-red-500 hover:text-red-400 font-bold transition"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Desk
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo with Shrink Protection */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0" 
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 transform group-hover:scale-105 transition duration-300">
              <Dumbbell className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="bg-red-600 text-white px-2 py-0.5 rounded font-black text-lg md:text-xl tracking-tight font-['Outfit']">
                  ENERGIE
                </span>
                <span className="text-yellow-400 font-black text-xl md:text-2xl font-['Outfit'] tracking-tight">
                  FITNESS
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mt-0.5">
                BULANDSHAHR CLUB
              </span>
            </div>
          </div>

          {/* Primary Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-black uppercase tracking-wider text-white">
            <button 
              onClick={() => handleNavClick('home')}
              className={`hover:text-yellow-400 transition py-1 ${currentView === 'home' && activeRole === 'visitor' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
            >
              Home
            </button>

            <button 
              onClick={() => handleNavClick('train-with-us')}
              className={`hover:text-yellow-400 transition py-1 ${currentView === 'train-with-us' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
            >
              Services
            </button>

            <button 
              onClick={() => handleNavClick('membership')}
              className={`hover:text-yellow-400 transition py-1 ${currentView === 'membership' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
            >
              Memberships & Offers
            </button>
          </nav>

          {/* Desktop Right Actions Container */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            
            {/* CTA 1: Try Free Pass (EXCLUSIVELY for unauthenticated visitors) */}
            {!isAuthenticatedMember && (
              <button 
                onClick={() => handleNavClick('try-us')} 
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-yellow-400/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 shrink-0"
              >
                <Ticket className="w-4 h-4" /> TRY FREE PASS
              </button>
            )}

            {/* CTA 2: Signup / Login / Admin Status */}
            {activeRole === 'admin' && isAdminUnlocked ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setActiveRole('visitor'); setCurrentView('home'); }} 
                  className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 text-xs px-3 py-2.5 rounded-xl transition"
                >
                  Back to Web
                </button>
                <button 
                  onClick={onLogoutAdmin} 
                  className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 text-xs font-bold px-3 py-2.5 rounded-xl transition flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" /> Lock Desk
                </button>
              </div>
            ) : currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="bg-neutral-900 hover:bg-neutral-800 border border-yellow-400/50 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center font-black text-xs font-['Outfit']">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span>{currentUser.name.split(' ')[0]}</span>
                  {currentUser.subRole === 'Staff / Trainer' && (
                    <span className="bg-red-600 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded">STAFF</span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-yellow-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-[#121212] border border-neutral-800 rounded-2xl shadow-2xl p-2 space-y-1 z-50 text-xs">
                    <button
                      onClick={() => {
                        setActiveRole('member');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-neutral-900 text-yellow-400 font-extrabold flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" /> View My Digital Pass
                    </button>
                    <button
                      onClick={() => {
                        onUserLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-950/40 text-red-400 font-bold flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onOpenAuthModal} 
                className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
              >
                <LogIn className="w-4 h-4 text-yellow-400" /> Signup / Login
              </button>
            )}

            {/* SECONDARY NAVIGATION: Sleek Three-Dots Dropdown Menu (⋮) */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                  moreMenuOpen 
                    ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/20' 
                    : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white'
                }`}
                aria-label="More Navigation Options"
                title="Secondary Navigation Menu"
              >
                <MoreVertical className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Three-Dots Dark Dropdown Popup */}
              {moreMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 bg-[#121212] border-2 border-red-600/60 rounded-2xl shadow-2xl p-2.5 space-y-1 z-50 text-xs animate-fade-in backdrop-blur-xl">
                  <div className="px-3 py-1.5 border-b border-neutral-800 text-[10px] font-black uppercase text-yellow-400 tracking-wider">
                    Explore Sections
                  </div>

                  {/* Secondary Item 1: Try Us (ONLY for unauthenticated visitors) */}
                  {!isAuthenticatedMember && (
                    <button
                      onClick={() => handleNavClick('try-us')}
                      className={`w-full text-left px-3 py-2.5 rounded-xl font-bold flex items-center gap-2.5 transition ${
                        currentView === 'try-us' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40' : 'hover:bg-neutral-900 text-neutral-200 hover:text-white'
                      }`}
                    >
                      <Ticket className="w-4 h-4 text-yellow-400" />
                      <span>Try Us (Free Pass)</span>
                    </button>
                  )}

                  {/* Secondary Item 2: Club Finder */}
                  <button
                    onClick={() => handleNavClick('club-finder')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl font-bold flex items-center gap-2.5 transition ${
                      currentView === 'club-finder' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40' : 'hover:bg-neutral-900 text-neutral-200 hover:text-white'
                    }`}
                  >
                    <Compass className="w-4 h-4 text-red-500" />
                    <span>Club Finder (Bulandshahr)</span>
                  </button>

                  {/* Secondary Item 3: About Us */}
                  <button
                    onClick={() => handleNavClick('about')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl font-bold flex items-center gap-2.5 transition ${
                      currentView === 'about' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40' : 'hover:bg-neutral-900 text-neutral-200 hover:text-white'
                    }`}
                  >
                    <Info className="w-4 h-4 text-yellow-400" />
                    <span>About Us</span>
                  </button>

                  {/* Secondary Item 4: Policies & Rules Modal */}
                  <button
                    onClick={() => {
                      setMoreMenuOpen(false);
                      onOpenPoliciesModal();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl font-bold flex items-center gap-2.5 hover:bg-neutral-900 text-neutral-200 hover:text-white transition"
                  >
                    <FileText className="w-4 h-4 text-red-500" />
                    <span>Policies & Rules</span>
                  </button>

                </div>
              )}
            </div>

          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            {!isAuthenticatedMember && (
              <button 
                onClick={() => handleNavClick('try-us')}
                className="bg-yellow-400 text-black font-black text-[11px] uppercase px-3.5 py-2 rounded-lg shadow-md"
              >
                Free Pass
              </button>
            )}

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0d0d] border-b-2 border-red-600 px-4 py-6 space-y-4 text-xs font-black uppercase tracking-wider">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left text-white hover:text-yellow-400 py-1">Home</button>
          <button onClick={() => handleNavClick('train-with-us')} className="block w-full text-left text-white hover:text-yellow-400 py-1">Services</button>
          <button onClick={() => handleNavClick('membership')} className="block w-full text-left text-white hover:text-yellow-400 py-1">Memberships & Offers</button>
          {!isAuthenticatedMember && (
            <button onClick={() => handleNavClick('try-us')} className="block w-full text-left text-white hover:text-yellow-400 py-1">Try Us (Free Pass)</button>
          )}
          <button onClick={() => handleNavClick('club-finder')} className="block w-full text-left text-white hover:text-yellow-400 py-1">Club Finder (Bulandshahr)</button>
          <button onClick={() => handleNavClick('about')} className="block w-full text-left text-white hover:text-yellow-400 py-1">About Us</button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenPoliciesModal(); }} className="block w-full text-left text-yellow-400 py-1 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-red-500" /> Policies & Rules
          </button>
          
          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
            {!isAuthenticatedMember && (
              <button onClick={() => handleNavClick('try-us')} className="w-full bg-yellow-400 text-black font-black py-3 rounded-xl text-center justify-center flex items-center gap-2">
                <Ticket className="w-4 h-4" /> TRY FREE PASS
              </button>
            )}
            
            {currentUser ? (
              <button 
                onClick={() => { setActiveRole('member'); setMobileMenuOpen(false); }} 
                className="w-full bg-neutral-900 text-yellow-400 border border-yellow-400/40 py-3 rounded-xl text-center justify-center flex items-center gap-2 font-black"
              >
                <UserCheck className="w-4 h-4" /> My Digital Pass ({currentUser.name.split(' ')[0]})
              </button>
            ) : (
              <button 
                onClick={() => { onOpenAuthModal(); setMobileMenuOpen(false); }} 
                className="w-full bg-neutral-900 text-white border border-neutral-700 py-3 rounded-xl text-center justify-center flex items-center gap-2"
              >
                <LogIn className="w-4 h-4 text-yellow-400" /> Signup / Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
