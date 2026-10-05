import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    setCurrentPage,
    settings,
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const result = applyCoupon(couponCodeInput.trim());
    setCouponMessage({ text: result.message, success: result.success });
    if (result.success) {
      setCouponCodeInput('');
    }
  };

  const brand = settings.brandName || "MEZRAAN PERFUME";
  const rawNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788993123';
  const whatsappNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 relative overflow-hidden rounded-3xl max-w-4xl mx-auto my-10 border border-amber-500/20 shadow-2xl">
        {/* User uploaded empty cart background image preserved */}
        <div className="absolute inset-0 z-0">
          <img
            src="/empty_cart_bg.jpg?v=2.0"
            alt="Empty Cart background"
            className="w-full h-full object-cover object-center filter saturate-125"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-md mx-auto p-8 rounded-3xl bg-black/85 backdrop-blur-md border border-amber-500/30 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
              Your Cart is Empty
            </h2>
            <p className="text-xs text-neutral-300">
              Discover divine attars and luxury French perfumes crafted with devotion by {brand}.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-neutral-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
          >
            <span>START DISCOVERING</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FAF7F2] text-[#1A1A1A] font-sans selection:bg-amber-300 selection:text-neutral-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-300 pb-4">
        <div>
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest font-mono block">
            {brand} • BERHAMPUR, ODISHA
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900">
            Shopping Cart ({cart.reduce((t, i) => t + i.quantity, 0)} Items)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:text-red-700 font-medium underline uppercase tracking-wider self-start sm:self-auto cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const effectivePrice = item.selectedSalePrice || item.selectedPrice || item.product.salePrice || item.product.price;
            return (
              <div
                key={`${item.product.id}-${item.selectedVolume || 'default'}`}
                className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-md flex flex-col sm:flex-row items-center gap-4 sm:gap-6 group"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => setCurrentPage('product-detail', { productId: item.product.id })}
                  className="w-20 h-24 sm:w-24 sm:h-28 bg-[#FAF8F5] border border-neutral-200 rounded-2xl overflow-hidden shrink-0 cursor-pointer p-2 flex items-center justify-center"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left space-y-1 w-full">
                  <span className="text-[10px] text-amber-700 uppercase tracking-widest font-mono font-semibold">
                    {item.product.category}
                  </span>
                  <h3
                    onClick={() => setCurrentPage('product-detail', { productId: item.product.id })}
                    className="font-serif text-lg font-bold text-neutral-900 hover:text-amber-700 transition-colors cursor-pointer"
                  >
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    {item.selectedVolume || item.product.volume}
                  </p>
                  <div className="text-sm font-semibold text-neutral-950 pt-1 font-serif">
                    ₹{effectivePrice.toLocaleString('en-IN')}
                    {item.product.salePrice && (
                      <span className="text-xs text-neutral-400 line-through ml-2 font-mono">
                        ₹{item.product.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center border border-neutral-300 rounded-xl bg-[#FAF8F5] p-1">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-mono font-bold text-neutral-900">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-2 flex justify-between items-center text-xs">
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-amber-700 hover:text-neutral-950 font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>← Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Order Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xl space-y-6">
            <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-3">
              Order Summary
            </h2>

            {/* Calculations */}
            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-bold text-neutral-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({appliedCoupon?.code}):</span>
                  <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Pan-India Delivery:</span>
                <span className={cartDeliveryFee === 0 ? 'text-emerald-600 font-bold' : 'font-bold text-neutral-900'}>
                  {cartDeliveryFee === 0 ? 'FREE EXPRESS' : `₹${cartDeliveryFee}`}
                </span>
              </div>

              {cartSubtotal < 1499 && (
                <p className="text-[11px] text-amber-700 font-sans italic bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  ✨ Add ₹{(1499 - cartSubtotal).toLocaleString('en-IN')} more to unlock FREE Express Pan-India Delivery!
                </p>
              )}

              <div className="border-t border-neutral-200 pt-3 flex justify-between text-base font-serif font-bold text-neutral-950">
                <span>Total Amount:</span>
                <span className="text-2xl font-serif">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Coupon Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-neutral-200">
              <label className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold block">
                Have a Promo Code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. MEZ10"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                  className="flex-1 bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer border border-amber-500/30"
                >
                  Apply
                </button>
              </div>

              {couponMessage && (
                <p className={`text-[11px] ${couponMessage.success ? 'text-emerald-600' : 'text-red-500'}`}>
                  {couponMessage.text}
                </p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between bg-emerald-50 px-3 py-1.5 rounded-xl text-xs text-emerald-800 border border-emerald-200">
                  <span>Coupon {appliedCoupon.code} applied!</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-red-600 hover:underline cursor-pointer text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Checkout CTA */}
            <div className="space-y-3 pt-2">
              <button
                id="proceed-to-checkout-btn"
                onClick={() => setCurrentPage('checkout')}
                className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-amber-500/30"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello ${brand}, I would like to order directly on WhatsApp. My Cart Total is ₹${cartTotal}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order via WhatsApp (+91 {rawNum})</span>
              </a>
            </div>

            {/* Badges */}
            <div className="pt-2 border-t border-neutral-200 text-neutral-500 text-[11px] space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Encrypted 256-Bit Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Dispatched directly from Berhampur, Odisha</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
