import React, { useState, useEffect } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, QrCode, Lock, ArrowRight, Loader2, User, Phone, Mail, FileText, Gift, Sparkles, AlertCircle, Check, KeyRound, UserPlus } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  selectedPlan, 
  plan, 
  onCompletePayment, 
  existingMembers = [], 
  currentUser = null,
  onAuthSuccess,
  onViewReceipt 
}) {
  const activePlan = selectedPlan || plan;

  // Flow Steps: 'phone-check' | 'login-password' | 'signup' | 'checkout' | 'success'
  const [step, setStep] = useState('phone-check');

  // Step 1 & Auth State
  const [phoneInput, setPhoneInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [matchedMember, setMatchedMember] = useState(null);
  const [activeUser, setActiveUser] = useState(currentUser);
  const [stepError, setStepError] = useState('');

  // Step 2B Signup State
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    emergencyContact: ''
  });

  // Step 3 Checkout Payment State
  const [partnerName, setPartnerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay / PhonePe / Paytm)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchasedMember, setPurchasedMember] = useState(null);

  // Initialize or reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStepError('');
      setPurchasedMember(null);
      setIsProcessing(false);
      
      if (currentUser) {
        setActiveUser(currentUser);
        setStep('checkout');
      } else {
        setStep('phone-check');
        setPhoneInput('');
        setPasswordInput('');
        setMatchedMember(null);
        setActiveUser(null);
      }
    }
  }, [isOpen, currentUser]);

  if (!isOpen || !activePlan) return null;

  // Calculate pricing breakdown
  const durationMonths = activePlan.durationMonths || 1;
  const basePrice = activePlan.price || activePlan.finalPrice || 1500;
  const ptAddonCost = activePlan.includePT ? 1000 * durationMonths : 0;
  const totalPayable = activePlan.includePT ? basePrice + ptAddonCost : (activePlan.finalPrice || basePrice);

  const cleanPhone = phoneInput.replace(/\D/g, '');

  // Handle Step 1: Phone Verification Check
  const handlePhoneCheckSubmit = (e) => {
    e.preventDefault();
    setStepError('');

    if (!cleanPhone || cleanPhone.length !== 10) {
      setStepError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const found = existingMembers.find(
      m => m.phone.replace(/\D/g, '').endsWith(cleanPhone) || m.id.toLowerCase() === cleanPhone.toLowerCase()
    );

    if (found) {
      setMatchedMember(found);
      setStep('login-password');
    } else {
      setSignupData(prev => ({ ...prev, email: `${cleanPhone}@energie.dev` }));
      setStep('signup');
    }
  };

  // Handle Step 2A: Password Login Verification
  const handlePasswordLoginSubmit = (e) => {
    e.preventDefault();
    setStepError('');

    if (!passwordInput || passwordInput.length < 4) {
      setStepError('Please enter your account password (min 4 characters).');
      return;
    }

    if (matchedMember) {
      if (matchedMember.password && matchedMember.password !== passwordInput) {
        setStepError('Incorrect password. Please verify your credentials.');
        return;
      }

      setActiveUser(matchedMember);
      if (onAuthSuccess) {
        onAuthSuccess(matchedMember, false);
      }
      setStep('checkout');
    }
  };

  // Handle Step 2B: New Member Registration
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setStepError('');

    if (!signupData.name || signupData.name.trim().length < 2) {
      setStepError('Full name must be at least 2 characters long.');
      return;
    }

    if (!signupData.email || !signupData.email.includes('@')) {
      setStepError('Please enter a valid email address.');
      return;
    }

    if (!signupData.password || signupData.password.length < 4) {
      setStepError('Password must be at least 4 characters long.');
      return;
    }

    if (!signupData.emergencyContact || signupData.emergencyContact.replace(/\D/g, '').length < 10) {
      setStepError('Please enter a valid 10-digit emergency contact phone number.');
      return;
    }

    const newMemberProfile = {
      id: `EF-${Math.floor(1005 + Math.random() * 9000)}`,
      name: signupData.name.trim(),
      phone: `+91 ${cleanPhone}`,
      email: signupData.email.trim(),
      password: signupData.password,
      emergencyContact: signupData.emergencyContact.trim(),
      status: 'Active',
      paymentStatus: 'Pending',
      streak: 1,
      totalCheckIns: 1,
      goal: 'General Fitness & Muscle Transformation'
    };

    setActiveUser(newMemberProfile);
    if (onAuthSuccess) {
      onAuthSuccess(newMemberProfile, true);
    }
    setStep('checkout');
  };

  // Handle Step 3: Complete Purchase & Payment Confirmation
  const handleFinalPaymentSubmit = (e) => {
    e.preventDefault();
    setStepError('');

    if (activePlan.isCouple && (!partnerName || partnerName.trim().length < 2)) {
      setStepError('Please enter partner full name for the Couple Plan.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const todayStr = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + durationMonths * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const userName = activeUser?.name || signupData.name || 'Member';
      const userPhone = activeUser?.phone || `+91 ${cleanPhone}`;
      const userEmail = activeUser?.email || signupData.email || 'member@energiefitness.dev';
      const userId = activeUser?.id || `EF-${Math.floor(1005 + Math.random() * 9000)}`;

      const completedMember = {
        id: userId,
        name: activePlan.isCouple && partnerName ? `${userName} & ${partnerName.trim()}` : userName,
        phone: userPhone,
        email: userEmail,
        plan: activePlan.name,
        planType: activePlan.id,
        startDate: todayStr,
        endDate: endDate,
        status: 'Active',
        paymentStatus: 'Paid',
        amountPaid: totalPayable,
        paymentMethod: paymentMethod,
        qrCode: `${userId}-${userName.split(' ')[0].toUpperCase()}`,
        streak: 1,
        totalCheckIns: 1,
        goal: 'General Fitness & Strength',
        isCouple: Boolean(activePlan.isCouple),
        partnerName: partnerName ? partnerName.trim() : null,
        includePT: Boolean(activePlan.includePT),
        workoutRoutine: [
          { day: "Mon - Sat", muscle: "Full Gym Routine", exercises: "Treadmill 15m, Dumbbell Press 4x12, Squats 4x15, Lat Pulldowns 3x12" }
        ]
      };

      if (onCompletePayment) {
        onCompletePayment(completedMember);
      }

      setPurchasedMember(completedMember);
      setStep('success');
    }, 1400);
  };

  const handleCloseModal = () => {
    setStep('phone-check');
    setStepError('');
    setPurchasedMember(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border-2 border-yellow-400/60 max-w-xl w-full p-6 md:p-8 rounded-3xl space-y-6 relative shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto text-white">
        
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-lime-400" />

        {/* Close Button */}
        <button 
          onClick={handleCloseModal} 
          className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white transition border border-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Error Alert Banner */}
        {stepError && (
          <div className="p-3 bg-red-600/20 border border-red-600/60 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{stepError}</span>
          </div>
        )}

        {/* STEP 1: PHONE VERIFICATION CHECK */}
        {step === 'phone-check' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 text-[10px] font-black uppercase px-3 py-1 rounded-full font-mono">
                STEP 1 OF 3: PHONE VERIFICATION
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">
                ENTER MOBILE NUMBER
              </h3>
              <p className="text-xs text-[#b3b3b3]">
                Enter your 10-digit phone or WhatsApp number. Existing members log in via password; new visitors create a profile.
              </p>
            </div>

            <form onSubmit={handlePhoneCheckSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
                  10-Digit Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input 
                    type="tel" 
                    required 
                    autoFocus
                    maxLength={10}
                    placeholder="e.g. 9876543210" 
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:border-yellow-400 outline-none transition"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Verify & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2A: EXISTING MEMBER PASSWORD LOGIN */}
        {step === 'login-password' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase px-3 py-1 rounded-full font-mono">
                STEP 2 OF 3: MEMBER VERIFICATION
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">
                WELCOME BACK, {matchedMember?.name?.split(' ')[0]}!
              </h3>
              <p className="text-xs text-[#b3b3b3]">
                Existing account detected for <strong className="text-white font-mono">+91 {cleanPhone}</strong>. Enter your password to proceed to checkout.
              </p>
            </div>

            <form onSubmit={handlePasswordLoginSubmit} className="space-y-4">
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-between text-xs">
                <span className="text-neutral-300 font-bold">Member Name: <strong className="text-white">{matchedMember?.name}</strong></span>
                <button 
                  type="button" 
                  onClick={() => setStep('phone-check')} 
                  className="text-yellow-400 hover:underline font-bold text-[11px]"
                >
                  Change Number
                </button>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
                  Enter Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input 
                    type="password" 
                    required 
                    autoFocus
                    placeholder="Enter your password" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-yellow-400 outline-none transition"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Verify & Continue to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2B: NEW MEMBER SIGN-UP */}
        {step === 'signup' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="bg-lime-400/20 text-lime-400 border border-lime-400/40 text-[10px] font-black uppercase px-3 py-1 rounded-full font-mono">
                STEP 2 OF 3: NEW MEMBER REGISTRATION
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">
                CREATE MEMBER PROFILE
              </h3>
              <p className="text-xs text-[#b3b3b3]">
                Register your details for phone number <strong className="text-white font-mono">+91 {cleanPhone}</strong>.
              </p>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input 
                    type="text" 
                    required 
                    autoFocus
                    placeholder="e.g. Rahul Sharma" 
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-yellow-400 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input 
                    type="email" 
                    required 
                    placeholder="rahul@example.com" 
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-yellow-400 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
                    Create Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    <input 
                      type="password" 
                      required 
                      placeholder="Min 4 chars" 
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:border-yellow-400 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
                    Emergency Contact *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    <input 
                      type="tel" 
                      required 
                      maxLength={10}
                      placeholder="Family phone number" 
                      value={signupData.emergencyContact}
                      onChange={(e) => setSignupData({ ...signupData, emergencyContact: e.target.value.replace(/\D/g, '') })}
                      className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white font-mono focus:border-yellow-400 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-lime-400 hover:bg-lime-300 active:scale-[0.98] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Profile & Continue to Checkout</span>
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: PLAN SUMMARY & PAYMENT GATEWAY */}
        {step === 'checkout' && (
          <form onSubmit={handleFinalPaymentSubmit} className="space-y-5">
            <div className="space-y-2">
              <span className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 text-[10px] font-black uppercase px-3 py-1 rounded-full font-mono">
                STEP 3 OF 3: PLAN SUMMARY & PAYMENT
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">
                COMPLETE MEMBERSHIP PURCHASE
              </h3>
            </div>

            {/* Plan Summary Banner */}
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-yellow-400/50 p-5 rounded-2xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-black bg-yellow-400 px-2.5 py-0.5 rounded-full font-mono">
                    {activePlan.badge || 'SELECTED PASS'}
                  </span>
                  <h4 className="text-lg font-black text-white font-['Outfit'] mt-1">
                    {activePlan.name}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-yellow-400 font-['Outfit']">
                    ₹{totalPayable.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">{activePlan.duration}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Base Plan Price:</span>
                  <span className="font-mono font-bold text-white">₹{basePrice.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-neutral-300">
                  <span>Personal Trainer Add-on:</span>
                  <span className={`font-bold ${activePlan.includePT ? 'text-yellow-400' : 'text-neutral-500'}`}>
                    {activePlan.includePT ? `+₹${ptAddonCost.toLocaleString('en-IN')} (+₹1,000/mo x ${durationMonths} mos)` : 'Not Added'}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-300 pt-2 border-t border-neutral-800 font-bold">
                  <span className="text-white">Total Payable Amount:</span>
                  <span className="text-yellow-400 font-mono text-sm">₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* If Couple Plan: Require Partner Full Name */}
            {activePlan.isCouple && (
              <div className="p-4 rounded-2xl bg-red-950/30 border border-red-600/40 space-y-2">
                <label className="block text-xs font-black uppercase text-red-400">
                  Partner Full Name (Couple Plan) *
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Neha Sharma" 
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3.5 py-3 text-sm text-white focus:border-red-500 outline-none"
                />
              </div>
            )}

            {/* Desk Payment Info */}
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="font-black text-white uppercase text-[11px]">Ravi's Payment Desk & Gateway</span>
                <span className="text-yellow-400 font-bold text-[10px]">Instant Pass Activation</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-black border border-neutral-800">
                  <p className="text-neutral-400 font-bold">Gym Desk UPI ID</p>
                  <p className="font-mono font-black text-yellow-400">energie.fitness@upi</p>
                  <p className="text-[10px] text-neutral-500">or 8384855909@paytm</p>
                </div>
                <div className="p-2.5 rounded-xl bg-black border border-neutral-800">
                  <p className="text-neutral-400 font-bold">Gym Desk Counter</p>
                  <p className="font-bold text-white">Cash Accepted</p>
                  <p className="text-[10px] text-neutral-500">Shikarpur Bypass Rd Desk</p>
                </div>
              </div>
            </div>

            {/* Payment Method Options */}
            <div>
              <label className="block text-xs font-black uppercase text-neutral-300 mb-2">
                Select Payment Option
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {['UPI (Google Pay / PhonePe / Paytm)', 'Credit / Debit Card', 'Pay at Gym Desk (Cash)'].map((mode) => (
                  <button 
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMethod(mode)}
                    className={`p-3 rounded-xl border text-left text-xs font-extrabold transition cursor-pointer ${
                      paymentMethod === mode 
                        ? 'border-yellow-400 bg-yellow-400/15 text-yellow-400 shadow-md' 
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Payment & Generating Pass...</span>
                </div>
              ) : (
                <>
                  <span>Complete Purchase & Claim Pass (₹{totalPayable.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION & RECEIPT */}
        {step === 'success' && purchasedMember && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 border border-green-500/40 flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="bg-lime-400 text-black font-black text-[10px] uppercase px-3 py-1 rounded-md mb-2 inline-block">
                MEMBERSHIP ACTIVATED & PASS SAVED
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">
                PAYMENT CONFIRMED!
              </h3>
              <p className="text-xs text-[#b3b3b3] mt-1">
                Your membership pass is now active and saved into the gym system database.
              </p>
            </div>

            {/* Pass Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-black border border-neutral-800 text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 font-bold">Member ID:</span>
                <strong className="text-yellow-400 font-mono">{purchasedMember.id}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">Member Name:</span>
                <strong className="text-white">{purchasedMember.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">Plan & Duration:</span>
                <strong className="text-white">{purchasedMember.plan} ({purchasedMember.duration || activePlan.duration})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">Amount Paid:</span>
                <strong className="text-yellow-400 font-mono">₹{purchasedMember.amountPaid?.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-bold">Payment Method:</span>
                <strong className="text-white">{purchasedMember.paymentMethod}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                type="button"
                onClick={() => {
                  if (onViewReceipt) onViewReceipt(purchasedMember);
                  handleCloseModal();
                }}
                className="w-full sm:w-1/2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase py-3.5 rounded-xl border border-neutral-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-yellow-400" />
                <span>View Tax Receipt</span>
              </button>

              <button 
                type="button"
                onClick={handleCloseModal}
                className="w-full sm:w-1/2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase py-3.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-black" />
                <span>Access Member Portal</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
