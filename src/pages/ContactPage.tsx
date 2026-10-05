import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, MessageSquare, ExternalLink, Send, Clock, Sparkles, CheckCircle2, Instagram } from 'lucide-react';
import { AmBrandEmblem } from '../components/brand/AmBrandEmblem';
import { ShowroomMap } from '../components/common/ShowroomMap';

export const ContactPage: React.FC = () => {
  const { showToast, settings } = useStore();

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const brand = settings.brandName || "MEZRAAN PERFUME";
  const tagline = settings.brandTagline || "Pure Non-Alcoholic Attar & French Luxury Perfumes";
  const address = settings.contactAddress || "BERHAMPUR,odisha";
  const phone = settings.contactPhone || "7788993123";
  const rawNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || "7788993123";
  const num = rawNum.length === 10 ? `91${rawNum}` : rawNum;
  const instagramUrl = settings.instagramUrl || "https://www.instagram.com/mezraan01?stkn=MWlwdmkzczlvMjR6dQ==";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(`Thank you! Your inquiry has been sent to ${brand} concierge.`);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12 font-sans selection:bg-amber-300 selection:text-neutral-950">
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-neutral-300 pb-10">
        <div className="pt-2 flex justify-center">
          <AmBrandEmblem size="sm" showSubtitle={false} interactive={false} />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] font-mono font-bold text-amber-700 block">
          VISIT OR CONTACT US • BERHAMPUR, ODISHA
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900 tracking-tight uppercase font-bold drop-shadow-sm">
          Showroom &amp; Concierge
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto font-light">
          We welcome you to visit our beautiful Berhampur boutique or reach out directly for custom fragrances, bulk gifting and wholesale orders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Contact Info Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xl space-y-6">
            
            <div>
              <h2 className="font-serif text-2xl text-neutral-900 uppercase tracking-tight font-bold leading-tight">
                {brand}
              </h2>
              <span className="text-xs tracking-wider uppercase text-amber-700 font-mono font-semibold block mt-1">
                {tagline}
              </span>
            </div>

            {/* Address */}
            <div className="space-y-2 text-xs text-neutral-700 border-t border-neutral-200 pt-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block mb-1 text-sm font-serif">Showroom Address:</strong>
                  <p className="text-neutral-700 leading-relaxed font-medium">
                    {address}
                  </p>
                  <p className="text-[11px] text-neutral-500 font-mono">
                    Berhampur, Ganjam, Odisha - 760002
                  </p>
                </div>
              </div>
            </div>

            {/* Phones & Hours */}
            <div className="space-y-3.5 border-t border-neutral-200 pt-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">Call Support:</span>
                  <a href={`tel:${phone}`} className="text-neutral-900 font-bold hover:text-amber-700 transition-colors">
                    +91 {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">WhatsApp Concierge:</span>
                  <a
                    href={`https://wa.me/${num}?text=${encodeURIComponent(`Hello ${brand}, I would like to inquire about your perfumes.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    +91 {rawNum} (Instant Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">Boutique Hours:</span>
                  <span className="text-neutral-900 font-medium">
                    10:00 AM - 10:00 PM (All 7 Days Open)
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <a
                href={`https://wa.me/${num}?text=${encodeURIComponent(`Hello ${brand}, I am planning a visit to your Berhampur boutique.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 {rawNum})</span>
              </a>

              <a
                href={`tel:${phone}`}
                className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-amber-400 border border-amber-500/30 font-bold text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Showroom Now</span>
              </a>
            </div>

          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xl space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-700 font-mono font-semibold block">
                VIP CONCIERGE
              </span>
              <h2 className="font-serif text-2xl text-neutral-900 font-bold uppercase tracking-tight">
                Send an Enquiry
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Fill out the form below and our fragrance specialist will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-[#FAF8F5] rounded-2xl border border-neutral-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-lg text-neutral-900 font-bold">Message Sent Successfully!</h3>
                <p className="text-xs text-neutral-600">
                  Our team in Berhampur, Odisha has received your message and will respond shortly on WhatsApp or Phone.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-neutral-950 text-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl mt-2 cursor-pointer border border-amber-500/30"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-700 uppercase tracking-wider font-semibold">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-700 uppercase tracking-wider font-semibold">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXXXXXXX"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-700 uppercase tracking-wider font-semibold">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-700 uppercase tracking-wider font-semibold">Inquiry Type</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3.5 py-3 text-neutral-900 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="General Inquiry">General Product Inquiry</option>
                      <option value="Boutique Visit">Showroom Visit / Consultation</option>
                      <option value="Wholesale">Wholesale &amp; Bulk Supply</option>
                      <option value="Custom Gifting">Wedding / Corporate Gifting</option>
                      <option value="Order Tracking">Existing Order Status</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-700 uppercase tracking-wider font-semibold">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what fragrances you are looking for..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl p-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 border border-amber-500/30"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT CONCIERGE MESSAGE</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* Showroom Map */}
      <div className="space-y-6 pt-4">
        <ShowroomMap />
      </div>

    </div>
  );
};
