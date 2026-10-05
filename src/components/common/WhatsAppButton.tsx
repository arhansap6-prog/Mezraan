import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface WhatsAppButtonProps {
  message?: string;
  floating?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message,
  floating = true,
}) => {
  const { settings } = useStore();
  
  const brand = settings.brandName || "MEZRAAN PERFUME";
  const rawNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788993123';
  const cleanNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;
  const defaultMsg = message || `Hello ${brand}, I would like to enquire about your perfumes, attars, agarbatti and bakhoor.`;
  const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(defaultMsg)}`;
  const instagramUrl = settings.instagramUrl || "https://www.instagram.com/mezraan01?stkn=MWlwdmkzczlvMjR6dQ==";

  if (!floating) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl uppercase tracking-widest transition-all shadow-lg cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>WhatsApp Order &amp; Enquiry</span>
        </a>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold text-xs rounded-xl uppercase tracking-widest transition-all shadow-lg cursor-pointer"
        >
          <Instagram className="w-4 h-4 text-white" />
          <span>Follow on Instagram</span>
        </a>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-3.5 sm:right-5 z-40 flex flex-col items-center gap-2.5 sm:gap-3">
      {/* Floating Instagram Button */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Mezraan Perfume on Instagram"
        className="w-11 h-11 sm:w-13 sm:h-13 bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 hover:scale-110 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(236,72,153,0.5)] hover:shadow-2xl transition-all border-2 border-amber-300/80 group cursor-pointer"
        title="Follow Mezraan Perfume on Instagram"
      >
        <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.3]" />
        <span className="absolute right-14 sm:right-16 bg-neutral-950 text-amber-300 text-[11px] sm:text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-amber-500/40 font-mono font-medium tracking-wide">
          Instagram: Mezraan Perfume
        </span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Mezraan Perfume on WhatsApp"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-emerald-600 to-teal-500 hover:scale-110 text-white rounded-full flex items-center justify-center shadow-[0_4px_25px_rgba(16,185,129,0.5)] hover:shadow-2xl transition-all border-2 border-amber-300/80 group cursor-pointer relative"
        title="Chat on WhatsApp (+91 7788993123)"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.3]" />
        
        {/* Pulsing indicator */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-black flex items-center justify-center animate-pulse" />

        {/* Tooltip on hover */}
        <span className="absolute right-16 sm:right-18 bg-neutral-950 text-white text-[11px] sm:text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-amber-500/40 font-mono font-medium tracking-wide">
          WhatsApp: +91 {rawNum}
        </span>
      </a>
    </div>
  );
};
