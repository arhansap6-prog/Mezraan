import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Home, Compass, ShoppingBag, User, MessageCircle, ShieldCheck } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPage, setCurrentPage, cart, settings, isAdminLoggedIn } = useStore();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const rawNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788993123';
  const whatsappNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;

  const navButtons = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: Compass },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, badge: cartCount },
    { id: 'dashboard', label: 'Account', icon: User },
    ...(isAdminLoggedIn ? [{ id: 'admin-dashboard', label: 'Admin', icon: ShieldCheck }] : []),
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#0c0c0c]/95 backdrop-blur-md border-t border-amber-500/30 z-40 px-3 py-2 shadow-[0_-5px_25px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navButtons.map((btn) => {
          const Icon = btn.icon;
          const isActive = currentPage === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setCurrentPage(btn.id)}
              className={`flex flex-col items-center justify-center relative py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-amber-400 font-bold scale-105' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4] text-amber-400' : 'stroke-[1.8]'}`} />
                {btn.badge !== undefined && btn.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-neutral-950 font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-black shadow-xs">
                    {btn.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-wider uppercase mt-1">
                {btn.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-0.5 shadow-[0_0_8px_#f59e0b]" />
              )}
            </button>
          );
        })}

        {/* WhatsApp Quick Direct Link */}
        <a
          href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello ${settings.brandName || "MEZRAAN PERFUME"}, I want to place an order.`)}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1 px-3 text-emerald-400 hover:text-emerald-300 transition-all"
        >
          <MessageCircle className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] tracking-wider uppercase mt-1 font-semibold">
            Chat
          </span>
        </a>
      </div>
    </div>
  );
};
