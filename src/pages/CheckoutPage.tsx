import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, MessageCircle, ArrowLeft, Loader2, Sparkles, CheckCircle2, Truck } from 'lucide-react';
import { AmBrandEmblem } from '../components/brand/AmBrandEmblem';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    currentUser,
    createOrder,
    clearCart,
    setCurrentPage,
    showToast,
    settings,
  } = useStore();

  const [formData, setFormData] = useState({
    name: currentUser?.fullName || '',
    mobile: currentUser?.mobile || '',
    email: currentUser?.email || '',
    address: currentUser?.savedAddresses?.[0]?.address || '',
    city: currentUser?.savedAddresses?.[0]?.city || '',
    state: currentUser?.savedAddresses?.[0]?.state || 'Odisha',
    pincode: currentUser?.savedAddresses?.[0]?.pincode || '',
    notes: '',
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const brand = settings.brandName || "MEZRAAN PERFUME";
  const rawNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788993123';
  const whatsappTarget = rawNum.length === 10 ? `91${rawNum}` : rawNum;

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF7F2] text-[#1A1A1A] min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
        <h2 className="font-serif text-2xl font-bold text-neutral-900">Your Cart is Empty</h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 bg-neutral-950 text-amber-400 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-800 cursor-pointer border border-amber-500/30"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleWhatsAppOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.address.trim()) {
      showToast('Please fill in your Name, Mobile Number and Full Address.');
      return;
    }

    setIsPlacingOrder(true);

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.selectedSalePrice || item.selectedPrice || item.product.salePrice || item.product.price,
      quantity: item.quantity,
      volume: item.selectedVolume || item.product.volume || '50ml',
      image: item.product.images[0] || '/IMG-20261004-WA0054.jpg',
    }));

    // Generate Beautiful WhatsApp order text
    const itemsText = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}* (${item.selectedVolume || item.product.volume})\n   Qty: ${item.quantity} × ₹${(item.selectedSalePrice || item.selectedPrice || item.product.salePrice || item.product.price).toLocaleString('en-IN')}`
      )
      .join('\n');

    const waMessage = `✨ *NEW ORDER - ${brand.toUpperCase()}* ✨
━━━━━━━━━━━━━━━━━━━━━
📋 *Order ID:* #${orderId}
👤 *Customer:* ${formData.name.trim()}
📞 *Mobile:* ${formData.mobile.trim()}
${formData.email.trim() ? `✉️ *Email:* ${formData.email.trim()}\n` : ''}📍 *Delivery Address:*
${formData.address.trim()}
${formData.city.trim() ? `${formData.city.trim()}, ` : ''}${formData.state.trim() ? `${formData.state.trim()} ` : ''}${formData.pincode.trim()}
${formData.notes.trim() ? `📝 *Notes:* ${formData.notes.trim()}\n` : ''}━━━━━━━━━━━━━━━━━━━━━
🛍️ *ORDERED ITEMS:*
${itemsText}
━━━━━━━━━━━━━━━━━━━━━
💰 *Subtotal:* ₹${cartSubtotal.toLocaleString('en-IN')}
${cartDiscount > 0 ? `🏷️ *Discount:* -₹${cartDiscount.toLocaleString('en-IN')}\n` : ''}🚚 *Shipping:* FREE Express Dispatch (Berhampur, Odisha) 🇮🇳
💵 *TOTAL AMOUNT:* ₹${cartTotal.toLocaleString('en-IN')}
━━━━━━━━━━━━━━━━━━━━━
💬 *Message:* Hello ${brand}, I have placed an order on your website. Please confirm my order and share dispatch tracking!`;

    const waUrl = `https://wa.me/${whatsappTarget}?text=${encodeURIComponent(waMessage)}`;

    // Save to Firestore in background
    createOrder({
      customerId: currentUser?.uid || 'guest_' + Date.now(),
      customerName: formData.name.trim(),
      customerEmail: formData.email.trim() || `${formData.mobile.trim()}@customer.mezraan.com`,
      customerMobile: formData.mobile.trim(),
      deliveryAddress: {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
      },
      items: orderItems,
      subtotal: cartSubtotal,
      discountAmount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      totalAmount: cartTotal,
      paymentMethod: 'whatsapp_confirm',
      paymentStatus: 'Pending',
      status: 'Confirmed',
    });

    clearCart();
    setIsPlacingOrder(false);

    // Redirect to WhatsApp & Order Success Page
    setCurrentPage('order-success', {
      orderId,
      whatsappUrl: waUrl,
    });
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 font-sans selection:bg-amber-300 selection:text-neutral-950">
      {/* Back button */}
      <button
        onClick={() => setCurrentPage('cart')}
        className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 uppercase font-mono tracking-wider cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Cart</span>
      </button>

      {/* Header */}
      <div className="text-center space-y-2 border-b border-neutral-300 pb-6">
        <div className="flex justify-center pb-2">
          <AmBrandEmblem size="sm" showSubtitle={false} interactive={false} />
        </div>
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-700 font-bold block">
          INSTANT SECURE CHECKOUT
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 uppercase tracking-tight">
          Delivery Details
        </h1>
        <p className="text-xs text-neutral-600">
          Orders are packed securely in Berhampur, Odisha and confirmed directly on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Delivery Form (7 cols) */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xl space-y-5">
          <h2 className="font-serif text-xl font-bold text-neutral-900 uppercase tracking-wider">
            Shipping Address
          </h2>

          <form onSubmit={handleWhatsAppOrderSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-700 font-semibold uppercase tracking-wider">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Receiver's Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-neutral-700 font-semibold uppercase tracking-wider">Mobile Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXXXXXXX"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-700 font-semibold uppercase tracking-wider">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-700 font-semibold uppercase tracking-wider">Street Address / House / Colony *</label>
              <textarea
                required
                rows={2}
                placeholder="Full delivery address with landmark"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl p-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-neutral-700 font-semibold uppercase tracking-wider">City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-700 font-semibold uppercase tracking-wider">State</label>
                <input
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-700 font-semibold uppercase tracking-wider">Pincode</label>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                {isPlacingOrder ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>PREPARING WHATSAPP...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>CONFIRM &amp; ORDER ON WHATSAPP</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar (5 cols) */}
        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-neutral-200 shadow-xl space-y-4">
          <h3 className="font-serif text-lg font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-3">
            Summary ({cart.reduce((t, i) => t + i.quantity, 0)} Items)
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <div className="pr-2">
                  <p className="font-medium text-neutral-900 truncate max-w-[180px]">{item.product.name}</p>
                  <span className="text-[10px] text-neutral-500 font-mono">{item.selectedVolume} × {item.quantity}</span>
                </div>
                <span className="font-mono text-neutral-950 font-bold shrink-0">
                  ₹{((item.selectedSalePrice || item.selectedPrice || item.product.salePrice || item.product.price) * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-200 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal:</span>
              <span className="font-mono text-neutral-900 font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount:</span>
                <span className="font-mono">-₹{cartDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Express Delivery (Pan-India):</span>
              <span className="text-emerald-600 font-mono uppercase font-bold text-[10px]">FREE</span>
            </div>
            <div className="border-t border-neutral-200 pt-3 flex justify-between text-base font-bold text-neutral-950">
              <span>Total Amount:</span>
              <span className="font-serif text-2xl text-neutral-950 font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-neutral-500 flex items-center gap-2 font-mono">
            <Truck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Dispatched directly from Berhampur, Odisha boutique.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
