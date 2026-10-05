import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Send, CheckCircle2, Sparkles, Building2, Phone, Mail, User, MapPin } from 'lucide-react';

interface WholesaleEnquiryFormProps {
  onSuccess?: () => void;
  standalone?: boolean;
}

export const WholesaleEnquiryForm: React.FC<WholesaleEnquiryFormProps> = ({
  onSuccess,
  standalone = false,
}) => {
  const { showToast, settings } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    city: '',
    itemsInterested: 'Pure Attar & Perfumes',
    quantity: '50-100 pcs',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const brand = settings.brandName || "MEZRAAN PERFUME";
  const rawNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788993123';
  const whatsappNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 800));
      setIsSubmitted(true);
      showToast('Thank you! Your wholesale enquiry has been submitted. Our team will contact you shortly.');
      if (onSuccess) onSuccess();
    } catch (err) {
      showToast('Failed to submit enquiry. Please call or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white text-neutral-900 rounded-3xl border border-neutral-200 shadow-xl overflow-hidden ${standalone ? 'p-6 sm:p-10' : 'p-6 sm:p-8'}`}>
      <div className="space-y-3 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-mono font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>B2B &amp; BULK ORDERS</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
          Wholesale &amp; Custom Gifting Enquiry
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
          Get direct manufacturer &amp; distributor wholesale rates on pure concentrated attars, luxury designer EDP perfumes, premium wedding gifting packs, custom corporate scent bottles, and incense burners from {brand} Berhampur boutique.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 text-center space-y-4 bg-[#FAF8F5] rounded-2xl border border-neutral-200">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="font-serif text-xl font-bold text-neutral-900">Wholesale Enquiry Received!</h4>
          <p className="text-xs text-neutral-600 max-w-md mx-auto">
            Our wholesale manager will review your quantity requirements and message you directly on WhatsApp (+91 {formData.phone || rawNum}) with our wholesale rate card.
          </p>
          <a
            href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello ${brand}, I just submitted a wholesale enquiry for ${formData.itemsInterested} (${formData.quantity}).`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md mt-2 cursor-pointer"
          >
            <span>Instant WhatsApp Connect</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-neutral-700 font-semibold uppercase tracking-wider">Your Name *</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-700 font-semibold uppercase tracking-wider">Business / Shop Name</label>
              <input
                type="text"
                placeholder="e.g. Royal Fragrances Boutique"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-neutral-700 font-semibold uppercase tracking-wider">Mobile Number (WhatsApp) *</label>
              <input
                type="tel"
                required
                placeholder="+91 98XXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-700 font-semibold uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                placeholder="b2b@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-700 font-semibold uppercase tracking-wider">City &amp; State</label>
              <input
                type="text"
                placeholder="e.g. Berhampur, Odisha"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-neutral-700 font-semibold uppercase tracking-wider">Products Interested</label>
              <select
                value={formData.itemsInterested}
                onChange={(e) => setFormData({ ...formData, itemsInterested: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="Pure Attar Oils (Concentrated)">Pure Non-Alcoholic Attar Oils (Concentrated)</option>
                <option value="French Luxury EDP Perfumes">French Luxury EDP Perfumes</option>
                <option value="Oud Bakhoor & Incense">Royal Arabian Bakhoor &amp; Burners</option>
                <option value="Handcrafted Agarbatti">Handcrafted Agarbatti (Incense)</option>
                <option value="Wedding / Corporate Gift Sets">Custom Wedding &amp; Corporate Gift Sets</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-700 font-semibold uppercase tracking-wider">Estimated Order Quantity</label>
              <select
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="25-50 pcs">25 - 50 Pieces (Starter Pack)</option>
                <option value="50-100 pcs">50 - 100 Pieces</option>
                <option value="100-500 pcs">100 - 500 Pieces (Wholesale)</option>
                <option value="500+ pcs">500+ Pieces (Bulk Distributor)</option>
                <option value="1-5 Litres">1 to 5 Litres Bulk Concentrate</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-neutral-700 font-semibold uppercase tracking-wider">Additional Requirements / Notes</label>
            <textarea
              rows={3}
              placeholder="Tell us about your business, specific fragrances requested, or private label requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 border border-amber-500/30"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'SUBMITTING ENQUIRY...' : 'SUBMIT WHOLESALE ENQUIRY'}</span>
          </button>
        </form>
      )}
    </div>
  );
};
