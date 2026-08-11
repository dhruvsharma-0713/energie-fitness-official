import React, { useState } from 'react';
import { Dumbbell, Zap, Users, Target, Heart, CheckCircle2, ArrowRight, Play, Clock, Sparkles } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';
import ClassTimetable from './ClassTimetable';
import YouTubeShowcase from './YouTubeShowcase';

export default function TrainWithUsView({ onOpenTrialModal, onSelectPlan }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const servicesList = [
    {
      id: 'strength',
      title: 'Pin-Loaded Strength & Free Weights',
      category: 'Strength',
      desc: 'Train with high-precision pin-loaded machines, power racks, heavy smith machines, and a rubberized dumbbell arena with weights up to 50kg.',
      icon: Dumbbell,
      image: '/images/strength_zone.jpg',
      highlights: ['Pin-selected isolateral machines', 'Olympic barbell press racks', 'Heavy-duty dumbbell collection up to 50kg', 'Safety spotter zones']
    },
    {
      id: 'crossfit',
      title: 'Freestyle CrossFit & Functional Cage',
      category: 'CrossFit',
      desc: 'Push your athletic capacity in our dedicated functional training arena equipped with battle ropes, plyometric boxes, kettlebells, and sled tracks.',
      icon: Zap,
      image: '/images/hero_crossfit.jpg',
      highlights: ['Functional training rig & cage', 'Heavy battle ropes & sled tracks', 'Kettlebell & wall-ball arena', 'HIIT agility ladder drills']
    },
    {
      id: 'personal-coaching',
      title: '1-on-1 Personal Coaching with Coach Ravi',
      category: 'Personal Training',
      desc: 'Accelerate your transformation with tailored workout cards, bi-weekly body fat scanning, dietician macros chart, and continuous posture guidance.',
      icon: Users,
      image: '/images/trainer_ravi.jpg',
      highlights: ['Custom workout cards & exercise tracking', 'Targeted macro diet plans', 'Weekly body fat composition checks', 'Injury-free posture correction']
    },
    {
      id: 'cardio',
      title: 'High-Tech Cardio & Fat Burn Zone',
      category: 'Cardio',
      desc: 'Burn maximum calories with commercial-grade motorized treadmills, elliptical cross-trainers, assault bikes, and stairmasters.',
      icon: Target,
      image: '/images/cardio_zone.jpg',
      highlights: ['Touchscreen shock-absorbent treadmills', 'Heart rate monitor sync', 'Calorie sprint routines', 'Low-impact cross trainers']
    },
    {
      id: 'couple-training',
      title: 'Exclusive Couple Fitness Special',
      category: 'Couple Special',
      desc: 'Work out together with your partner or gym buddy. Shared workout sessions, dual progress charts, and special pair discounts.',
      icon: Heart,
      image: '/images/couple_training.jpg',
      highlights: ['Dual partner workout routines', 'Synchronized conditioning drills', '2-person membership discounts', 'Shared nutrition tracking']
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? servicesList 
    : servicesList.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="min-h-screen bg-black text-white pt-6 pb-20">
      
      {/* Hero Header */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-b border-neutral-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#84cc16_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/30 px-4 py-1.5 rounded-full text-lime-400 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" /> Premier Health Club Services
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase font-['Outfit']">
            TRAIN WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">THE BEST</span> IN BULANDSHAHR
          </h1>

          <p className="text-neutral-400 text-base md:text-xl max-w-3xl mx-auto mt-4 leading-relaxed font-medium">
            From high-tech strength machines and dedicated CrossFit arenas to 1-on-1 personal coaching with Coach Ravi — discover everything you need to transform your physique.
          </p>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10 p-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl backdrop-blur-md">
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-lime-400 font-['Outfit']">50+</div>
              <div className="text-xs text-neutral-400 uppercase font-bold">Imported Machines</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-white font-['Outfit']">CrossFit</div>
              <div className="text-xs text-neutral-400 uppercase font-bold">Dedicated Cage Zone</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-lime-400 font-['Outfit']">100%</div>
              <div className="text-xs text-neutral-400 uppercase font-bold">Personalized Guidance</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-white font-['Outfit']">1-Day</div>
              <div className="text-xs text-neutral-400 uppercase font-bold">Free Trial Pass</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Navigation */}
      <section className="py-8 bg-neutral-950 border-b border-neutral-800 sticky top-20 z-30 backdrop-blur-md bg-neutral-950/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 flex-wrap">
          {['all', 'Strength', 'CrossFit', 'Personal Training', 'Cardio', 'Couple Special'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                selectedCategory === cat
                  ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
              }`}
            >
              {cat === 'all' ? 'All Services' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Detailed Services Breakdown */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {filteredServices.map((service, index) => {
          const IconComp = service.icon;
          const isEven = index % 2 === 0;

          return (
            <div 
              key={service.id}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 md:p-10 shadow-2xl hover:border-lime-400/40 transition-all duration-300`}
            >
              {/* Service Image Card */}
              <div className="w-full lg:w-1/2 relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-lime-400 font-extrabold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-lime-400/30 flex items-center gap-2">
                  <IconComp className="w-4 h-4" /> {service.category}
                </div>

                <div className="absolute bottom-4 right-4 bg-neutral-900/90 text-neutral-300 text-xs px-3 py-1 rounded-md border border-neutral-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-lime-400" /> Morning & Evening Slots
                </div>
              </div>

              {/* Service Info Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/30 text-lime-400 flex items-center justify-center">
                  <IconComp className="w-6 h-6" />
                </div>

                <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
                  {service.title}
                </h2>

                <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                  {service.desc}
                </p>

                {/* Key Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs md:text-sm font-bold text-neutral-300 bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-lime-400 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onOpenTrialModal}
                    className="bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-lime-400/20 transition flex items-center gap-2 transform hover:-translate-y-0.5"
                  >
                    Try Free 1-Day Pass <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://wa.me/918384855909?text=Hi%20Coach%20Ravi,%20I%20want%20details%20about%20your%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl border border-neutral-700 transition"
                  >
                    Chat with Coach Ravi
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Class Timetable Section */}
      <ClassTimetable />

      {/* YouTube Workout Videos Showcase */}
      <YouTubeShowcase />

    </div>
  );
}
