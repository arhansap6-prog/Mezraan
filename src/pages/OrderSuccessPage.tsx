import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, ShoppingBag, MessageCircle } from 'lucide-react';
import { AmBrandEmblem } from '../components/brand/AmBrandEmblem';

export const OrderSuccessPage: React.FC = () => {
  const { pageParams, setCurrentPage, orders, settings } = useStore();

  const orderId = pageParams?.orderId;
  const order = orders.find((o) => o.id === orderId || o.orderId === orderId) || pageParams?.order;
  const whatsappUrl = pageParams?.whatsappUrl;

  const brand = settings.brandName || "MEZRAAN PERFUME";
  const rawNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788993123';
  const whatsappTarget = rawNum.length === 10 ? `91${rawNum}` : rawNum;

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 font-sans selection:bg-amber-300 selection:text-neutral-950">
      
      {/* Confirmation Card */}
      <div className="bg-white border border-neutral-200 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-xl relative overflow-hidden">
        
        {whatsappUrl && (
          <div className="absolute top-0 left-0 w-full bg-emerald-600 text-white py-2 text-[10px] font-black tracking-[0.2em] uppercase">
            Order Dispatched to WhatsApp Concierge
          </div>
        )}

        <div className="pt-2 flex justify-center">
          <AmBrandEmblem size="sm" showSubtitle={false} interactive={false} />
        </div>

        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 border border-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs text-amber-700 uppercase tracking-[0.25em] font-mono font-bold block">
            ORDER INITIATED SUCCESSFULLY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-neutral-900">
            Thank You For Choosing {brand}!
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto font-light">
            Your fragrance selection has been logged. Our concierge in Berhampur, Odisha is ready to confirm your express delivery.
          </p>
        </div>

        {orderId && (
          <div className="inline-block bg-[#FAF8F5] border border-neutral-300 px-6 py-2.5 rounded-full font-mono text-xs text-neutral-900 font-bold">
            Order Reference: #{orderId}
          </div>
        )}

        {/* WhatsApp Redirection Button */}
        {whatsappUrl && (
          <div className="pt-2 max-w-md mx-auto space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>SEND ORDER DETAILS ON WHATSAPP</span>
            </a>
            <p className="text-[11px] text-neutral-500 font-mono">
              Click above to send the pre-formatted order directly to our Berhampur showroom (+91 {rawNum}).
            </p>
          </div>
        )}

        {/* Summary Details if available */}
        {order && (
          <div className="border-t border-neutral-200 pt-6 text-left max-w-lg mx-auto space-y-3 text-xs">
            <h4 className="font-serif font-bold text-neutral-900 text-sm">Order Information</h4>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-neutral-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Recipient:</span>
                <span className="font-medium text-neutral-900">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">WhatsApp / Phone:</span>
                <span className="font-medium text-neutral-900 font-mono">{order.customerMobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Amount:</span>
                <span className="font-bold text-neutral-950 font-serif text-sm">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer border border-amber-500/30"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => setCurrentPage('customer-dashboard')}
            className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer border border-neutral-300"
          >
            View My Orders
          </button>
        </div>

      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-1">
          <Package className="w-5 h-5 text-amber-700 mx-auto" />
          <h4 className="font-serif font-bold text-neutral-900 text-xs uppercase">Shockproof Packing</h4>
          <p className="text-[11px] text-neutral-500">Multilayer tamper-evident cushioning</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-1">
          <Truck className="w-5 h-5 text-amber-700 mx-auto" />
          <h4 className="font-serif font-bold text-neutral-900 text-xs uppercase">Express Pan-India</h4>
          <p className="text-[11px] text-neutral-500">Dispatched from Berhampur, Odisha</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-1">
          <ShieldCheck className="w-5 h-5 text-amber-700 mx-auto" />
          <h4 className="font-serif font-bold text-neutral-900 text-xs uppercase">100% Authentic</h4>
          <p className="text-[11px] text-neutral-500">Pure non-alcoholic attars &amp; French EDPs</p>
        </div>
      </div>

    </div>
  );
};
