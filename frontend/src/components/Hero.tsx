import React from 'react';
import { ArrowDown, Heart, Compass } from 'lucide-react';

interface HeroProps {
  onOpenContributeModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContributeModal }) => {
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContribute = () => {
    if (onOpenContributeModal) {
      onOpenContributeModal();
    } else {
      const el = document.getElementById('contribute');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark & Golden Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="..\public\om1.png"
          alt="Vatsalya Vatika Ashram Students"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 animate-pulse-glow"
        />
        {/* Subtle Dark & Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ashram-green/90 via-ashram-green/60 to-black/40 dark:from-darkAshram-bg/95 dark:via-darkAshram-bg/80 dark:to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Subtle Spiritual Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-ashram-goldLight text-xs sm:text-sm font-sans font-medium mb-6 animate-float-slow">
          <span className="w-2 h-2 rounded-full bg-ashram-saffron animate-ping" />
          <span>Education • Values • Care • Service</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-ashram-cream dark:text-darkAshram-text drop-shadow-md mb-6">
          A Place to Learn, Grow and Build a Better Future.
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl mx-auto font-sans text-base sm:text-lg lg:text-xl text-white/90 dark:text-darkAshram-muted font-normal leading-relaxed mb-10">
          Vatsalya Vatika provides education, care, values and essential facilities to 200+ students in a safe and nurturing environment.
        </p>

        {/* Hero Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={scrollToAbout}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-ashram-green font-sans font-semibold text-base shadow-lg border border-transparent flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-white/60 hover:bg-ashram-cream"
          >
            <Compass className="w-5 h-5 text-ashram-saffron" />
            <span>Explore Vatsalya Vatika</span>
          </button>

          <button
            onClick={scrollToContribute}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-ashram-saffron text-white font-sans font-semibold text-base shadow-lg border border-transparent flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:bg-ashram-saffronHover hover:shadow-xl hover:border-ashram-saffron/30"
          >
            <Heart className="w-5 h-5 fill-white/20" />
            <span>Contribute Now</span>
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator Animation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors group cursor-pointer"
          aria-label="Scroll down to About section"
        >
          <span className="text-xs font-sans tracking-widest uppercase text-ashram-goldLight">Scroll Down</span>
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors animate-bounce">
            <ArrowDown className="w-4 h-4" />
          </div>
        </button>
      </div>
    </section>
  );
};
