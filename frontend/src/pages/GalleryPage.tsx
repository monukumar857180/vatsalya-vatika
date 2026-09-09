import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { X, ZoomIn, Sparkles, Image as ImageIcon } from 'lucide-react';
import { galleryService } from '../services/galleryService';
import { GalleryItem } from '../types';
import { ContributeModal } from '../components/ContributeModal';

export const GalleryPage: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    galleryService.getGallery()
      .then(data => setGallery(data))
      .catch(err => console.error('Failed to load gallery:', err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Students', 'Events', 'Ashram', 'Activities'];
  const filteredGallery = activeCategory === 'All' ? gallery : gallery.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="min-h-screen bg-ashram-cream dark:bg-darkAshram-bg text-ashram-charcoal dark:text-darkAshram-text transition-colors duration-300 flex flex-col">
      <Navbar onOpenContributeModal={() => setIsContributeModalOpen(true)} />
      
      {/* Spacer for fixed navbar */}
      <div className="pt-24 lg:pt-28" />

      <main className="flex-grow">
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fadeIn">
            <span className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-ashram-saffron dark:text-amber-400 font-bold mb-4 px-4 py-1.5 rounded-full bg-ashram-saffron/8 dark:bg-amber-900/20 border border-ashram-saffron/20 dark:border-amber-700/30">
              <Sparkles className="w-3 h-3" /> Visual Journey
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-ashram-green dark:text-darkAshram-gold leading-tight mb-6">
              Ashram Gallery
            </h1>
            <p className="text-ashram-charcoal/80 dark:text-darkAshram-muted text-lg">
              Explore the beauty, serenity, and vibrant life at Vatsalya Vatika through our curated collection of moments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-ashram-green to-emerald-600 text-white border-transparent shadow-lg shadow-emerald-900/20 scale-105'
                    : 'bg-white dark:bg-darkAshram-card text-ashram-charcoal dark:text-darkAshram-text border-ashram-border dark:border-darkAshram-border hover:border-ashram-green/50 hover:text-ashram-green dark:hover:text-emerald-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry/Collage Gallery Grid */}
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`rounded-3xl bg-ashram-cream/80 dark:bg-darkAshram-card/80 animate-pulse border border-ashram-border/50 ${i % 2 === 0 ? 'h-64' : 'h-96'} w-full`} />
              ))}
            </div>
          ) : filteredGallery.length === 0 ? (
            <div className="text-center py-20 bg-white/60 dark:bg-darkAshram-card/50 rounded-3xl border border-dashed border-ashram-border dark:border-darkAshram-border backdrop-blur-sm max-w-2xl mx-auto">
              <ImageIcon className="w-12 h-12 text-ashram-muted/30 mx-auto mb-4" />
              <p className="font-sans text-ashram-muted dark:text-darkAshram-muted font-medium">No gallery images found in this category.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 animate-fadeIn" style={{ animationDelay: '200ms' }}>
              {filteredGallery.map((item, idx) => (
                <div
                  key={item._id}
                  onClick={() => openLightbox(idx)}
                  className="relative rounded-3xl overflow-hidden border border-white/50 dark:border-darkAshram-border/50 shadow-lg hover:shadow-2xl dark:hover:shadow-dark-xl group cursor-pointer transition-all duration-500 hover:-translate-y-2 break-inside-avoid w-full"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider bg-ashram-saffron w-fit px-3 py-1 rounded-full text-white mb-3 shadow">
                      {item.category}
                    </span>
                    <h3 className="font-heading font-bold text-xl leading-snug mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-white/80 font-medium">
                      <ZoomIn className="w-4 h-4" />
                      <span>View Full Image</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 select-none animate-fadeIn"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 backdrop-blur-sm">
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-6xl max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredGallery[lightboxIndex].image}
              alt={filteredGallery[lightboxIndex].title}
              className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-6 text-center text-white max-w-2xl px-4">
              <h3 className="font-heading font-black text-3xl text-white tracking-wide">
                {filteredGallery[lightboxIndex].title}
              </h3>
              {filteredGallery[lightboxIndex].description && (
                <p className="text-lg text-white/80 mt-3 font-sans leading-relaxed">
                  {filteredGallery[lightboxIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <ContributeModal isOpen={isContributeModalOpen} onClose={() => setIsContributeModalOpen(false)} />
      <Footer />
    </div>
  );
};
