import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Compass, Phone, MessageSquare, Clock, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface ShowroomMapProps {
  className?: string;
  showDetails?: boolean;
}

export const ShowroomMap: React.FC<ShowroomMapProps> = ({ className = '', showDetails = true }) => {
  const { settings } = useStore();
  const [mapMode, setMapMode] = useState<'luxury-dark' | 'satellite'>('luxury-dark');
  const [userCity, setUserCity] = useState('');
  const [calculatedDistance, setCalculatedDistance] = useState<string | null>(null);

  const brand = settings.brandName || 'MEZRAAN PERFUME';
  const address = settings.contactAddress || 'BERHAMPUR,odisha';
  const whatsappNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788993123';
  const phone = settings.contactPhone || '7788993123';

  const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent('Berhampur, Ganjam, Odisha')}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent('Berhampur, Ganjam, Odisha')}&t=${mapMode === 'satellite' ? 'k' : 'm'}&z=15&ie=UTF8&iwloc=&output=embed`;

  const handleCalculateDistance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCity.trim()) return;
    const city = userCity.trim().toLowerCase();
    let eta = '3-4 Days Express Air Dispatch';
    let km = '850 km';
    if (city.includes('bhubaneswar') || city.includes('cuttack') || city.includes('puri')) {
      eta = 'Same Day / Next Day Express Dispatch';
      km = '165 km';
    } else if (city.includes('delhi') || city.includes('mumbai') || city.includes('bangalore') || city.includes('hyderabad') || city.includes('chennai')) {
      eta = '2-3 Days Pan-India Air Courier';
      km = '1,150 km';
    } else if (city.includes('kolkata')) {
      eta = '1-2 Days Express Logistics';
      km = '600 km';
    }
    setCalculatedDistance(`📍 Dispatch from Berhampur, Odisha to ${userCity}: Approx. ${km} • ${eta}`);
  };

  return (
    <div className={`rounded-3xl border border-amber-500/30 bg-[#0e0e0e] shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden ${className}`}>
      {/* Top Header Bar */}
      <div className="p-5 sm:p-6 border-b border-amber-500/20 bg-gradient-to-r from-[#141414] via-[#101010] to-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-widest font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>SHOWROOM OPEN NOW</span>
            </span>
            <span className="text-[10px] font-mono tracking-wider text-amber-400 uppercase font-semibold">
              📍 BERHAMPUR, ODISHA
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-tight">
            {brand} Boutique &amp; Showroom
          </h3>
          <p className="text-xs text-neutral-400">
            {address} • Pan-India Express Shipping &amp; Boutique Walk-in Experience
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setMapMode(mapMode === 'luxury-dark' ? 'satellite' : 'luxury-dark')}
            className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-neutral-900 hover:bg-neutral-800 text-amber-300 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>{mapMode === 'luxury-dark' ? '🛰️ Satellite' : '🗺️ Map View'}</span>
          </button>
          
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 fill-current" />
            <span>GET DIRECTIONS</span>
          </a>
        </div>
      </div>

      {/* Interactive Map Area with Animated Radar Marker */}
      <div className="relative w-full h-[320px] sm:h-[400px] bg-[#0a0a0a] overflow-hidden">
        <iframe
          title={`${brand} Showroom Location Map`}
          src={embedUrl}
          className="w-full h-full border-0 filter contrast-125 opacity-80"
          loading="lazy"
        />

        {/* Ambient Dark Gradient Overlays to seamlessly blend into black theme */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0e0e0e] via-transparent to-black/30" />
        <div className="absolute inset-y-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-[#0e0e0e] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-8 pointer-events-none bg-gradient-to-l from-[#0e0e0e] to-transparent" />

        {/* Floating Animated Radar Marker overlay in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center">
          {/* Pulsating animated sonar rings */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 2.4, 3], opacity: [0.8, 0.4, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
              className="absolute w-12 h-12 rounded-full bg-amber-400/30 border border-amber-300"
            />
            <motion.div
              animate={{ scale: [1, 1.8, 2.2], opacity: [0.9, 0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.6, ease: 'easeOut' }}
              className="absolute w-10 h-10 rounded-full bg-amber-500/40"
            />
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-0.5 shadow-[0_0_25px_rgba(251,191,36,0.9)] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
            </div>
          </div>

          <div className="mt-2 px-3 py-1 rounded-full bg-black/90 border border-amber-400/60 shadow-xl backdrop-blur-md">
            <span className="text-[10px] font-serif font-black tracking-widest text-amber-300 uppercase whitespace-nowrap">
              {brand} SHOWROOM
            </span>
          </div>
        </div>

        {/* Floating Interactive Badge bottom left */}
        <div className="absolute bottom-4 left-4 z-20 bg-black/85 backdrop-blur-md p-3 rounded-2xl border border-amber-500/30 max-w-xs shadow-2xl space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AUTHENTIC LUXURY STORE</span>
          </div>
          <p className="text-[11px] text-neutral-200 font-medium">
            Walk-in testing counter, custom attar blends &amp; perfume sampling.
          </p>
        </div>

        {/* Floating Google Maps button bottom right */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 right-4 z-20 px-3.5 py-2 bg-neutral-900/90 hover:bg-black text-white text-[11px] font-mono uppercase font-bold rounded-xl border border-neutral-700 shadow-xl backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
        </a>
      </div>

      {/* Details & Delivery Calculator Section */}
      {showDetails && (
        <div className="p-5 sm:p-8 bg-[#101010] border-t border-amber-500/20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Quick info columns (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                  SHOWROOM ADDRESS
                </span>
                <p className="text-xs text-white font-medium">
                  {address}
                </p>
                <p className="text-[10px] text-neutral-400 font-mono">
                  Berhampur, Ganjam, Odisha - India
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                  DIRECT PHONE &amp; WHATSAPP
                </span>
                <div className="flex flex-col gap-1 text-xs font-mono font-medium">
                  <a href={`tel:${phone}`} className="text-white hover:text-amber-400 transition-colors">
                    📞 +91 {phone}
                  </a>
                  <a href={`https://wa.me/91${whatsappNum}`} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    💬 WhatsApp: +91 {whatsappNum}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Walk-in Fragrance Sampling</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Non-Alcoholic Attars</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pan-India Secure Dispatch</span>
              </div>
            </div>
          </div>

          {/* Delivery ETA Checker (5 cols) */}
          <div className="lg:col-span-5 p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/20 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
              🚀 PAN-INDIA DISPATCH ESTIMATOR
            </span>
            <form onSubmit={handleCalculateDistance} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your City (e.g. Mumbai, Delhi, Cuttack)..."
                value={userCity}
                onChange={(e) => setUserCity(e.target.value)}
                className="flex-1 bg-black border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all"
              >
                CHECK ETA
              </button>
            </form>

            {calculatedDistance ? (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-mono"
              >
                {calculatedDistance}
              </motion.div>
            ) : (
              <p className="text-[10px] text-neutral-400 font-mono">
                Direct insured express couriers (BlueDart / DTDC / IndiaPost) dispatched daily from our Berhampur boutique.
              </p>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
