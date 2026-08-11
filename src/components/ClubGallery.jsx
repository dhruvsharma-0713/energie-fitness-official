import React, { useState } from 'react';
import { Camera, MapPin, Sparkles } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function ClubGallery() {
  const images = [
    { id: "g1", title: "CrossFit Arena & Heavy Free Weights", image: "/images/hero_crossfit.jpg", category: "CrossFit Zone" },
    { id: "g2", title: "High-Tech Cardio & Treadmills", image: "/images/cardio_zone.jpg", category: "Cardio Zone" },
    { id: "g3", title: "Personal Coaching & Couple Studio", image: "/images/couple_training.jpg", category: "Personal Studio" },
    { id: "g4", title: "Heavy Dumbbell Racks & Power Cages", image: "/images/strength_zone.jpg", category: "Strength Area" }
  ];

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="badge badge-lime uppercase font-mono tracking-widest">Gym Visual Gallery</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase font-['Outfit']">
            VIRTUAL TOUR OF <span className="text-lime-400">ENERGIE FITNESS</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Take a look inside our fitness facility, CrossFit cage, cardio section, and heavy strength zone.
          </p>
        </div>

        {/* Big Preview Visual */}
        <div className="space-y-6">
          <div className="relative h-[320px] sm:h-[450px] lg:h-[520px] w-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
            <img 
              src={activeImage.image} 
              alt={activeImage.title} 
              className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div>
                <span className="badge badge-lime text-[10px] mb-1.5">{activeImage.category}</span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">{activeImage.title}</h3>
              </div>
            </div>
          </div>

          {/* Multi-Column Image Grid: grid grid-cols-2 md:grid-cols-4 gap-4 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <button 
                key={img.id}
                onClick={() => setActiveImage(img)}
                className={`relative h-28 sm:h-36 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  activeImage.id === img.id ? 'border-lime-400 scale-[1.02] shadow-lg shadow-lime-400/20' : 'border-neutral-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.image} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-2 left-2 text-left text-[11px] font-bold text-white font-['Outfit'] truncate max-w-[90%]">
                  {img.category}
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
