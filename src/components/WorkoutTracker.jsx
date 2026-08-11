import React, { useState } from 'react';
import { Dumbbell, CheckCircle2, Flame, Trophy, Calendar, Plus, Save, Printer, Award, Sparkles, CheckSquare, Clock } from 'lucide-react';

export default function WorkoutTracker({ member, onRecordAttendance, onSaveRoutine }) {
  const [loggedSets, setLoggedSets] = useState({});
  const [sessionNotes, setSessionNotes] = useState('');
  const [logSuccessToast, setLogSuccessToast] = useState(false);

  const routine = member?.workoutRoutine || [
    { day: "Day 1 (Mon)", muscle: "Chest & Triceps", exercises: "Barbell Bench Press (4x10), Incline Dumbbell Press (4x12), Cable Pushdowns (4x12)" },
    { day: "Day 2 (Tue)", muscle: "Back & Biceps", exercises: "Lat Pulldowns (4x10), Seated Cable Rows (4x12), Biceps Curls (4x12)" },
    { day: "Day 3 (Wed)", muscle: "Legs & Core Overload", exercises: "Barbell Back Squats (4x8), Leg Press (4x12), Calf Raises (4x20)" }
  ];

  const handleToggleExerciseSet = (dayIdx, exIdx) => {
    const key = `${dayIdx}-${exIdx}`;
    setLoggedSets(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCompleteSession = (e) => {
    e.preventDefault();
    if (onRecordAttendance && member?.id) {
      onRecordAttendance(member.id);
    }
    setLogSuccessToast(true);
    setTimeout(() => setLogSuccessToast(false), 4000);
  };

  const handlePrintRoutine = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-white">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/60 via-neutral-900 to-yellow-950/40 p-6 md:p-8 rounded-3xl border border-red-600/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 px-3.5 py-1 rounded-full text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Trophy className="w-4 h-4" /> Member Daily Workout Tracker
          </div>
          <h2 className="text-2xl md:text-3xl font-black uppercase font-['Outfit'] tracking-tight">
            {member?.name || 'Active Member'}'S WORKOUT TRACKER
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm max-w-xl">
            Log your daily sets & reps, track your workout streak, and monitor your strength progression.
          </p>
        </div>

        {/* Streak & Attendance Stats */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-black rounded-2xl border border-neutral-800 text-center min-w-24">
            <span className="text-[10px] text-neutral-400 uppercase font-bold block">Workout Streak</span>
            <strong className="text-xl font-black text-yellow-400 font-mono flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 text-red-500 fill-red-500" /> {member?.streak || 1} Days
            </strong>
          </div>

          <div className="p-3 bg-black rounded-2xl border border-neutral-800 text-center min-w-24">
            <span className="text-[10px] text-neutral-400 uppercase font-bold block">Total Check-Ins</span>
            <strong className="text-xl font-black text-white font-mono">{member?.totalCheckIns || 1} Days</strong>
          </div>
        </div>
      </div>

      {logSuccessToast && (
        <div className="p-4 bg-emerald-950/90 border-2 border-emerald-500/60 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-3 animate-fade-in shadow-xl">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <div>
            <p className="font-extrabold text-sm">WORKOUT SESSION LOGGED & STREAK UPDATED!</p>
            <p className="text-neutral-300 text-[11px]">Your daily progress has been recorded in the gym database.</p>
          </div>
        </div>
      )}

      {/* Routine Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-yellow-400" /> ACTIVE WORKOUT ROUTINE & SET LOGS
          </h3>

          <button
            onClick={handlePrintRoutine}
            className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl border border-neutral-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-yellow-400" />
            <span>Print Routine PDF</span>
          </button>
        </div>

        <div className="space-y-4">
          {routine.map((r, dayIdx) => (
            <div key={dayIdx} className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-yellow-400 font-mono uppercase">{r.day}</span>
                  <span className="text-xs font-bold text-white">• {r.muscle}</span>
                </div>
                <span className="text-[10px] bg-lime-400/20 text-lime-400 border border-lime-400/40 px-2.5 py-0.5 rounded-full font-black">
                  ✓ Active Protocol
                </span>
              </div>

              {/* Exercises Checklist */}
              <div className="space-y-2 text-xs">
                {typeof r.exercises === 'string' ? (
                  r.exercises.split('•').map((exStr, exIdx) => {
                    const isDone = Boolean(loggedSets[`${dayIdx}-${exIdx}`]);
                    return (
                      <div 
                        key={exIdx}
                        onClick={() => handleToggleExerciseSet(dayIdx, exIdx)}
                        className={`p-3 rounded-2xl border flex items-center justify-between transition cursor-pointer ${
                          isDone ? 'bg-emerald-950/40 border-emerald-500/50 text-neutral-300' : 'bg-black border-neutral-800 text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                            isDone ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-neutral-700 bg-neutral-900'
                          }`}>
                            {isDone && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className={`font-bold ${isDone ? 'line-through text-neutral-400' : 'text-white'}`}>
                            {exStr.trim()}
                          </span>
                        </div>
                        <span className="text-[10px] text-yellow-400 font-mono font-bold">Tap to Complete</span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-neutral-300">{JSON.stringify(r.exercises)}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Log Session Action Form */}
        <form onSubmit={handleCompleteSession} className="p-6 bg-[#121212] border-2 border-yellow-400/60 rounded-3xl space-y-4 shadow-2xl">
          <h4 className="text-sm font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" /> LOG TODAY'S SESSION & NOTES
          </h4>

          <textarea
            rows="2"
            placeholder="Add today's weights lifted, PR milestones, or Coach Ravi notes (e.g. Bench Press 80kg x 8 reps)..."
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-3.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-yellow-400"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Flame className="w-4 h-4 fill-black" />
            <span>LOG TODAY'S WORKOUT SESSION & INCREMENT STREAK</span>
          </button>
        </form>

      </div>

    </div>
  );
}
