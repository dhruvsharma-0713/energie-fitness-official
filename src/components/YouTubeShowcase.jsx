import React from 'react';
import { Youtube, ExternalLink, Dumbbell, Sparkles } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function YouTubeShowcase() {
  // Requirement 4: 4 Official Video Embed Links
  const officialVideos = [
    {
      id: "v1",
      title: "FULL GYM TOUR & CROSSFIT ARENA",
      category: "Club Tour",
      embedUrl: "https://www.youtube.com/embed/-LR6Eh_UaKw",
      description: "Virtual tour of Bulandshahr's #1 high-tech fitness destination featuring pin-loaded strength rigs & CrossFit cage."
    },
    {
      id: "v2",
      title: "MORNING WORKOUT & STRENGTH DRILLS",
      category: "Morning Session",
      embedUrl: "https://www.youtube.com/embed/ER5N7PVACR8",
      description: "Coach Ravi leads morning heavy strength & powerlifting drills for peak muscular hypertrophy."
    },
    {
      id: "v3",
      title: "ENERGIE FITNESS BULANDSHAHR VIEW",
      category: "Club Showcase",
      embedUrl: "https://www.youtube.com/embed/SM1FV9obbQI",
      description: "Explore our cardio zone, free weights arena, and high-energy workout atmosphere."
    },
    {
      id: "v4",
      title: "GYM HIGHLIGHTS & ATHLETIC TRAINING",
      category: "Highlights",
      embedUrl: "https://www.youtube.com/embed/5I-AwuiWn8E",
      description: "High-intensity athletic conditioning, battle rope drills, and client transformation highlights."
    }
  ];

  return (
    <section className="py-20 bg-[#0d0d0d] border-t border-b border-red-600/30 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-red-500 text-xs font-black uppercase tracking-widest bg-red-600/20 border border-red-600/40 px-3.5 py-1.5 rounded-full">
              <Youtube className="w-4 h-4 fill-red-500 text-black" />
              <span>Official YouTube Channel</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#FFE600] uppercase tracking-tight font-['Outfit']">
              WATCH ENERGIE FITNESS IN ACTION
            </h2>
            <p className="text-[#b3b3b3] text-sm md:text-base max-w-2xl font-medium">
              Experience the real energy at Energie Fitness Bulandshahr. Watch Coach Ravi’s workout masterclasses, CrossFit arena training, and full club tours.
            </p>
          </div>

          <a 
            href={GYM_DETAILS.youtubeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition shadow-lg shadow-red-600/20 w-fit transform hover:-translate-y-0.5"
          >
            <Youtube className="w-4 h-4 fill-white" /> Subscribe @energiefitness1060 <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Requirement 4: Modern 4-Card Responsive Video Gallery with Embedded YouTube Players */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {officialVideos.map((video) => (
            <div 
              key={video.id}
              className="bg-[#121212] border-2 border-neutral-800 hover:border-red-600 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              {/* Responsive YouTube Video Player Frame */}
              <div className="relative aspect-video bg-black overflow-hidden border-b border-neutral-800">
                <iframe
                  title={video.title}
                  src={video.embedUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Card Information */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-red-600/20 text-red-400 border border-red-600/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
                      {video.category}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  </div>

                  <h3 className="text-white font-black text-sm uppercase leading-snug group-hover:text-yellow-400 transition-colors font-['Outfit']">
                    {video.title}
                  </h3>

                  <p className="text-neutral-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-bold text-neutral-400">
                  <span className="flex items-center gap-1 text-white">
                    <Dumbbell className="w-3.5 h-3.5 text-yellow-400" /> Coach Ravi
                  </span>
                  <a 
                    href={GYM_DETAILS.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline flex items-center gap-1 font-black"
                  >
                    Watch Full <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
