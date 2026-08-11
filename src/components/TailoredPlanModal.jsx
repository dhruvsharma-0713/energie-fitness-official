import React from 'react';
import { Target, Dumbbell, Flame, Clock, Sparkles, X, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TailoredPlanModal({ isOpen, onClose, bmiResult, onOpenTrialModal }) {
  if (!isOpen || !bmiResult) return null;

  const { bmi, category, color } = bmiResult;

  // Custom macro & workout recommendations based on BMI category
  const getTailoredDetails = () => {
    if (bmi < 18.5) {
      return {
        title: "Clean Hypertrophy & Muscle Gaining Blueprint",
        focus: "Heavy Compound Lifting & Caloric Surplus",
        calories: "2,800 - 3,200 kcal/day",
        protein: "140g - 170g",
        carbs: "350g - 400g",
        fats: "70g",
        slot: "Morning Slot (06:00 AM - 09:30 AM)",
        routine: [
          "Mon: Heavy Chest & Triceps (Bench Press, Incline Press, Dips)",
          "Tue: Hypertrophy Back & Biceps (Lat Pulldowns, Barbell Rows)",
          "Thu: Quad & Glute Strength (Squats, Leg Press, Romanian Deadlifts)",
          "Fri: Overhead Shoulder Press & Heavy Dumbbell Shrugs"
        ]
      };
    } else if (bmi >= 18.5 && bmi < 25) {
      return {
        title: "Athletic Conditioning & Lean Shred Blueprint",
        focus: "High-Intensity Functional CrossFit & Progressive Overload",
        calories: "2,200 - 2,500 kcal/day",
        protein: "150g - 180g",
        carbs: "220g - 260g",
        fats: "60g",
        slot: "Evening Slot (05:00 PM - 08:30 PM)",
        routine: [
          "Mon: Upper Body Strength & Battle Rope Conditioning",
          "Tue: CrossFit Functional Cage Workout & Kettlebell Swings",
          "Thu: Heavy Leg Hypertrophy & Sled Pushes",
          "Fri: Full Body HIIT Sprint Intervals & Core Shred"
        ]
      };
    } else {
      return {
        title: "Rapid Body Fat Loss & Cardio Conditioning Blueprint",
        focus: "Caloric Deficit, Circuit Training & High-Metabolism Sprints",
        calories: "1,700 - 2,000 kcal/day",
        protein: "160g - 190g",
        carbs: "130g - 160g",
        fats: "50g",
        slot: "Morning Slot (05:30 AM - 08:30 AM)",
        routine: [
          "Mon: 20m Incline Treadmill Walk + High-Rep Dumbbell Circuit",
          "Tue: CrossFit Battle Ropes & Plyo Box Jumps",
          "Thu: Cable Strength Rigs & Functional Core Shred",
          "Fri: Full Body Metabolic Circuit (Air Bike & Sled Sprints)"
        ]
      };
    }
  };

  const plan = getTailoredDetails();

  return (
    <div className="modal-overlay">
      <div className="bg-[#121212] border-2 border-red-600/60 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in relative text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-neutral-900 to-yellow-950/50 px-6 py-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-yellow-400">
            <Sparkles className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-black font-['Outfit'] uppercase tracking-tight text-white">
              TAILORED GYM & NUTRITION BLUEPRINT
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-neutral-900 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* BMI Status Banner */}
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-neutral-400">Calculated BMI Score</span>
              <p className="text-3xl font-black font-['Outfit'] text-white">{bmi}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-black uppercase text-neutral-400">BMI Category</span>
              <p className="text-base font-black uppercase" style={{ color }}>
                {category}
              </p>
            </div>
          </div>

          {/* Program Overview */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-red-500 text-xs font-black uppercase tracking-wider bg-red-600/15 border border-red-600/30 px-3 py-1 rounded-md">
              <Dumbbell className="w-4 h-4" /> {plan.title}
            </div>
            <p className="text-xs text-neutral-300 font-medium leading-relaxed">
              Target Strategy: <span className="font-extrabold text-yellow-400">{plan.focus}</span>
            </p>
          </div>

          {/* Daily Macronutrient Breakdown */}
          <div className="bg-black/60 border border-neutral-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-black uppercase text-yellow-400 flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-500" /> Target Daily Nutrition & Macronutrients
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-bold block">Calories</span>
                <span className="text-xs font-black text-white">{plan.calories}</span>
              </div>
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-bold block">Protein</span>
                <span className="text-xs font-black text-yellow-400">{plan.protein}</span>
              </div>
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-bold block">Carbs</span>
                <span className="text-xs font-black text-white">{plan.carbs}</span>
              </div>
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-bold block">Healthy Fats</span>
                <span className="text-xs font-black text-white">{plan.fats}</span>
              </div>
            </div>
          </div>

          {/* Weekly Training Split */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-yellow-400" /> Recommended Workout Split
            </h4>

            <div className="space-y-2">
              {plan.routine.map((item, idx) => (
                <div key={idx} className="bg-neutral-900 border border-neutral-800/80 p-3 rounded-xl flex items-start gap-2.5 text-xs text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Slot & CTA */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <Clock className="w-4 h-4 text-red-500 shrink-0" />
              <span>Recommended Slot: <strong className="text-white">{plan.slot}</strong></span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenTrialModal();
              }}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20"
            >
              Claim Free Pass for This Plan <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
