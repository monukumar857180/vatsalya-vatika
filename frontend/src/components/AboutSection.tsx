import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, X, HeartHandshake, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [showMoreModal, setShowMoreModal] = useState(false);

  return (
    <section id="about" className="py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column: Image with Subtle Frame & Premium Hover/Touch */}
          <div className="relative group/about">
            {/* Soft ambient background glow */}
            <div className="absolute -inset-2 sm:-inset-4 w-full h-full bg-ashram-gold/15 dark:bg-amber-600/10 rounded-3xl blur-2xl opacity-50 group-hover/about:opacity-100 group-hover/about:scale-105 transition-all duration-700 pointer-events-none z-0" />

            <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white dark:border-darkAshram-border transition-all duration-700 ease-out group-hover/about:-translate-y-1.5 group-hover/about:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35),0_0_35px_rgba(220,150,70,0.2)]">
              <img
                src="/IMG_2026.jpeg"
                alt="Students learning at Vatsalya Vatika Ashram"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-1000 ease-out group-hover/about:scale-105 group-active/about:scale-105"
              />
              {/* Subtle ambient gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover/about:opacity-40 transition-opacity duration-700 pointer-events-none" />
              {/* Spiritual golden warmth highlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-ashram-gold/10 via-transparent to-amber-400/10 opacity-0 group-hover/about:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

            {/* Soft Decorative Backing Badge */}
            <div className="absolute -bottom-6 -right-6 z-20 hidden sm:flex items-center gap-3 bg-white dark:bg-darkAshram-card p-4 rounded-xl shadow-xl border border-ashram-border dark:border-darkAshram-border max-w-xs transition-transform duration-700 group-hover/about:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-ashram-saffron/10 flex items-center justify-center text-ashram-saffron shrink-0 shadow-sm">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <p className="font-heading font-bold text-lg text-ashram-green dark:text-darkAshram-gold leading-tight">
                  200+ Lives
                </p>
                <p className="text-xs text-ashram-muted dark:text-darkAshram-muted">
                  Nurtured with love & education
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Content Narrative */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-ashram-saffron/10 text-ashram-saffron dark:bg-darkAshram-gold/20 dark:text-darkAshram-gold text-xs font-semibold uppercase tracking-wider">
              <span>Warm Refuge & Foundation</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ashram-green dark:text-darkAshram-gold leading-tight">
              About Vatsalya Vatika
            </h2>

            <p className="font-sans text-base sm:text-lg text-ashram-charcoal/90 dark:text-darkAshram-text/90 leading-relaxed">
              Vatsalya Vatika is an educational and charitable Ashram created with a divine vision to ensure that no child is deprived of learning, dignity, and care.
            </p>

            <p className="font-sans text-sm sm:text-base text-ashram-muted dark:text-darkAshram-muted leading-relaxed">
              Here, 200+ students receive quality education, healthy nutritious meals, safe accommodation, clothing, medical attention, and moral guidance in a peaceful environment rooted in timeless spiritual values.
            </p>

            {/* Key Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-ashram-charcoal dark:text-darkAshram-text">
                <CheckCircle2 className="w-4 h-4 text-ashram-saffron" />
                <span>Free Quality Education</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ashram-charcoal dark:text-darkAshram-text">
                <CheckCircle2 className="w-4 h-4 text-ashram-saffron" />
                <span>Nutritious Daily Meals</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ashram-charcoal dark:text-darkAshram-text">
                <CheckCircle2 className="w-4 h-4 text-ashram-saffron" />
                <span>Safe Residential Home</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ashram-charcoal dark:text-darkAshram-text">
                <CheckCircle2 className="w-4 h-4 text-ashram-saffron" />
                <span>Character & Values</span>
              </div>
            </div>

            {/* Read More Button */}
            <div className="pt-4">
              <button
                onClick={() => setShowMoreModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ashram-green hover:bg-ashram-greenHover text-white font-medium text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Read More Detail Modal */}
      {showMoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white dark:bg-darkAshram-card rounded-2xl p-6 sm:p-8 shadow-2xl border border-ashram-border dark:border-darkAshram-border max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowMoreModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-ashram-border/50 dark:hover:bg-darkAshram-border text-ashram-charcoal dark:text-darkAshram-text"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-ashram-saffron/10 flex items-center justify-center text-ashram-saffron">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-ashram-green dark:text-darkAshram-gold">
                The Heritage & Vision of Vatsalya Vatika
              </h3>
            </div>

            <div className="space-y-4 font-sans text-sm sm:text-base text-ashram-charcoal/90 dark:text-darkAshram-text/90 leading-relaxed">
              <p>
                Established in 2005 under the visionary guidance of Swami Hariom Das Parivrajak, Vatsalya Vatika Ashram serves as a loving sanctuary for young minds eager to study, grow, and contribute meaningfully to society, currently supporting the children of 180 to 200 families.
              </p>
              <p>
                In recognition of its exemplary services in child development and value education, the Ashram was honored with a prestigious award by the <strong>Haryana Child Welfare Council</strong> in August 2013, presented in the presence of Haryana Governor Mahamahim Jagannath Pahadia and Minister Mrs. Asha Hooda.
              </p>
              <p>
                Beyond the standard school curriculum, our dedicated educators and resident mentors instill values, discipline, empathy, leadership, and digital skills. Every student is provided with balanced nutrition, clothing, healthcare, library access, and professional guidance.
              </p>
              <p>
                We believe that nurturing a child's potential is the highest form of social and spiritual service, transforming society's challenges into blessings.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-ashram-border dark:border-darkAshram-border flex justify-end">
              <button
                onClick={() => setShowMoreModal(false)}
                className="px-6 py-2.5 rounded-xl bg-ashram-saffron text-white font-medium text-sm hover:bg-ashram-saffronHover transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
