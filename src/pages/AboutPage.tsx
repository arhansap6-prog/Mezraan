import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Award, ShieldCheck, MapPin, Phone, MessageSquare, Sparkles, Truck, Compass, CheckCircle2, Instagram, Crown, Clock, Droplets, Flame } from 'lucide-react';
import { AmBrandEmblem } from '../components/brand/AmBrandEmblem';
import { ShowroomMap } from '../components/common/ShowroomMap';
import { FragranceNotesPyramid } from '../components/common/FragranceNotesPyramid';

export const AboutPage: React.FC = () => {
  const { setCurrentPage, settings } = useStore();

  const brandTitle = settings.brandName || "MEZRAAN PERFUME";
  const tagline = settings.brandTagline || "Pure Non-Alcoholic Attar & French Luxury Perfumes";
  const landmarkText = settings.contactAddress || "BERHAMPUR,odisha";
  const supportNum = settings.contactPhone || "7788993123";
  const rawNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || "7788993123";
  const whatsappNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;
  const instagramUrl = settings.instagramUrl || "https://www.instagram.com/mezraan01?stkn=MWlwdmkzczlvMjR6dQ==";

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 font-sans selection:bg-amber-300 selection:text-neutral-950">
      
      {/* 1. Hero Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 border-b border-neutral-300 pb-12 relative"
      >
        <div className="pt-2 flex justify-center">
          <AmBrandEmblem size="lg" showSubtitle={false} interactive={false} />
        </div>

        <span className="text-xs tracking-[0.3em] uppercase font-mono font-bold text-amber-700 block">
          OUR STORY &amp; HERITAGE • BERHAMPUR, ODISHA
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight uppercase font-bold drop-shadow-sm">
          {brandTitle}
        </h1>

        <p className="text-xs sm:text-sm text-neutral-600 tracking-[0.25em] uppercase font-mono font-medium">
          {tagline}
        </p>

        <p className="font-serif italic text-base sm:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          "Where French haute perfumery harmonizes with pure non-alcoholic Eastern attars — crafted with devotion in Berhampur, Odisha."
        </p>

        {/* Social Connect Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow Us on Instagram</span>
          </a>

          <a
            href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello ${brandTitle}, I would like to learn more about your fragrance collections.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Concierge (+91 {supportNum})</span>
          </a>
        </div>
      </motion.div>

      {/* 2. Brand Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Showcase Image Frame */}
        <div className="rounded-3xl overflow-hidden border border-neutral-300 shadow-xl bg-white p-4 relative group">
          <img
            src="/IMG-20261004-WA0098.jpg"
            alt={`${brandTitle} Artisanal Bottle`}
            className="w-full h-[360px] sm:h-[420px] object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700"
          />
          <div className="p-4 space-y-1 text-center bg-[#FAF8F5] rounded-xl mt-3 border border-neutral-200">
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              The Mezraan Olfactory Studio
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              {landmarkText}
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="space-y-6 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-amber-700 font-semibold block">
              OUR BELIEF &amp; ESSENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-neutral-900 font-bold tracking-tight">
              Crafting Divine Scent Impressions
            </h2>
          </div>

          <p className="text-neutral-700 leading-relaxed font-normal">
            <strong className="text-neutral-950 font-bold">{brandTitle}</strong> is Berhampur’s premier fragrance house, dedicated to crafting divine non-alcoholic concentrated attars, long-lasting luxury Eau de Parfum extraits, pure Arabian bakhoor, and artisanal aromatic blends.
          </p>

          <p className="text-neutral-700 leading-relaxed">
            Located in the heart of Berhampur at <strong className="text-neutral-950 font-bold">{landmarkText}</strong>, we combine time-honored traditional distillation secrets with contemporary French fragrance nuances to offer perfumes that leave an unforgettable trail.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <span className="font-serif text-2xl font-bold text-amber-700">100%</span>
              <p className="text-xs text-neutral-900 font-bold">Alcohol-Free Attars</p>
              <p className="text-[11px] text-neutral-500 leading-tight">Zero burn, skin-friendly concentrated perfume oils.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <span className="font-serif text-2xl font-bold text-amber-700">14+ Hrs</span>
              <p className="text-xs text-neutral-900 font-bold">Projection &amp; Sillage</p>
              <p className="text-[11px] text-neutral-500 leading-tight">High concentration formulations made for Indian weather.</p>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md border border-amber-500/30"
            >
              EXPLORE OUR COLLECTION →
            </button>
          </div>
        </div>
      </div>

      {/* 3. CRAFTSMANSHIP TIMELINE / 4-STEP MASTER DISTILLATION PROCESS */}
      <div className="rounded-3xl border border-neutral-300 bg-white p-8 sm:p-12 space-y-8 shadow-lg">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-amber-700 font-bold block">
            HOW WE CRAFT OUR MASTERPIECES
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-neutral-900 uppercase tracking-widest font-normal">
            The 4 Pillars of Mezraan Perfumery
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light">
            Every drop is produced with uncompromising passion and artisanal attention to detail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-neutral-200 space-y-3">
            <span className="text-xs font-mono text-amber-700 font-bold">01 / SOURCING</span>
            <h4 className="font-serif text-base text-neutral-900 font-bold">Rare Botanicals</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Kashmiri saffron, French lavender, Taif roses and aged Assam agarwood selected directly from trusted cultivators.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-neutral-200 space-y-3">
            <span className="text-xs font-mono text-amber-700 font-bold">02 / DISTILLATION</span>
            <h4 className="font-serif text-base text-neutral-900 font-bold">Traditional Deg &amp; Bhapka</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Gentle copper-still hydro-distillation capturing pure aromatic molecules without burning delicate floral notes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-neutral-200 space-y-3">
            <span className="text-xs font-mono text-amber-700 font-bold">03 / COMPOUNDING</span>
            <h4 className="font-serif text-base text-neutral-900 font-bold">French Extrait Blending</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Expertly compounded at 25%-30% high perfume oil concentration for unrivaled projection and long-lasting sillage.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-neutral-200 space-y-3">
            <span className="text-xs font-mono text-amber-700 font-bold">04 / BOTTLING</span>
            <h4 className="font-serif text-base text-neutral-900 font-bold">Berhampur Showroom</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Hand-filled, sealed, and inspected in Berhampur, Odisha before insured express dispatch across India.
            </p>
          </div>
        </div>
      </div>

      {/* 4. NEW FEATURE: OLFACTORY PYRAMID EXPLORER */}
      <div className="space-y-6">
        <FragranceNotesPyramid />
      </div>

      {/* 5. INTERACTIVE SHOWROOM MAP WITH RADAR */}
      <div className="space-y-6">
        <ShowroomMap />
      </div>

      {/* 6. CALL TO ACTION / VISIT US */}
      <div className="bg-[#141414] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
            EXPERIENCE IN PERSON • BERHAMPUR, ODISHA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
            Visit The Mezraan Boutique
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            Walk into our Berhampur showroom for private fragrance testing, bespoke layering sessions, and pure non-alcoholic attar sampling.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold text-xs uppercase tracking-widest rounded-xl hover:from-amber-400 transition-all cursor-pointer shadow-lg"
          >
            SHOWROOM DIRECTIONS &amp; HOURS
          </button>
          <a
            href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello ${brandTitle}, I want to plan a visit to your Berhampur showroom.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
          >
            MESSAGE ON WHATSAPP
          </a>
        </div>
      </div>

    </div>
  );
};
