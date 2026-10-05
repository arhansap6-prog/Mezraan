import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, MessageSquare, ShieldCheck, Truck, Sparkles, Instagram, Award, Navigation } from 'lucide-react';
import { AmBrandEmblem } from '../brand/AmBrandEmblem';

export const Footer: React.FC = () => {
  const { setCurrentPage, settings } = useStore();

  const brand = settings.brandName || "MEZRAAN PERFUME";
  const tagline = settings.brandTagline || "Pure Non-Alcoholic Attar & French Luxury Perfumes";
  const address = settings.contactAddress || "BERHAMPUR,odisha";
  const phone = settings.contactPhone || "7788993123";
  const rawNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || "7788993123";
  const whatsappTarget = rawNum.length === 10 ? `91${rawNum}` : rawNum;
  const instagramUrl = settings.instagramUrl || "https://www.instagram.com/mezraan01?stkn=MWlwdmkzczlvMjR6dQ==";

  return (
    <footer className="bg-[#0a0a0a] text-neutral-300 border-t border-amber-500/20 pt-16 pb-24 lg:pb-12 font-sans relative overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* USPs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-12 mb-12 border-b border-neutral-800">
          <div className="flex items-start gap-3 bg-[#111111] p-4 rounded-2xl border border-amber-500/10">
            <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white font-serif font-bold mb-1">
                Luxury Perfumes (EDP)
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                French extraits &amp; concentrated attars crafted for refined gentlemen.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#111111] p-4 rounded-2xl border border-amber-500/10">
            <Truck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white font-serif font-bold mb-1">
                Pan-India Delivery 🇮🇳
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Securely packed &amp; dispatched from Berhampur, Odisha across India.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#111111] p-4 rounded-2xl border border-amber-500/10">
            <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white font-serif font-bold mb-1">
                100% Pure Attars
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Alcohol-free long-lasting formulations without skin irritation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#111111] p-4 rounded-2xl border border-amber-500/10">
            <MessageSquare className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white font-serif font-bold mb-1">
                WhatsApp Orders
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Instant concierge support on +91 {phone}.
              </p>
            </div>
          </div>
        </div>

        {/* Core Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <AmBrandEmblem size="sm" showSubtitle={false} />
              <div>
                <h3 className="font-serif text-xl tracking-[0.12em] text-white uppercase font-bold">
                  {brand}
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-amber-400 uppercase font-semibold">
                  {tagline}
                </p>
                <p className="text-[10px] text-neutral-400 font-medium">
                  By {settings.ownerName || "Mezraan Perfume"} • Berhampur, Odisha
                </p>
              </div>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {settings.aboutText?.split('\n\n')[0] || "Berhampur’s premier fragrance destination creating masterpieces in luxury perfumes, pure alcohol-free attars, and royal fragrances."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${whatsappTarget}?text=${encodeURIComponent(`Hello ${brand}, I want to explore and order your luxury perfumes.`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors text-xs font-semibold shadow-md cursor-pointer"
                title="WhatsApp Us"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp (+91 {phone})</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white transition-opacity text-xs font-semibold shadow-md cursor-pointer"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-amber-400 font-serif font-bold mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  All Perfumes &amp; Attars
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('collections')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Bakhoor &amp; Agarbatti
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  About Our Brand
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Visit Berhampur Showroom
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('wholesale')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Wholesale Enquiry
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('admin')} className="hover:text-amber-400 font-semibold transition-colors flex items-center gap-1 cursor-pointer">
                  <span>🔐</span> Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-amber-400 font-serif font-bold mb-4">
              SPECIALTIES
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setCurrentPage('shop', { search: 'Attar' })} className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Pure Non-Alcoholic Attar</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop', { search: 'Perfume' })} className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Luxury Perfumes (EDP)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop', { search: 'Agarbatti' })} className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Handcrafted Agarbatti</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop', { search: 'Bakhoor' })} className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Royal Arabian Bakhoor</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop', { search: 'Gold' })} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Royal Gold Masterpiece
                </button>
              </li>
            </ul>
          </div>

          {/* Store Address & Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-amber-400 font-serif font-bold mb-4">
              BERHAMPUR SHOWROOM
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">
                  {address}
                </span>
              </div>
              <div className="space-y-1.5 pt-1 font-mono">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <a href={`tel:${phone}`} className="hover:text-amber-300 transition-colors font-medium text-white">
                    Call: +91 {phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="text-emerald-400 font-bold">💬</span>
                  <a href={`https://wa.me/${whatsappTarget}`} target="_blank" rel="noreferrer" className="hover:text-emerald-300 transition-colors text-emerald-400 font-semibold">
                    WhatsApp: +91 {phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <Instagram className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition-colors text-neutral-300 font-semibold">
                    Instagram Connect
                  </a>
                </div>
              </div>
              <div className="pt-2 border-t border-neutral-800 text-[11px]">
                <span className="font-semibold text-neutral-400 block">Showroom Hours:</span>
                <span className="text-amber-300 font-medium">Monday – Sunday: 10:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© 2026 {brand}. All Rights Reserved.</p>
          
          <button
            onClick={() => {
              if (window.confirm("🔄 Click OK to clear browser cache and reload the latest deployed version instantly!")) {
                localStorage.removeItem('aaf_cached_products');
                localStorage.removeItem('aaf_deleted_prods');
                window.location.href = window.location.pathname + '?v=' + Date.now() + '#home';
                window.location.reload();
              }
            }}
            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-amber-500/30 text-amber-300 font-bold rounded-lg shadow-sm transition-all text-[10px] uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
            title="Click to force update if changes are not showing on Google"
          >
            <span>🔄 Reload Latest Version</span>
          </button>

          <div className="flex items-center gap-4 text-neutral-400 uppercase font-mono">
            <span>PAN-INDIA DISPATCH 🇮🇳</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">BERHAMPUR, ODISHA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
