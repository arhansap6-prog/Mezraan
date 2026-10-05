import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Compass, Truck, Clock, Phone, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const BerhampurMapAnimation: React.FC = () => {
  const { settings } = useStore();
  const [activeRoute, setActiveRoute] = useState<number | null>(null);

  const brand = settings.brandName || 'MEZRAAN PERFUME';
  const whatsapp = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788993123';
  const address = settings.contactAddress || 'BERHAMPUR,odisha';

  const routes = [
    { destination: 'Bhubaneswar / Cuttack', time: '24 Hours', distance: '165 km', highlight: 'Express Next-Day' },
    { destination: 'Kolkata / Eastern Hub', time: '24-48 Hours', distance: '600 km', highlight: 'Air Cargo' },
    { destination: 'Hyderabad & Vizag', time: '48 Hours', distance: '620 km', highlight: 'Priority Express' },
    { destination: 'Delhi NCR & North', time: '2-3 Days', distance: '1,450 km', highlight: 'Shockproof Pack' },
    { destination: 'Mumbai & Western India', time: '2-3 Days', distance: '1,520 km', highlight: 'Premium Seal' },
    { destination: 'Bengaluru & South India', time: '2-3 Days', distance: '1,100 km', highlight: 'Fragrance Shield' },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#121212] via-[#0e0e0e] to-[#080808] p-6 sm:p-10 shadow-2xl text-white">
      {/* Golden Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center space-y-3 max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-[11px] font-mono tracking-widest uppercase">
          <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>BOUTIQUE LOCATION &amp; PAN-INDIA RADAR</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
          {brand} <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">Hub</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
          Crafted in the Silk City of <strong className="text-amber-300">BERHAMPUR, Odisha</strong> — dispatched directly with multi-layer tamperproof packaging to every PIN code across India.
        </p>
      </div>

      {/* Main Grid: Interactive Map Visualizer + Showroom Details */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Animated Map Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-[#050505] rounded-2xl border border-amber-500/25 p-5 sm:p-7 relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE DISPATCH NETWORK: ACTIVE</span>
            </div>
            <span className="text-neutral-400 text-[11px]">LAT: 19.3150° N • LONG: 84.7941° E</span>
          </div>

          {/* Stylized SVG Map of India with Animated Radar radiating from Berhampur */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#040404] border border-neutral-800/80 flex items-center justify-center p-2">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />

            <svg viewBox="0 0 500 400" className="w-full h-full max-h-[360px] select-none">
              <defs>
                {/* Gold Glow Filter */}
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* India Outline Silhouette (Stylized) */}
              <path
                d="M 230 40 L 265 65 L 290 90 L 320 120 L 360 145 L 390 140 L 415 160 L 390 185 L 350 180 L 330 205 L 315 220 L 300 240 L 285 275 L 270 310 L 250 350 L 245 365 L 235 345 L 220 310 L 200 280 L 175 255 L 160 220 L 165 195 L 140 185 L 145 160 L 170 145 L 195 125 L 210 90 Z"
                fill="none"
                stroke="#2a2416"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Animated Routes radiating from Berhampur (X: 305, Y: 220) */}
              {/* Route to Delhi (220, 110) */}
              <path d="M 305 220 Q 260 160 220 110" fill="none" stroke="url(#routeGradient)" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
              {/* Route to Mumbai (175, 235) */}
              <path d="M 305 220 Q 240 230 175 235" fill="none" stroke="url(#routeGradient)" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
              {/* Route to Kolkata (355, 175) */}
              <path d="M 305 220 Q 330 200 355 175" fill="none" stroke="url(#routeGradient)" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
              {/* Route to Bengaluru (230, 310) */}
              <path d="M 305 220 Q 265 265 230 310" fill="none" stroke="url(#routeGradient)" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
              {/* Route to Chennai (255, 290) */}
              <path d="M 305 220 Q 280 255 255 290" fill="none" stroke="url(#routeGradient)" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
              {/* Route to Hyderabad (245, 240) */}
              <path d="M 305 220 Q 275 230 245 240" fill="none" stroke="url(#routeGradient)" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />

              {/* Target City Dots */}
              {[
                { name: 'DELHI', x: 220, y: 110 },
                { name: 'KOLKATA', x: 355, y: 175 },
                { name: 'MUMBAI', x: 175, y: 235 },
                { name: 'HYDERABAD', x: 245, y: 240 },
                { name: 'CHENNAI', x: 255, y: 290 },
                { name: 'BENGALURU', x: 230, y: 310 },
              ].map((city, idx) => (
                <g key={idx}>
                  <circle cx={city.x} cy={city.y} r="3.5" fill="#f59e0b" opacity="0.8" />
                  <text x={city.x + 6} y={city.y + 4} fill="#a3a3a3" fontSize="9" fontFamily="monospace">
                    {city.name}
                  </text>
                </g>
              ))}

              {/* BERHAMPUR - Main Hub Pin with Radar Waves */}
              {/* Radar Wave 1 */}
              <circle cx="305" cy="220" r="14" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.6">
                <animate attributeName="r" values="6;35" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
              </circle>
              {/* Radar Wave 2 */}
              <circle cx="305" cy="220" r="22" fill="none" stroke="#f59e0b" strokeWidth="1.2" opacity="0.4">
                <animate attributeName="r" values="10;50" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
              </circle>

              {/* Central Glowing Gold Pin on Berhampur */}
              <circle cx="305" cy="220" r="6" fill="#fbbf24" filter="url(#goldGlow)" />
              <circle cx="305" cy="220" r="2.5" fill="#000000" />

              {/* Berhampur Callout Badge */}
              <g transform="translate(315, 210)">
                <rect x="0" y="-14" width="130" height="22" rx="6" fill="#18140c" stroke="#d4af37" strokeWidth="1.2" />
                <text x="8" y="1" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  📍 BERHAMPUR (HUB)
                </text>
              </g>
            </svg>

            {/* Bottom floating badge */}
            <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/30 flex items-center gap-2 text-[10px] text-amber-300 font-mono">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Pan-India Air &amp; Surface Express Dispatched Daily</span>
            </div>
          </div>

          {/* Delivery Timings Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 text-xs font-mono">
            {routes.slice(0, 3).map((r, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveRoute(i)}
                onMouseLeave={() => setActiveRoute(null)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  activeRoute === i ? 'bg-amber-500/15 border-amber-400 text-white' : 'bg-neutral-900/60 border-neutral-800 text-neutral-300'
                }`}
              >
                <div className="text-[10px] text-amber-400 font-bold">{r.destination}</div>
                <div className="text-white font-semibold flex items-center justify-between mt-0.5">
                  <span>⏱ {r.time}</span>
                  <span className="text-[9px] text-neutral-400 font-sans">{r.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Showroom Visit & Direct Action Card (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-[#121212] p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-semibold block">
              FLAGSHIP BOUTIQUE
            </span>
            <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
              Visit Our Berhampur Showroom
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Experience authentic artisanal attars, master-compounded French perfumes, and royal Arabian bakhoor in person.
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs text-neutral-200">
            <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/25 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Boutique Address:</strong>
                <span className="text-amber-200 font-mono text-sm block mt-0.5">{address}</span>
                <span className="text-[10px] text-neutral-400 block mt-1">Silk City • Ganjam District, Odisha - India</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-black/40 border border-neutral-800 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-400 block">STORE HOURS</span>
                  <span className="text-white font-bold text-[11px]">10:30 AM – 9:30 PM</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-neutral-800 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-400 block">DAYS OPEN</span>
                  <span className="text-white font-bold text-[11px]">All 7 Days Open</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] text-neutral-400 block">CALL / WHATSAPP</span>
                  <span className="text-white font-mono font-bold text-sm">+91 {whatsapp}</span>
                </div>
              </div>
              <span className="text-[9px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40 font-mono">
                INSTANT
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2.5">
            <a
              href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(`Hello ${brand}, I would like directions to your Berhampur showroom and want to enquire about perfumes.`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <span>💬 WhatsApp Concierge (+91 {whatsapp})</span>
            </a>

            <a
              href="https://maps.google.com/?q=Berhampur+Ganjam+Odisha"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-amber-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
