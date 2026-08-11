import React, { useState } from 'react';
import { User, QrCode, Calendar, Flame, CheckCircle, Clock, Download, Dumbbell, Award, ArrowRight, ShieldCheck, Heart, Sparkles, Camera, CheckCircle2, AlertCircle, Users, Target, CheckSquare, Plus, FileText } from 'lucide-react';
import CommunityFeed from './CommunityFeed';
import LiveQrScannerModal from './LiveQrScannerModal';
import WorkoutTracker from './WorkoutTracker';

export default function MemberPortal({ 
  member, 
  onRenewPlan, 
  onViewReceipt, 
  onRecordAttendance, 
  members = [], 
  posts = [], 
  setPosts, 
  friends = [], 
  setFriends,
  onOpenAuthModal,
  onNavigate,
  currentView,
  onOpenAboutModal
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'workout-today' | 'tracker' | 'questionnaire' | 'community' | 'receipt'
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanToast, setScanToast] = useState(null);

  // Workout tracker interactive state
  const [loggedExercises, setLoggedExercises] = useState({});
  const [sessionNotes, setSessionNotes] = useState('');
  const [isSessionSaved, setIsSessionSaved] = useState(false);

  // Goal Questionnaire state
  const [questionnaire, setQuestionnaire] = useState({
    age: '24',
    weight: '72',
    height: '175',
    goal: 'Muscle Building & Strength',
    daysPerWeek: '5 Days',
    experience: 'Intermediate'
  });
  const [generatedRecommendation, setGeneratedRecommendation] = useState(null);

  // Get Current Day of Week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayDayName = daysOfWeek[new Date().getDay()];
  const fullTodayDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

  // Calculate Days Remaining
  const endDate = new Date(member?.endDate || '2026-12-31');
  const today = new Date();
  const diffTime = endDate - today;
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const handleScanSuccess = (memberId) => {
    const nowStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const todayDateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    if (onRecordAttendance) {
      onRecordAttendance(memberId || member?.id, todayDateStr, nowStr);
    }

    setScanToast({
      type: 'success',
      msg: `Live QR Attendance Verified! Timestamp: ${nowStr} (${todayDateStr})`
    });

    setTimeout(() => {
      setScanToast(null);
    }, 6000);
  };

  const handleGenerateQuestionnaire = (e) => {
    e.preventDefault();
    const rec = {
      title: `${questionnaire.goal} Program (${questionnaire.daysPerWeek})`,
      dailyCalories: `${Number(questionnaire.weight) * 35} kcal`,
      dailyProtein: `${Number(questionnaire.weight) * 2.2}g`,
      split: [
        { day: 'Mon', focus: 'Chest & Triceps Hypertrophy' },
        { day: 'Tue', focus: 'Back & Biceps Power Lifting' },
        { day: 'Thu', focus: 'Leg & Glute Progressive Overload' },
        { day: 'Fri', focus: 'Shoulders & Core HIIT Sprints' }
      ]
    };
    setGeneratedRecommendation(rec);
  };

  if (!member) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-8 text-[#0d0d0d] text-white">
        
        {/* Guest Preview Banner */}
        <div className="bg-[#121212] border-2 border-red-600/60 p-8 rounded-3xl text-center space-y-4 shadow-2xl">
          <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto" />
          <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">MEMBER PORTAL ACCESS</h3>
          <p className="text-neutral-400 text-xs max-w-md mx-auto">
            Log in to view your digital member pass, log daily workouts, track attendance streaks, and connect on the social fitness feed.
          </p>
          <button
            onClick={onOpenAuthModal}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-6 py-3 rounded-xl transition shadow-lg shadow-yellow-400/20"
          >
            Log In / Create Account
          </button>
        </div>

        {/* Public Goal Questionnaire Preview */}
        <div className="bg-[#121212] border border-neutral-800 p-8 rounded-3xl space-y-6">
          <h3 className="text-xl font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
            <Target className="w-5 h-5 text-yellow-400" /> Interactive Fitness Goal Assessment
          </h3>

          <form onSubmit={handleGenerateQuestionnaire} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-neutral-400 font-bold block mb-1">Body Weight (kg)</label>
              <input
                type="number"
                value={questionnaire.weight}
                onChange={(e) => setQuestionnaire({ ...questionnaire, weight: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-neutral-400 font-bold block mb-1">Height (cm)</label>
              <input
                type="number"
                value={questionnaire.height}
                onChange={(e) => setQuestionnaire({ ...questionnaire, height: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-neutral-400 font-bold block mb-1">Target Goal</label>
              <select
                value={questionnaire.goal}
                onChange={(e) => setQuestionnaire({ ...questionnaire, goal: e.target.value })}
                className="input-field bg-neutral-900"
              >
                <option value="Muscle Building & Strength">Muscle Building & Strength</option>
                <option value="Fat Loss & Calorie Burn">Fat Loss & Calorie Burn</option>
                <option value="CrossFit Athletic Cage">CrossFit Athletic Cage</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase text-xs px-6 py-3 rounded-xl transition"
              >
                Preview Recommended Routine
              </button>
            </div>
          </form>

          {generatedRecommendation && (
            <div className="p-6 bg-black border border-neutral-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-yellow-400">{generatedRecommendation.title}</h4>
                <span className="text-xs text-neutral-400 font-mono">Protein Target: {generatedRecommendation.dailyProtein}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {generatedRecommendation.split.map((s, idx) => (
                  <div key={idx} className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 flex justify-between">
                    <span className="font-bold text-white">{s.day}</span>
                    <span className="text-neutral-300">{s.focus}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={onOpenAuthModal}
                  className="bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase px-5 py-2.5 rounded-xl transition"
                >
                  Save to Member Profile (Login Required)
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#0d0d0d] min-h-screen text-white">
      
      {/* Top Site-Wide Navigation Header Bar inside Member Portal */}
      <div className="bg-[#121212] border-b-2 border-neutral-800 p-4 rounded-2xl flex items-center justify-between gap-4 flex-wrap text-xs font-black uppercase shadow-xl">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('home')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer ${currentView === 'home' ? 'text-yellow-400 border-b-2 border-yellow-400 font-black' : 'text-neutral-400 hover:text-white'}`}
          >
            Home
          </button>
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('train-with-us')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer ${currentView === 'train-with-us' ? 'text-yellow-400 border-b-2 border-yellow-400 font-black' : 'text-neutral-400 hover:text-white'}`}
          >
            Services
          </button>
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('membership')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer ${currentView === 'membership' ? 'text-yellow-400 border-b-2 border-yellow-400 font-black' : 'text-neutral-400 hover:text-white'}`}
          >
            Memberships & Offers
          </button>
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('club-finder')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer ${currentView === 'club-finder' ? 'text-yellow-400 border-b-2 border-yellow-400 font-black' : 'text-neutral-400 hover:text-white'}`}
          >
            Club Finder
          </button>
          <button 
            type="button"
            onClick={() => onOpenAboutModal ? onOpenAboutModal() : (onNavigate && onNavigate('about'))}
            className={`px-3 py-2 rounded-xl transition cursor-pointer ${currentView === 'about' ? 'text-yellow-400 border-b-2 border-yellow-400 font-black' : 'text-neutral-400 hover:text-white'}`}
          >
            About Us
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-lime-400 font-bold bg-lime-400/10 px-2.5 py-1 rounded-lg border border-lime-400/30">
            ⚡ Member Session Active ({member?.name?.split(' ')[0]})
          </span>
          <button
            type="button"
            onClick={() => onRenewPlan && onRenewPlan(member)}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-3.5 py-1.5 rounded-xl font-black text-xs uppercase transition shadow-md cursor-pointer"
          >
            Renew / Upgrade Plan
          </button>
        </div>
      </div>
      
      {/* Attendance Toast */}
      {scanToast && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-black uppercase tracking-wider shadow-2xl transition ${
          scanToast.type === 'success' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400' : 'bg-red-950/80 border-red-500 text-red-400'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{scanToast.msg}</span>
          </div>
          <button onClick={() => setScanToast(null)} className="text-white hover:underline text-[10px]">Dismiss</button>
        </div>
      )}

      {/* Top Welcome Header */}
      <div className="bg-[#121212] border-2 border-red-600/40 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black text-2xl font-['Outfit'] shadow-xl shadow-yellow-400/20">
            {member.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">{member.name}</h2>
              {member.subRole === 'Staff / Trainer' ? (
                <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                  STAFF / TRAINER
                </span>
              ) : (
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  member.status === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-red-600/20 text-red-400'
                }`}>
                  {member.status}
                </span>
              )}
            </div>
            <p className="text-xs text-[#b3b3b3] font-mono mt-0.5">Member ID: {member.id} • {member.phone}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button 
            onClick={() => onRenewPlan && onRenewPlan(member)}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-yellow-400/20 transition flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 fill-black text-black" /> Renew / Upgrade Plan
          </button>

          <button 
            onClick={() => setIsScannerOpen(true)}
            className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider border border-neutral-700 transition flex items-center gap-2 cursor-pointer"
          >
            <Camera className="w-4 h-4 text-yellow-400" /> Live Camera Check-In
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-4 overflow-x-auto text-xs font-black uppercase">
        <button 
          onClick={() => setActiveTab('overview')} 
          className={`px-4 py-2.5 rounded-xl transition ${activeTab === 'overview' ? 'bg-yellow-400 text-black shadow-lg' : 'bg-neutral-900 text-neutral-300 border border-neutral-800'}`}
        >
          Digital Pass & Stats
        </button>
        <button 
          onClick={() => setActiveTab('workout-today')} 
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'workout-today' ? 'bg-red-600 text-white shadow-lg' : 'bg-neutral-900 text-neutral-300 border border-neutral-800'}`}
        >
          <Dumbbell className="w-4 h-4" /> Today's Workout ({todayDayName})
        </button>
        <button 
          onClick={() => setActiveTab('tracker')} 
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'tracker' ? 'bg-yellow-400 text-black shadow-lg' : 'bg-neutral-900 text-neutral-300 border border-neutral-800'}`}
        >
          <CheckSquare className="w-4 h-4" /> Workout Tracker
        </button>
        <button 
          onClick={() => setActiveTab('community')} 
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'community' ? 'bg-yellow-400 text-black shadow-lg' : 'bg-neutral-900 text-neutral-300 border border-neutral-800'}`}
        >
          <Users className="w-4 h-4" /> Community Feed
        </button>
        <button 
          onClick={() => setActiveTab('receipt')} 
          className={`px-4 py-2.5 rounded-xl transition ${activeTab === 'receipt' ? 'bg-yellow-400 text-black shadow-lg' : 'bg-neutral-900 text-neutral-300 border border-neutral-800'}`}
        >
          Billing & Receipt
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="bg-[#121212] border border-neutral-800 p-6 rounded-3xl relative overflow-hidden space-y-6 text-center shadow-xl">
              <span className="bg-red-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full">
                OFFICIAL MEMBER DIGITAL PASS
              </span>
              
              <div className="p-6 rounded-2xl bg-black border border-neutral-800 inline-block mx-auto shadow-2xl">
                <QrCode className="w-36 h-36 text-yellow-400 mx-auto" />
                <p className="text-xs text-[#b3b3b3] font-mono mt-3">{member.qrCode || member.id}</p>
              </div>

              <div className="space-y-2 text-xs text-neutral-300 border-t border-neutral-800 pt-4 text-left">
                <div className="flex justify-between">
                  <span className="text-[#b3b3b3]">Current Package:</span>
                  <strong className="text-white font-bold">{member.plan}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#b3b3b3]">Valid Expiry:</span>
                  <strong className="text-yellow-400 font-mono">{member.endDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#b3b3b3]">Target Goal:</span>
                  <strong className="text-white font-bold">{member.goal || 'General Fitness'}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#121212] border border-neutral-800 p-6 rounded-2xl text-center">
                <Flame className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-xs text-[#b3b3b3] uppercase font-black">Workout Streak</p>
                <p className="text-3xl font-black text-white font-mono mt-1">{member.streak || 1} Days</p>
              </div>

              <div className="bg-[#121212] border border-neutral-800 p-6 rounded-2xl text-center">
                <CheckCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-xs text-[#b3b3b3] uppercase font-black">Total Check-Ins</p>
                <p className="text-3xl font-black text-yellow-400 font-mono mt-1">{member.totalCheckIns || 1} Days</p>
              </div>
            </div>

            <div className="bg-[#121212] border border-neutral-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-lg font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-yellow-400" /> Assigned Weekly Routine
              </h3>
              <div className="space-y-3 text-xs">
                {member.workoutRoutine?.map((r, i) => (
                  <div key={i} className="p-3.5 bg-black rounded-xl border border-neutral-800">
                    <div className="flex justify-between font-bold text-yellow-400 mb-1">
                      <span>{r.day}</span>
                      <span>{r.muscle}</span>
                    </div>
                    <p className="text-neutral-300">{r.exercises}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TODAY'S DYNAMIC WORKOUT CARD (Requirement 5) */}
      {activeTab === 'workout-today' && (
        <div className="bg-[#121212] border-2 border-red-600/50 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="bg-yellow-400/20 text-yellow-400 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-yellow-400/30">
                DYNAMIC DAILY ROUTINE • {fullTodayDate}
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase mt-2">
                TODAY'S TARGET SPLIT ({todayDayName})
              </h3>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-xs">
              <span className="text-neutral-400">Target Muscle Group: </span>
              <strong className="text-yellow-400 font-bold">
                {todayDayName === 'Mon' ? 'Chest & Triceps Hypertrophy' :
                 todayDayName === 'Tue' ? 'Back & Biceps Power' :
                 todayDayName === 'Wed' ? 'Legs & Core Overload' :
                 todayDayName === 'Thu' ? 'Shoulders & Trap Strength' :
                 todayDayName === 'Fri' ? 'CrossFit & Battle Rope HIIT' : 'Sunday Active Mobility'}
              </strong>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black p-5 rounded-2xl border border-neutral-800 space-y-3">
              <h4 className="text-sm font-black text-yellow-400 uppercase">Recommended Exercises for Today ({todayDayName})</h4>
              <ul className="space-y-2 text-xs text-neutral-200">
                <li className="flex items-center gap-2 p-2 bg-neutral-900 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Warmup: 10 mins Treadmill Incline Walk + Dynamic Shoulder Mobility</span>
                </li>
                <li className="flex items-center gap-2 p-2 bg-neutral-900 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Compound Set 1: Heavy Incline Dumbbell Press (4 sets x 10-12 reps)</span>
                </li>
                <li className="flex items-center gap-2 p-2 bg-neutral-900 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Isolation Set 2: Cable Flyes & Tricep Rope Pushdowns (3 sets x 15 reps)</span>
                </li>
                <li className="flex items-center gap-2 p-2 bg-neutral-900 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Finisher: 3 rounds of Battle Ropes (30s) + Hanging Leg Raises</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WORKOUT TRACKER */}
      {activeTab === 'tracker' && (
        <WorkoutTracker 
          member={member} 
          onRecordAttendance={onRecordAttendance} 
        />
      )}

      {/* TAB 4: COMMUNITY FEED */}
      {activeTab === 'community' && (
        <CommunityFeed
          currentUser={member}
          members={members}
          posts={posts}
          setPosts={setPosts}
          friends={friends}
          setFriends={setFriends}
        />
      )}

      {/* TAB 5: BILLING */}
      {activeTab === 'receipt' && (
        <div className="bg-[#121212] border border-neutral-800 p-8 rounded-3xl text-center space-y-4">
          <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">Billing & Tax Invoice</h3>
          <button
            onClick={() => onViewReceipt(member)}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-6 py-3.5 rounded-xl transition inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> View Printable Tax Invoice
          </button>
        </div>
      )}

      {/* LIVE CAMERA QR SCANNER MODAL */}
      <LiveQrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        members={members}
      />

    </div>
  );
}
