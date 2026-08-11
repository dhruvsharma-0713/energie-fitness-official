import React, { useState } from 'react';
import { Clock, User, Flame, ArrowRight } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function ClassTimetable({ onOpenTrialModal }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'CrossFit', 'Strength', 'Cardio', 'Couple Special'];

  const filteredClasses = GYM_DETAILS.timetableClasses.filter(c => {
    if (selectedFilter === 'All') return true;
    return c.category === selectedFilter;
  });

  return (
    <section id="timetable" className="py-20 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="badge badge-lime uppercase font-mono tracking-widest">Class Timetable</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase font-['Outfit']">
            DAILY <span className="text-lime-400">EXERCISE SCHEDULE</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Select your discipline and reserve your training slot with Head Coach Ravi.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                selectedFilter === cat 
                  ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20' 
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid System: grid-cols-1 md:grid-cols-3 gap-6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredClasses.map((item) => (
            <div 
              key={item.id} 
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 hover:border-lime-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="badge badge-lime text-[10px]">{item.slot} Slot</span>
                  <span className="text-xs text-rose-400 font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current" /> {item.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-white font-['Outfit']">{item.name}</h3>

                <div className="space-y-1 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-lime-400" />
                    <span className="font-mono font-bold">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>Trainer: <strong>{item.trainer}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800">
                <button 
                  onClick={onOpenTrialModal}
                  className="w-full btn-secondary text-xs py-2.5 justify-center"
                >
                  Reserve Training Slot <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
