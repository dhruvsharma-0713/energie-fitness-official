import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { GYM_DETAILS } from '../data/mockData';

export default function HeroSlider({ onOpenTrialModal, onNavigateToPlans }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = GYM_DETAILS.heroSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full min-h-[550px] md:min-h-[640px] bg-[#0d0d0d] flex items-center overflow-hidden border-b-2 border-red-600/40">
      
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* High-res Image Background */}
          <img
            src={slide.bgImage}
            alt={slide.title}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80';
              e.currentTarget.onerror = null;
            }}
            className="w-full h-full object-cover object-center scale-105 filter brightness-75"
          />

          {/* Dark Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/70 to-black/80" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0d0d0d]/50 to-[#0d0d0d]" />
        </div>
      ))}

      {/* Main Slide Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16 md:py-24 text-center md:text-left">
        <div className="max-w-3xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/50 px-4 py-1.5 rounded-full text-yellow-400 text-xs font-black uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-red-500" />
            {slides[currentSlide].tagline}
          </div>

          {/* Bold Yellow Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white font-['Outfit'] leading-tight break-words px-1">
            TRAIN WITH THE <span className="text-yellow-400 inline-block">BEST IN BULANDSHAHR</span>
          </h1>

          {/* Subheadline in Light Gray */}
          <p className="text-[#b3b3b3] text-base sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">
            {slides[currentSlide].desc}
          </p>

          {/* Quick Value Props */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-extrabold uppercase text-neutral-300 pt-2">
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg border border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Modern Rigs
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg border border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-red-500" /> CrossFit Cage
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg border border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Couple Packages
            </div>
          </div>

          {/* CTA Buttons - Yellow primary & Red Outline secondary */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button
              onClick={onOpenTrialModal}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-xl shadow-yellow-400/20 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              Get Free Pass <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onNavigateToPlans}
              className="w-full sm:w-auto bg-transparent hover:bg-red-600 text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl border-2 border-red-600 shadow-xl transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              Explore Services <Play className="w-4 h-4 fill-white" />
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-red-600 text-white border border-neutral-800 transition backdrop-blur-md hidden sm:flex"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-red-600 text-white border border-neutral-800 transition backdrop-blur-md hidden sm:flex"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-yellow-400' : 'w-2.5 bg-neutral-600 hover:bg-neutral-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
