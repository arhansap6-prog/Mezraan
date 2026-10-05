import React from 'react';
import { useStore } from '../context/StoreContext';
import { WholesaleEnquiryForm } from '../components/forms/WholesaleEnquiryForm';
import { Sparkles, Package, Truck, ShieldCheck, Phone, MessageSquare, Crown, Gift, Award } from 'lucide-react';

export const WholesalePage: React.FC = () => {
  const { settings } = useStore();
  const whatsappNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788993123';
  const primaryPhone = settings.contactPhone || '7788993123';
  const brand = settings.brandName || "MEZRAAN PERFUME";

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans selection:bg-amber-300 selection:text-neutral-950">
      {/* Top Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] font-mono font-bold text-amber-700 block">
          DIRECT WHOLESALE &amp; BULK SUPPLY • BERHAMPUR, ODISHA
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight uppercase">
          Wholesale Supply &amp; Bulk Orders
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
          {brand} supplies perfume boutiques, retailers, wedding planners, and corporate organizations across India with premium alcohol-free attars, long-lasting luxury perfumes, handcrafted agarbatti, and royal bakhoor.
        </p>
      </div>

      {/* Feature Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-md space-y-2">
          <Package className="w-6 h-6 text-amber-700" />
          <h3 className="font-serif font-bold text-neutral-900 text-base">Bulk Tolas &amp; Litres</h3>
          <p className="text-xs text-neutral-600">
            Pure concentrated perfume oils available in 50g, 100g, 500g and 1kg aluminium bottles.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-md space-y-2">
          <Sparkles className="w-6 h-6 text-amber-700" />
          <h3 className="font-serif font-bold text-neutral-900 text-base">Bakhoor &amp; Agarbatti</h3>
          <p className="text-xs text-neutral-600">
            Direct wholesale rates for handcrafted agarbatti sticks, oud bakhoor chips and incense burners.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-md space-y-2">
          <Truck className="w-6 h-6 text-amber-700" />
          <h3 className="font-serif font-bold text-neutral-900 text-base">Express Pan-India Logistics</h3>
          <p className="text-xs text-neutral-600">
            Secure insured shipping to all states across India with door-step courier delivery.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-md space-y-2">
          <Award className="w-6 h-6 text-amber-700" />
          <h3 className="font-serif font-bold text-neutral-900 text-base">Unmatched Wholesale Pricing</h3>
          <p className="text-xs text-neutral-600">
            Direct pricing from {brand} Berhampur boutique.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto">
        <WholesaleEnquiryForm standalone />
      </div>
    </div>
  );
};
