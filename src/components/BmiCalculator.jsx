import React, { useState } from 'react';
import { 
  Calculator, Activity, ArrowRight, Zap, X, Dumbbell, Utensils, Clock, 
  CheckCircle2, ShieldCheck, Lock, Unlock, Sparkles, Check, Flame, Trophy, 
  ChevronRight, ChevronLeft, Save, FileText, Target, User
} from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function BmiCalculator({ 
  onSelectPlan, 
  currentUser = null, 
  onOpenAuthModal,
  onSaveWorkoutToMember 
}) {
  // Wizard Step: 1 = Demographics, 2 = Goal, 3 = Experience, 4 = Schedule, 5 = Focus Areas
  const [wizardStep, setWizardStep] = useState(1);

  // Questionnaire State
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(175);
  const [goal, setGoal] = useState('hypertrophy');
  const [experience, setExperience] = useState('Intermediate');
  const [schedule, setSchedule] = useState('3-day');
  const [focusArea, setFocusArea] = useState('chest-arms');

  // AI Calculated Results State
  const [aiResult, setAiResult] = useState(null);
  const [savedSuccessToast, setSavedSuccessToast] = useState(false);

  // Calculate BMI, TDEE, Body Fat % and 7-Day AI Routine
  const handleGenerateAiPlan = (e) => {
    e.preventDefault();

    const heightInMeters = height / 100;
    const bmiVal = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));

    // BMR (Mifflin-St Jeor)
    const bmr = Math.round((10 * weight) + (6.25 * height) - (5 * age) + (gender === 'male' ? 5 : -161));
    const tdee = Math.round(bmr * 1.55);

    // Body Fat % Estimation
    const bodyFat = Math.max(8, Math.min(45, Math.round((1.20 * bmiVal) + (0.23 * age) - (gender === 'male' ? 16.2 : 5.4))));

    // Caloric Target & Macros
    let calorieTarget = tdee;
    let categoryName = '';

    if (goal === 'hypertrophy') {
      calorieTarget = tdee + 450;
      categoryName = 'Hypertrophy & Heavy Muscle Mass Building';
    } else if (goal === 'fat-loss') {
      calorieTarget = tdee - 500;
      categoryName = 'Aggressive Fat Shredding & Calorie Deficit';
    } else if (goal === 'crossfit') {
      calorieTarget = tdee + 200;
      categoryName = 'Athletic Conditioning & CrossFit Arena Power';
    } else {
      calorieTarget = tdee + 300;
      categoryName = 'Heavy Compound Strength & Powerlifting Lifts';
    }

    const proteinGrams = Math.round(weight * 2.2);
    const carbsGrams = Math.round((calorieTarget * 0.45) / 4);
    const fatGrams = Math.round((calorieTarget * 0.25) / 9);

    // 7-Day Customized AI Routine tailored to Energie Fitness equipment
    const full7DayRoutine = [
      {
        day: 'Day 1 (Monday)',
        muscle: 'Chest & Triceps Hypertrophy',
        locked: false,
        exercises: [
          { id: 'e1', name: 'Barbell Flat Bench Press', setsReps: '4 Sets x 8-10 Reps', machine: 'Olympic Power Rack', completed: false },
          { id: 'e2', name: 'Incline Dumbbell Press', setsReps: '4 Sets x 10-12 Reps', machine: 'Dumbbell Arena (up to 50kg)', completed: false },
          { id: 'e3', name: 'Pin-Loaded Seated Chest Fly', setsReps: '3 Sets x 12-15 Reps', machine: 'Pin-Loaded Pec Deck', completed: false },
          { id: 'e4', name: 'Triceps Cable Rope Pushdowns', setsReps: '4 Sets x 12 Reps', machine: 'Dual Adjustable Cable Station', completed: false }
        ]
      },
      {
        day: 'Day 2 (Tuesday)',
        muscle: 'Back & Biceps Width & Thickness',
        locked: !currentUser,
        exercises: [
          { id: 'e5', name: 'Wide-Grip Lat Pulldowns', setsReps: '4 Sets x 10 Reps', machine: 'Pin-Loaded Lat Pulldown Machine', completed: false },
          { id: 'e6', name: 'Bent-Over Barbell Rows', setsReps: '4 Sets x 8-10 Reps', machine: 'Olympic Barbell & Bumper Plates', completed: false },
          { id: 'e7', name: 'Seated Cable Row to Mid-Ribs', setsReps: '3 Sets x 12 Reps', machine: 'Low Cable Row Station', completed: false },
          { id: 'e8', name: 'Incline Dumbbell Biceps Curls', setsReps: '4 Sets x 12 Reps', machine: 'Adjustable Bench & Dumbbells', completed: false }
        ]
      },
      {
        day: 'Day 3 (Wednesday)',
        muscle: 'Legs & Lower Body Compound Overload',
        locked: !currentUser,
        exercises: [
          { id: 'e9', name: 'Barbell Back Squats', setsReps: '4 Sets x 8 Reps', machine: 'Squat Rack & Safety Spotters', completed: false },
          { id: 'e10', name: '45-Degree Leg Press Machine', setsReps: '4 Sets x 12 Reps', machine: 'Heavy Leg Press Machine', completed: false },
          { id: 'e11', name: 'Leg Extension & Hamstring Curls', setsReps: '3 Sets x 15 Reps', machine: 'Pin-Loaded Leg Extension/Curl', completed: false },
          { id: 'e12', name: 'Standing Calf Raises', setsReps: '4 Sets x 20 Reps', machine: 'Calf Raise Station', completed: false }
        ]
      },
      {
        day: 'Day 4 (Thursday)',
        muscle: 'Shoulders & Trap Mass',
        locked: !currentUser,
        exercises: [
          { id: 'e13', name: 'Standing Overhead Barbell Press', setsReps: '4 Sets x 8 Reps', machine: 'Power Rack', completed: false },
          { id: 'e14', name: 'Dumbbell Lateral Raises', setsReps: '4 Sets x 15 Reps', machine: 'Rubberized Dumbbell Arena', completed: false },
          { id: 'e15', name: 'Face Pulls & Cable Rear Delt Fly', setsReps: '4 Sets x 15 Reps', machine: 'Cable Pulley', completed: false },
          { id: 'e16', name: 'Heavy Barbell Shrugs', setsReps: '4 Sets x 12 Reps', machine: 'Barbell Rack', completed: false }
        ]
      },
      {
        day: 'Day 5 (Friday)',
        muscle: 'CrossFit Arena & Functional HIIT',
        locked: !currentUser,
        exercises: [
          { id: 'e17', name: 'Heavy Battle Ropes Conditioning', setsReps: '4 Sets x 45 Sec Sprints', machine: 'CrossFit Cage Arena', completed: false },
          { id: 'e18', name: 'Kettlebell Swings & Sled Push', setsReps: '4 Sets x 20 Reps', machine: 'Kettlebell & Turf Sled Track', completed: false },
          { id: 'e19', name: 'Plyometric Box Jumps', setsReps: '4 Sets x 12 Reps', machine: 'CrossFit Plyo Boxes', completed: false },
          { id: 'e20', name: 'Treadmill Incline Fat Burn Sprints', setsReps: '20 Mins High Incline', machine: 'Commercial Motorized Treadmill', completed: false }
        ]
      },
      {
        day: 'Day 6 (Saturday)',
        muscle: 'Arms & Core Sculpting',
        locked: !currentUser,
        exercises: [
          { id: 'e21', name: 'EZ-Bar Preacher Curls', setsReps: '4 Sets x 10 Reps', machine: 'Preacher Bench & EZ Bar', completed: false },
          { id: 'e22', name: 'Skullcrushers & Cable Pushdowns', setsReps: '4 Sets x 12 Reps', machine: 'Cable Station & Bench', completed: false },
          { id: 'e23', name: 'Hanging Leg Raises & Ab Crunch', setsReps: '4 Sets x 15 Reps', machine: 'Pull-Up Rig / Roman Chair', completed: false }
        ]
      },
      {
        day: 'Day 7 (Sunday)',
        muscle: 'Active Mobility & Deload Recovery',
        locked: !currentUser,
        exercises: [
          { id: 'e24', name: 'Full Body Dynamic Stretching', setsReps: '20 Mins', machine: 'Stretch & Foam Roller Mat Zone', completed: false },
          { id: 'e25', name: 'Low-Impact Cardio Walk', setsReps: '30 Mins (60% Max HR)', machine: 'Cardio Treadmill / Cycle', completed: false }
        ]
      }
    ];

    setAiResult({
      bmi: bmiVal,
      categoryName,
      bmr,
      tdee,
      bodyFat,
      calorieTarget,
      proteinGrams,
      carbsGrams,
      fatGrams,
      routine: full7DayRoutine
    });
  };

  const handleToggleExercise = (dayIdx, exerciseId) => {
    if (!aiResult) return;
    setAiResult(prev => {
      const updatedRoutine = prev.routine.map((d, idx) => {
        if (idx === dayIdx) {
          const updatedExercises = d.exercises.map(ex => 
            ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
          );
          return { ...d, exercises: updatedExercises };
        }
        return d;
      });
      return { ...prev, routine: updatedRoutine };
    });
  };

  const handleSaveToTracker = () => {
    if (!aiResult) return;

    // Convert AI routine to member routine format
    const formattedMemberRoutine = aiResult.routine.map(d => ({
      day: d.day,
      muscle: d.muscle,
      exercises: d.exercises.map(e => `${e.name} (${e.setsReps} - ${e.machine})`).join(' • ')
    }));

    if (onSaveWorkoutToMember) {
      onSaveWorkoutToMember(formattedMemberRoutine);
    }

    setSavedSuccessToast(true);
    setTimeout(() => setSavedSuccessToast(false), 4000);
  };

  return (
    <section id="ai-planner" className="py-20 bg-[#0d0d0d] border-t-2 border-red-600/40 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="w-full max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 px-4 py-1.5 rounded-full text-yellow-400 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-yellow-400" /> AI Workout Planner & Tracker Pipeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Outfit'] tracking-tight">
            INTELLIGENT <span className="text-yellow-400">FITNESS BLUEPRINT</span>
          </h2>
          <p className="text-[#b3b3b3] text-xs sm:text-base max-w-2xl mx-auto">
            Answer a 5-step questionnaire to compute your BMI, TDEE, body fat %, and generate an AI-powered 7-day routine customized to Energie Fitness equipment.
          </p>
        </div>

        {/* MAIN TWO-COLUMN CONTAINER: Questionnaire vs AI Strategy Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: PHASE 1 MULTI-STEP ASSESSMENT WIZARD */}
          <div className="lg:col-span-5 bg-[#121212] border-2 border-neutral-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative">
            
            {/* Step Progress Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <span className="text-xs font-black uppercase text-yellow-400 font-mono">
                STEP {wizardStep} OF 5
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div 
                    key={s} 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      s === wizardStep 
                        ? 'w-6 bg-yellow-400' 
                        : s < wizardStep 
                          ? 'w-3 bg-red-600' 
                          : 'w-3 bg-neutral-800'
                    }`} 
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: DEMOGRAPHICS */}
            {wizardStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white uppercase font-['Outfit']">
                  1. BODY METRICS & DEMOGRAPHICS
                </h3>

                <div>
                  <label className="block text-xs font-black text-neutral-300 uppercase mb-1.5">Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-3 rounded-xl border text-xs font-black uppercase transition cursor-pointer ${
                        gender === 'male' ? 'bg-yellow-400 text-black border-yellow-400 shadow-md' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      Male
                    </button>
                    <button 
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-3 rounded-xl border text-xs font-black uppercase transition cursor-pointer ${
                        gender === 'female' ? 'bg-yellow-400 text-black border-yellow-400 shadow-md' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-neutral-300 uppercase mb-1.5">
                    Age: <strong className="text-yellow-400 font-mono">{age} Years</strong>
                  </label>
                  <input 
                    type="range" min="14" max="75" value={age} 
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-yellow-400 bg-neutral-900 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-neutral-300 uppercase mb-1.5">
                    Height: <strong className="text-yellow-400 font-mono">{height} cm</strong>
                  </label>
                  <input 
                    type="range" min="130" max="210" value={height} 
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full accent-yellow-400 bg-neutral-900 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-neutral-300 uppercase mb-1.5">
                    Weight: <strong className="text-yellow-400 font-mono">{weight} kg</strong>
                  </label>
                  <input 
                    type="range" min="40" max="140" value={weight} 
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full accent-yellow-400 bg-neutral-900 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: PRIMARY GOAL */}
            {wizardStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white uppercase font-['Outfit']">
                  2. PRIMARY FITNESS GOAL
                </h3>
                
                <div className="space-y-2 text-xs font-bold">
                  {[
                    { id: 'hypertrophy', label: 'Hypertrophy & Heavy Muscle Gain', desc: 'Maximum mass gain, caloric surplus & heavy compound lifts' },
                    { id: 'fat-loss', label: 'Aggressive Fat Loss & HIIT', desc: 'Calorie deficit, treadmill sprints & kettlebell burn' },
                    { id: 'crossfit', label: 'Athletic Conditioning & CrossFit', desc: 'Battle ropes, plyo boxes, sled tracks & endurance' },
                    { id: 'powerlifting', label: 'Strength & Powerlifting Lifts', desc: 'Low reps, 1-RM progression on bench, squat & deadlift' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGoal(g.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                        goal === g.id 
                          ? 'border-yellow-400 bg-yellow-400/15 text-white shadow-md' 
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="font-extrabold text-sm text-yellow-400">{g.label}</div>
                      <div className="text-[11px] text-neutral-400 font-medium mt-0.5">{g.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: EXPERIENCE LEVEL */}
            {wizardStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white uppercase font-['Outfit']">
                  3. GYM EXPERIENCE LEVEL
                </h3>

                <div className="space-y-2 text-xs font-bold">
                  {[
                    { level: 'Beginner', desc: 'Under 6 months gym experience. Focus on form, pin-loaded machines & posture.' },
                    { level: 'Intermediate', desc: '6 months - 2 years experience. Comfortable with free weights & compound press.' },
                    { level: 'Advanced', desc: '2+ years experience. High volume PPL, heavy power racks & CrossFit arena.' }
                  ].map((exp) => (
                    <button
                      key={exp.level}
                      type="button"
                      onClick={() => setExperience(exp.level)}
                      className={`w-full p-4 rounded-2xl border text-left transition cursor-pointer ${
                        experience === exp.level 
                          ? 'border-yellow-400 bg-yellow-400/15 text-white shadow-md' 
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="font-extrabold text-sm text-yellow-400">{exp.level}</div>
                      <div className="text-[11px] text-neutral-400 font-medium mt-0.5">{exp.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: WEEKLY SCHEDULE */}
            {wizardStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white uppercase font-['Outfit']">
                  4. WEEKLY TRAINING FREQUENCY
                </h3>

                <div className="space-y-2 text-xs font-bold">
                  {[
                    { id: '3-day', label: '3 Days / Week (Push / Pull / Legs)', desc: 'Optimal for recovery and busy professionals' },
                    { id: '4-day', label: '4 Days / Week (Upper / Lower Body)', desc: 'Balanced hypertrophy & cardiovascular split' },
                    { id: '6-day', label: '6 Days / Week (PPL High-Volume)', desc: 'Pro athlete split for maximum muscle transformation' }
                  ].map((sch) => (
                    <button
                      key={sch.id}
                      type="button"
                      onClick={() => setSchedule(sch.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition cursor-pointer ${
                        schedule === sch.id 
                          ? 'border-yellow-400 bg-yellow-400/15 text-white shadow-md' 
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="font-extrabold text-sm text-yellow-400">{sch.label}</div>
                      <div className="text-[11px] text-neutral-400 font-medium mt-0.5">{sch.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: TARGET FOCUS AREAS */}
            {wizardStep === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white uppercase font-['Outfit']">
                  5. TARGET FOCUS AREAS
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  {[
                    { id: 'chest-arms', label: 'Chest & Arms' },
                    { id: 'core-abs', label: 'Core & Abs' },
                    { id: 'legs-glutes', label: 'Glutes & Legs' },
                    { id: 'full-body', label: 'Full Body' }
                  ].map((fa) => (
                    <button
                      key={fa.id}
                      type="button"
                      onClick={() => setFocusArea(fa.id)}
                      className={`p-4 rounded-2xl border text-center transition cursor-pointer ${
                        focusArea === fa.id 
                          ? 'border-yellow-400 bg-yellow-400 text-black font-black shadow-md' 
                          : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white'
                      }`}
                    >
                      {fa.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleGenerateAiPlan} className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-yellow-400/20 transition flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>COMPUTE & GENERATE AI WORKOUT PLAN</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800 text-xs">
              {wizardStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setWizardStep(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
              ) : <div />}

              {wizardStep < 5 && (
                <button
                  type="button"
                  onClick={() => setWizardStep(prev => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black font-black uppercase flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <span>Next Step</span> <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: PHASE 2 & PHASE 3 - AI GENERATED STRATEGY & TIERED ROUTINE TRACKER */}
          <div className="lg:col-span-7 space-y-6">
            {aiResult ? (
              <div className="space-y-6">
                
                {/* Save Toast Alert */}
                {savedSuccessToast && (
                  <div className="p-4 bg-emerald-950/90 border-2 border-emerald-500/60 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-3 animate-fade-in shadow-xl">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <div>
                      <p className="font-extrabold text-sm">AI WORKOUT ROUTINE SAVED!</p>
                      <p className="text-neutral-300 text-[11px]">Plan successfully synced into your Member Portal dashboard.</p>
                    </div>
                  </div>
                )}

                {/* AI Calculated Metrics Card */}
                <div className="bg-[#121212] border-2 border-red-600/60 rounded-3xl p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <span className="bg-red-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full">
                      AI BODY METRICS COMPUTED
                    </span>
                    <Activity className="w-5 h-5 text-yellow-400" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-black rounded-2xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">BMI Score</span>
                      <strong className="text-2xl font-black text-white font-mono font-['Outfit']">{aiResult.bmi}</strong>
                    </div>

                    <div className="p-3 bg-black rounded-2xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Est. Body Fat</span>
                      <strong className="text-2xl font-black text-yellow-400 font-mono font-['Outfit']">{aiResult.bodyFat}%</strong>
                    </div>

                    <div className="p-3 bg-black rounded-2xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Daily TDEE</span>
                      <strong className="text-xl font-black text-white font-mono font-['Outfit']">{aiResult.tdee} kcal</strong>
                    </div>

                    <div className="p-3 bg-black rounded-2xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Target Calorie</span>
                      <strong className="text-xl font-black text-lime-400 font-mono font-['Outfit']">{aiResult.calorieTarget} kcal</strong>
                    </div>
                  </div>

                  {/* Daily Macro Split Bar */}
                  <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-2 text-xs">
                    <div className="flex justify-between font-bold">
                      <span className="text-neutral-400">Target Macro Split:</span>
                      <span className="text-yellow-400">{aiResult.categoryName}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                      <span className="bg-neutral-900 p-2 rounded-xl text-yellow-400 font-mono font-bold">Protein: {aiResult.proteinGrams}g</span>
                      <span className="bg-neutral-900 p-2 rounded-xl text-white font-mono font-bold">Carbs: {aiResult.carbsGrams}g</span>
                      <span className="bg-neutral-900 p-2 rounded-xl text-neutral-300 font-mono font-bold">Fats: {aiResult.fatGrams}g</span>
                    </div>
                  </div>
                </div>

                {/* PHASE 3: 7-DAY ROUTINE CARDS WITH TIERED ACCESS */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
                      <Dumbbell className="w-5 h-5 text-yellow-400" /> 7-DAY ENERGIE FITNESS AI ROUTINE
                    </h3>

                    {currentUser && (
                      <button
                        onClick={handleSaveToTracker}
                        className="bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-black" />
                        <span>Save to My Tracker</span>
                      </button>
                    )}
                  </div>

                  {/* Routine Day Cards */}
                  <div className="space-y-4">
                    {aiResult.routine.map((dayItem, dayIdx) => {
                      const isLocked = !currentUser && dayIdx > 0;

                      return (
                        <div 
                          key={dayIdx} 
                          className={`bg-[#121212] border rounded-3xl p-5 space-y-4 transition shadow-xl relative overflow-hidden ${
                            isLocked ? 'border-neutral-800/80 opacity-80' : 'border-neutral-800 hover:border-yellow-400/50'
                          }`}
                        >
                          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-yellow-400 font-mono uppercase">{dayItem.day}</span>
                              <span className="text-xs font-bold text-white">• {dayItem.muscle}</span>
                            </div>

                            {isLocked ? (
                              <span className="text-[10px] bg-red-600/20 text-red-400 border border-red-500/40 px-2.5 py-0.5 rounded-full font-black flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Member Access Only
                              </span>
                            ) : (
                              <span className="text-[10px] bg-lime-400/20 text-lime-400 border border-lime-400/40 px-2.5 py-0.5 rounded-full font-black flex items-center gap-1">
                                <Unlock className="w-3 h-3" /> Unlocked & Interactive
                              </span>
                            )}
                          </div>

                          {/* Exercises List */}
                          {!isLocked ? (
                            <div className="space-y-2 text-xs">
                              {dayItem.exercises.map((ex) => (
                                <div 
                                  key={ex.id}
                                  onClick={() => handleToggleExercise(dayIdx, ex.id)}
                                  className={`p-3 rounded-2xl border flex items-center justify-between transition cursor-pointer ${
                                    ex.completed 
                                      ? 'bg-emerald-950/40 border-emerald-500/50 text-neutral-300' 
                                      : 'bg-black border-neutral-800 text-white hover:border-neutral-700'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                                      ex.completed ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-neutral-700 bg-neutral-900'
                                    }`}>
                                      {ex.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                    </div>

                                    <div>
                                      <p className={`font-extrabold ${ex.completed ? 'line-through text-neutral-400' : 'text-white'}`}>
                                        {ex.name}
                                      </p>
                                      <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                                        Equipment: {ex.machine}
                                      </p>
                                    </div>
                                  </div>

                                  <span className="text-[11px] font-bold text-yellow-400 font-mono shrink-0">
                                    {ex.setsReps}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            /* Locked Glass Overlay for Visitors (Days 2-7) */
                            <div className="p-6 bg-black/80 backdrop-blur-md rounded-2xl border border-neutral-800 text-center space-y-3">
                              <Lock className="w-8 h-8 text-yellow-400 mx-auto" />
                              <div>
                                <h4 className="text-sm font-black text-white font-['Outfit'] uppercase">
                                  UNLOCK DAYS 2–7 & DAILY WORKOUT TRACKER
                                </h4>
                                <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
                                  Log in or create a member account to unlock all 7 days of your custom AI routine, mark off daily sets, and save your workout streak.
                                </p>
                              </div>

                              <button
                                onClick={onOpenAuthModal}
                                className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-yellow-400/20 transition inline-flex items-center gap-1.5 cursor-pointer"
                              >
                                <Unlock className="w-4 h-4" /> Unlock Full AI Planner (Signup / Login)
                              </button>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>

                  {/* Visitor Call to Action Banner */}
                  {!currentUser && (
                    <div className="p-6 bg-gradient-to-r from-red-950/60 via-neutral-900 to-yellow-950/40 border-2 border-yellow-400/60 rounded-3xl space-y-3 text-center shadow-2xl">
                      <h4 className="text-lg font-black text-white font-['Outfit'] uppercase">
                        READY TO SYNC THIS AI ROUTINE TO YOUR MEMBER PORTAL?
                      </h4>
                      <p className="text-xs text-neutral-300 max-w-lg mx-auto">
                        Sign up or log in to lock in your custom AI workout plan, access daily set/rep tracking, and get your digital gym pass.
                      </p>
                      <button
                        onClick={onOpenAuthModal}
                        className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg shadow-yellow-400/20 transition inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>Login to Save Workout & Access Tracker</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                </div>

              </div>
            ) : (
              /* Pre-Calculation Default Hero Screen */
              <div className="bg-[#121212] border-2 border-neutral-800 rounded-3xl p-10 text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center mx-auto shadow-xl">
                  <Activity className="w-8 h-8" />
                </div>
                <div>
                  <span className="bg-red-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full font-mono">
                    READY FOR ANALYSIS
                  </span>
                  <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase mt-2">
                    YOUR AI WORKOUT BLUEPRINT AWAITS
                  </h3>
                  <p className="text-xs text-[#b3b3b3] max-w-md mx-auto mt-1 leading-relaxed">
                    Complete the 5-step questionnaire on the left and click "COMPUTE & GENERATE AI WORKOUT PLAN" to unlock your custom routine.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
