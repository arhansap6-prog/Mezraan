import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Crown, Wind, Droplets, Sun, Flame } from 'lucide-react';

interface NoteLayer {
  level: string;
  timeframe: string;
  description: string;
  notes: string[];
  color: string;
  icon: any;
}

export const FragranceNotesPyramid: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<number>(0);

  const layers: NoteLayer[] = [
    {
      level: 'TOP NOTES (HEAD)',
      timeframe: 'First 15-30 Minutes',
      description: 'The exhilarating opening burst that creates the first unforgettable sensory greeting.',
      notes: ['Calabrian Bergamot', 'Kashmiri Saffron', 'Pink Pepper', 'Sweet Mandarin', 'Fresh Lavender'],
      color: 'from-amber-400 to-yellow-300',
      icon: Sun,
    },
    {
      level: 'HEART NOTES (SOUL)',
      timeframe: '2 to 6 Hours',
      description: 'The voluptuous core personality of the fragrance that blossoms with body warmth.',
      notes: ['Taif Rose Nectar', 'French Jasmine Sambac', 'Nutmeg Spice', 'Orris Butter', 'Cardamom Pods'],
      color: 'from-amber-500 to-amber-700',
      icon: Droplets,
    },
    {
      level: 'BASE NOTES (DEPTH)',
      timeframe: '8 to 24+ Hours Longevity',
      description: 'The deep lingering royal sillage that adheres to clothes and skin into the next day.',
      notes: ['Royal Assam Oudh', 'Warm Ambergris', 'Smoky Leather', 'Madagascar Bourbon Vanilla', 'White Musk'],
      color: 'from-yellow-600 to-amber-900',
      icon: Flame,
    },
  ];

  return (
    <div className="rounded-3xl border border-amber-500/30 bg-[#0e0e0e] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center space-y-2 mb-8 relative z-10">
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-amber-400 font-bold block">
          OLFACTORY ARTISTRY &amp; MASTER BLENDS
        </span>
        <h3 className="font-serif text-2xl sm:text-4xl text-white uppercase tracking-wider font-normal">
          The Anatomy of an Extraordinarily Long-Lasting Fragrance
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-light">
          Every Mezraan Perfume creation is compounded at high oil concentration to evolve harmoniously across hours.
        </p>
      </div>

      {/* Layer Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8 relative z-10">
        {layers.map((layer, idx) => {
          const Icon = layer.icon;
          const isActive = activeLevel === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveLevel(idx)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                isActive
                  ? 'bg-neutral-900/90 border-amber-400 shadow-[0_0_25px_rgba(217,163,55,0.2)]'
                  : 'bg-black/60 border-neutral-800 hover:border-neutral-700 text-neutral-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${isActive ? 'text-amber-300' : 'text-neutral-500'}`}>
                  {layer.timeframe}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-neutral-600'}`} />
              </div>
              <h4 className={`font-serif text-sm uppercase font-bold ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                {layer.level}
              </h4>
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-b-2xl"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Layer Details */}
      <div className="bg-neutral-900/80 border border-amber-500/20 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto relative z-10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
              ACTIVE STAGE • {layers[activeLevel].timeframe}
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-wide">
              {layers[activeLevel].level}
            </h4>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm">
            {layers[activeLevel].description}
          </p>
        </div>

        <div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold block mb-3">
            DISTINGUISHED INGREDIENTS IN THIS ACCORD:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {layers[activeLevel].notes.map((note, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-full bg-black/80 border border-amber-400/40 text-amber-200 text-xs font-mono font-medium tracking-wide shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{note}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
