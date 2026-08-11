import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function ClientStories() {
  const stories = [
    {
      id: 1,
      name: "Amit Sharma",
      plan: "Quarterly Transformation",
      result: "Lost 14 kg Fat & Built Lean Muscle",
      quote: "Ravi's personal guidance and the CrossFit arena at Energie Fitness completely changed my fitness levels. The machines here are top quality!",
      tag: "Weight Loss & Strength"
    },
    {
      id: 2,
      name: "Rohan & Neha Verma",
      plan: "Couple Annual VIP",
      result: "Couples Fitness Transformation",
      quote: "We joined the Couple Annual Plan and it was the best decision. The environment is clean, comfortable, and the partner workouts keep us motivated daily.",
      tag: "Couple Member Package",
      isCouple: true
    },
    {
      id: 3,
      name: "Pankaj Rajput",
      plan: "Annual Beast Plan",
      result: "Gained 8 kg Pure Muscle Mass",
      quote: "Best gym equipment on Shikarpur Bypass Road. Heavy dumbbells, proper squat racks, and zero waiting time during evening slots.",
      tag: "Bodybuilding & Muscle"
    }
  ];

  return (
    <section className="py-20 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="badge badge-lime uppercase font-mono tracking-widest">Member Transformations</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase font-['Outfit']">
            REAL <span className="text-lime-400">SUCCESS STORIES</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            See how our members achieve remarkable strength and weight loss goals at Energie Fitness.
          </p>
        </div>

        {/* Responsive Grid System: grid-cols-1 md:grid-cols-3 gap-6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div 
              key={story.id} 
              className={`bg-neutral-900/80 border rounded-2xl p-6 hover:border-lime-500/50 transition-all flex flex-col justify-between ${
                story.isCouple ? 'border-rose-500/40 bg-rose-950/20' : 'border-neutral-800'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className={`badge ${story.isCouple ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'badge-lime'} text-[10px]`}>
                    {story.tag}
                  </span>
                </div>

                <h4 className="text-base font-black text-lime-400 font-['Outfit']">
                  "{story.result}"
                </h4>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-extrabold text-white">{story.name}</p>
                  <p className="text-[11px] text-neutral-400 font-mono">{story.plan}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-lime-400">
                  <Quote className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
