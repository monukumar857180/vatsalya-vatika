import React, { useEffect, useRef, useState } from 'react';
import { Users, GraduationCap, Sparkles, HeartHandshake } from 'lucide-react';

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, active, duration]);
  return count;
}

const STATS = [
  {
    icon: Users,
    numericValue: 200,
    displayValue: '200+',
    isNumeric: true,
    label: 'Students',
    description: 'Nurtured with care & free education',
    gradient: 'from-emerald-400 to-teal-600',
    bgGlow: 'bg-emerald-400/10 dark:bg-emerald-600/10',
  },
  {
    icon: GraduationCap,
    numericValue: 100,
    displayValue: '100%',
    isNumeric: true,
    label: 'Education Support',
    description: 'Complete academic & book assistance',
    gradient: 'from-amber-400 to-orange-500',
    bgGlow: 'bg-amber-400/10 dark:bg-amber-600/10',
  },
  {
    icon: Sparkles,
    numericValue: 0,
    displayValue: 'A–Z',
    isNumeric: false,
    label: 'Essential Facilities',
    description: 'Food, housing, sports & health',
    gradient: 'from-violet-400 to-purple-600',
    bgGlow: 'bg-violet-400/10 dark:bg-violet-600/10',
  },
  {
    icon: HeartHandshake,
    numericValue: 24,
    displayValue: '24/7',
    isNumeric: false,
    label: 'Care & Guidance',
    description: 'Continuous mentorship & values',
    gradient: 'from-rose-400 to-pink-600',
    bgGlow: 'bg-rose-400/10 dark:bg-rose-600/10',
  },
];

const StatCard: React.FC<{ stat: typeof STATS[0]; idx: number; active: boolean }> = ({ stat, idx, active }) => {
  const Icon = stat.icon;
  const count = useCountUp(stat.isNumeric ? stat.numericValue : 0, 1800, active && stat.isNumeric);

  return (
    <div
      className={`relative group p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-darkAshram-card border border-ashram-border/60 dark:border-darkAshram-border/60 shadow-lg hover:shadow-2xl dark:hover:shadow-dark-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 text-center cursor-default flex flex-col items-center justify-between ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${idx * 120}ms` }}
    >
      {/* Background glow on hover */}
      <div className={`absolute inset-0 ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`} />

      {/* Top gradient line */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 sm:w-20 h-1 rounded-b-full bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Icon */}
        <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>

        {/* Value */}
        <p className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-ashram-green dark:text-darkAshram-gold mb-1 leading-none">
          {stat.isNumeric ? `${count}+` : stat.displayValue}
        </p>

        {/* Label */}
        <p className="font-sans font-bold text-xs sm:text-base text-ashram-charcoal dark:text-darkAshram-text mt-1.5 sm:mt-2 mb-1">
          {stat.label}
        </p>

        {/* Description */}
        <p className="font-sans text-[10px] sm:text-xs text-ashram-muted dark:text-darkAshram-muted leading-relaxed">
          {stat.description}
        </p>
      </div>
    </div>
  );
};

export const ImpactStats: React.FC = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-gradient-to-b from-ashram-cream to-white dark:from-darkAshram-surface dark:to-darkAshram-bg transition-colors duration-300">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-300/10 dark:bg-emerald-700/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-300/10 dark:bg-amber-700/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-ashram-saffron dark:text-amber-400 font-bold mb-4 px-4 py-1.5 rounded-full bg-ashram-saffron/8 dark:bg-amber-900/20 border border-ashram-saffron/20 dark:border-amber-700/30">
            <Sparkles className="w-3 h-3" /> Our Impact
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-ashram-green dark:text-darkAshram-gold leading-tight">
            Transforming Lives Through<br className="hidden sm:block" /> Compassion
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-ashram-saffron to-ashram-gold rounded-full mx-auto mt-5" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {STATS.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} idx={idx} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
};
