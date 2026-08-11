import React, { useState } from 'react';
import { Calculator, Activity, ArrowRight, Zap, X, Dumbbell, Utensils, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function BmiCalculator({ onSelectPlan }) {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(175);
  const [result, setResult] = useState(null);
  const [showTailoredModal, setShowTailoredModal] = useState(false);

  const calculateBMI = (e) => {
    e.preventDefault();
    const heightInMeters = height / 100;
    const bmiVal = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let category = '';
    let categoryKey = '';
    let recommendation = '';
    let planId = 'quarterly-single';
    let workoutSplit = [];
    let nutritionGuide = {};
    let recommendedSlot = '';

    if (bmiVal < 18.5) {
      categoryKey = 'underweight';
      category = 'Underweight (Hypertrophy & Mass Gain Target)';
      recommendation = 'Focus on high-calorie surplus nutrition, heavy compound strength lifts & progressive mass building.';
      planId = 'quarterly-single';
      workoutSplit = [
        { day: 'Mon / Wed / Fri', focus: 'Heavy Compound Lifts', drills: 'Barbell Squats 4x8, Bench Press 4x8, Deadlifts 3x5, Overhead Press 4x8' },
        { day: 'Tue / Thu / Sat', focus: 'Hypertrophy & Core', drills: 'Dumbbell Incline 4x12, Lat Pulldowns 4x12, Leg Press 4x15, Cable Woodchoppers' }
      ];
      nutritionGuide = {
        protein: '2.0g per kg bodyweight',
        carbs: 'High complex carbs (Oats, Rice, Sweet Potatoes)',
        calories: 'Surplus of +400 to +500 kcal/day',
        water: '3.5 to 4 Liters daily'
      };
      recommendedSlot = 'Evening Slot (05:30 PM - 09:30 PM) • Free Weights & Heavy Rigs Zone';
    } else if (bmiVal >= 18.5 && bmiVal <= 24.9) {
      categoryKey = 'normal';
      category = 'Normal & Healthy Athletic Composition';
      recommendation = 'Maintain peak athletic fitness, lean muscle definition & cardiovascular endurance in our CrossFit Cage Arena.';
      planId = 'annual-single';
      workoutSplit = [
        { day: 'Mon / Tue / Thu / Fri', focus: 'Hypertrophy & Strength', drills: 'Incline Dumbbell Press 4x10, Barbell Rows 4x10, Dumbbell Lunge 4x12, Dips' },
        { day: 'Wed / Sat', focus: 'CrossFit & Functional Cage', drills: 'Battle Ropes 3x45s, Kettlebell Swings 4x20, Box Jumps 4x15, Sled Push' }
      ];
      nutritionGuide = {
        protein: '1.8g per kg bodyweight',
        carbs: 'Balanced nutrient timing around workouts',
        calories: 'Maintenance level (Zero deficit/surplus)',
        water: '4.0 Liters daily'
      };
      recommendedSlot = 'Morning Slot (06:00 AM - 09:30 AM) • CrossFit Arena & Free Weights';
    } else if (bmiVal >= 25 && bmiVal <= 29.9) {
      categoryKey = 'overweight';
      category = 'Overweight (Calorie Burn & Fat Loss Target)';
      recommendation = 'Engage in targeted calorie deficit HIIT treadmill sprints + 45-minute weight loss & fat shredding routine.';
      planId = 'quarterly-single';
      workoutSplit = [
        { day: 'Daily Mon - Sat', focus: 'HIIT Cardio & Weight Loss', drills: 'Treadmill Incline Sprints 20m, Kettlebell Swings 4x20, Bodyweight Circuit 4x15' },
        { day: 'Alternate Days', focus: 'Circuit Resistance', drills: 'Lat Pulldowns 4x15, Dumbbell Chest Press 4x15, Cable Core Twists' }
      ];
      nutritionGuide = {
        protein: '2.2g per kg (Preserve lean muscle)',
        carbs: 'Low to moderate carbs, zero refined sugar',
        calories: 'Deficit of -500 kcal/day',
        water: '4.5 Liters daily'
      };
      recommendedSlot = 'Morning Slot (05:30 AM - 09:30 AM) • High-Tech Cardio & HIIT Zone';
    } else {
      categoryKey = 'obese';
      category = 'Obese (Personal Coaching & Low-Impact Cardio)';
      recommendation = '1-on-1 personal trainer guidance strongly recommended for low-impact cardio, joint protection & metabolic fat burning.';
      planId = 'monthly-single';
      workoutSplit = [
        { day: 'Mon / Wed / Fri', focus: 'Low-Impact Cardio & Mobility', drills: 'Elliptical Cross Trainer 25m, Stationary Bike 20m, Stretching & Joint Mobility' },
        { day: 'Tue / Thu / Sat', focus: 'Machine-Assisted Strength', drills: 'Pin-Loaded Seated Chest Press 3x12, Seated Row 3x12, Leg Extensions 3x15' }
      ];
      nutritionGuide = {
        protein: '2.0g per kg target weight',
        carbs: 'Strict complex carbs & high leafy fiber',
        calories: 'Supervised Caloric Deficit',
        water: '5.0 Liters daily'
      };
      recommendedSlot = 'Evening Slot (04:30 PM - 07:30 PM) • Guided Cardio & Pin-Loaded Rigs';
    }

    setResult({
      bmi: bmiVal,
      category,
      categoryKey,
      recommendation,
      planId,
      workoutSplit,
      nutritionGuide,
      recommendedSlot
    });
  };

  return (
    <section className="py-20 bg-[#0d0d0d] border-t border-red-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Form */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 px-3.5 py-1.5 rounded-full text-yellow-400 text-xs font-black uppercase tracking-widest">
                <Zap className="w-4 h-4 text-red-500" /> Body Composition Assessment
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-['Outfit']">
                CALCULATE YOUR <span className="text-yellow-400">BMI & FITNESS TARGET</span>
              </h2>
              <p className="text-[#b3b3b3] text-xs sm:text-sm">
                Get an instant body composition assessment and receive a tailored workout strategy for Energie Fitness.
              </p>
            </div>

            <form onSubmit={calculateBMI} className="bg-[#121212] border border-neutral-800 rounded-2xl p-6 space-y-4 shadow-xl">
              
              {/* Gender Selector */}
              <div>
                <label className="block text-xs font-black text-neutral-300 uppercase tracking-wider mb-2">Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-2 rounded-xl border text-xs font-black uppercase transition ${gender === 'male' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-neutral-900 border-neutral-800 text-neutral-300'}`}
                  >
                    Male
                  </button>
                  <button 
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-2 rounded-xl border text-xs font-black uppercase transition ${gender === 'female' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-neutral-900 border-neutral-800 text-neutral-300'}`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Slider Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-black text-neutral-300 uppercase tracking-wider">
                    Weight: <span className="text-yellow-400 font-mono">{weight} kg</span>
                  </label>
                  <input 
                    type="range" 
                    min="40" 
                    max="140" 
                    value={weight} 
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full accent-yellow-400 bg-neutral-900 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-black text-neutral-300 uppercase tracking-wider">
                    Height: <span className="text-yellow-400 font-mono">{height} cm</span>
                  </label>
                  <input 
                    type="range" 
                    min="130" 
                    max="210" 
                    value={height} 
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full accent-yellow-400 bg-neutral-900 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-black font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-yellow-400/20 transition flex items-center justify-center gap-2 mt-2"
              >
                Compute Fitness Score <Calculator className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Results Visual Box */}
          <div>
            {result ? (
              <div className="bg-[#121212] border-2 border-red-600/60 rounded-2xl p-8 space-y-6 text-center sm:text-left shadow-2xl">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <span className="bg-red-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full">
                    Body Assessment Result
                  </span>
                  <Activity className="w-6 h-6 text-yellow-400" />
                </div>

                <div>
                  <p className="text-xs text-[#b3b3b3] uppercase font-black tracking-widest">Body Mass Index (BMI)</p>
                  <p className="text-5xl font-black text-white mt-1 font-mono font-['Outfit']">{result.bmi}</p>
                  <p className="text-sm font-black text-yellow-400 mt-1">{result.category}</p>
                </div>

                <div className="p-4 rounded-xl bg-black border border-neutral-800 text-xs text-neutral-300 space-y-1">
                  <p className="font-black text-white uppercase text-[11px]">Recommended Strategy:</p>
                  <p>{result.recommendation}</p>
                </div>

                {/* Requirement 3: Get Tailored Gym Plan Button unlocks interactive modal */}
                <button 
                  onClick={() => setShowTailoredModal(true)}
                  className="bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-black font-black text-xs uppercase tracking-wider w-full py-4 rounded-xl shadow-lg shadow-yellow-400/20 transition flex items-center justify-center gap-2"
                >
                  Get Tailored Gym Plan <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="bg-[#121212] border border-neutral-800 rounded-2xl p-10 text-center space-y-4 shadow-xl">
                <Activity className="w-12 h-12 text-red-500 mx-auto" />
                <h3 className="text-xl font-black text-white font-['Outfit']">Instant Body Analysis</h3>
                <p className="text-xs text-[#b3b3b3]">
                  Adjust your height and weight sliders on the left and click "Compute Fitness Score" to receive personalized exercise recommendations.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Requirement 3: INTERACTIVE TAILORED GYM PLAN MODAL */}
      {showTailoredModal && result && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border-2 border-yellow-400 max-w-2xl w-full p-6 md:p-8 rounded-3xl space-y-6 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowTailoredModal(false)} 
              className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white transition border border-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 bg-red-600/20 border border-red-600/40 px-3 py-1 rounded-full text-yellow-400 text-[10px] font-black uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 text-red-500" /> CUSTOMIZED BMI GYM REGIMEN
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] uppercase">
                YOUR TAILORED <span className="text-yellow-400">FITNESS BLUEPRINT</span>
              </h3>
              <p className="text-xs text-[#b3b3b3]">
                Based on your score of <strong className="text-white font-mono">{result.bmi} BMI</strong> ({result.category})
              </p>
            </div>

            {/* Section 1: Workout Split */}
            <div className="space-y-3 bg-black p-5 rounded-2xl border border-neutral-800">
              <h4 className="text-xs font-black uppercase text-yellow-400 flex items-center gap-2 font-['Outfit']">
                <Dumbbell className="w-4 h-4 text-red-500" /> Custom Workout Routine & Exercises
              </h4>
              <div className="space-y-2 text-xs">
                {result.workoutSplit.map((split, i) => (
                  <div key={i} className="p-3 bg-[#121212] rounded-xl border border-neutral-800/80">
                    <div className="flex justify-between font-bold text-white mb-1">
                      <span className="text-yellow-400">{split.day}</span>
                      <span>{split.focus}</span>
                    </div>
                    <p className="text-neutral-300 text-[11px]">{split.drills}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Macro & Nutrition Guidelines */}
            <div className="space-y-3 bg-black p-5 rounded-2xl border border-neutral-800">
              <h4 className="text-xs font-black uppercase text-yellow-400 flex items-center gap-2 font-['Outfit']">
                <Utensils className="w-4 h-4 text-red-500" /> Macro & Nutrition Guidelines
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-[#121212] rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Protein Target</span>
                  <strong className="text-white">{result.nutritionGuide.protein}</strong>
                </div>
                <div className="p-2.5 bg-[#121212] rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Caloric Balance</span>
                  <strong className="text-white">{result.nutritionGuide.calories}</strong>
                </div>
                <div className="p-2.5 bg-[#121212] rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Carbohydrate Focus</span>
                  <strong className="text-white">{result.nutritionGuide.carbs}</strong>
                </div>
                <div className="p-2.5 bg-[#121212] rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Hydration Target</span>
                  <strong className="text-white">{result.nutritionGuide.water}</strong>
                </div>
              </div>
            </div>

            {/* Section 3: Recommended Slot */}
            <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 text-xs flex items-center gap-3">
              <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <div>
                <span className="text-[#b3b3b3] text-[10px] uppercase font-bold block">Recommended Club Training Slot</span>
                <strong className="text-white font-mono">{result.recommendedSlot}</strong>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => {
                setShowTailoredModal(false);
                const foundPlan = GYM_DETAILS.plans.find(p => p.id === result.planId) || GYM_DETAILS.plans[0];
                onSelectPlan(foundPlan);
              }}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-yellow-400/20 transition flex items-center justify-center gap-2"
            >
              <span>Activate Plan & Get Digital Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
