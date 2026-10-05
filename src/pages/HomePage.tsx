// MEZRAAN PERFUME - Ultra-Luxury Fragrance Store — Berhampur, Odisha
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  MessageSquare,
  Star,
  Phone,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Eye,
  Crown,
  Compass,
  Zap,
  X,
  Plus,
  Plane,
  Mail,
  Volume2,
  VolumeX,
  Filter,
  Layers,
  Heart,
  Instagram,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { Product } from '../types';
import { ShowroomMap } from '../components/common/ShowroomMap';
import { FragranceNotesPyramid } from '../components/common/FragranceNotesPyramid';
import { BerhampurMapAnimation } from '../components/home/BerhampurMapAnimation';

export const HomePage: React.FC = () => {
  const { products, setCurrentPage, settings, addToCart, showToast } = useStore();

  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('BEST SELLERS');
  const [activeFeaturedTab, setActiveFeaturedTab] = useState<string>('POEM');
  const [activeScentMood, setActiveScentMood] = useState<string>('FRESH');
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [emailSubscription, setEmailSubscription] = useState('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const comboCount = settings.comboBottleCount || 5;
  const comboPrice = settings.comboOfferPrice || 1499;
  const isComboOfferVisible =
    settings.comboOfferEnabled !== false &&
    (settings.comboOfferEnabled as any) !== 'false' &&
    (settings.comboOfferEnabled as any) !== 0 &&
    (settings.comboOfferEnabled as any) !== 'inactive' &&
    (typeof window !== 'undefined' ? localStorage.getItem('aaf_combo_offer_enabled') !== 'false' : true);

  const [selectedComboPerfumes, setSelectedComboPerfumes] = useState<string[]>([]);

  const availableComboProducts = products.filter((p) => {
    if (settings.comboProductIds && settings.comboProductIds.length > 0) {
      return settings.comboProductIds.includes(p.id);
    }
    return true;
  });

  const handleOpenComboModal = () => {
    const defaultSelection = [];
    for (let i = 0; i < comboCount; i++) {
      const prod = availableComboProducts[i % (availableComboProducts.length || 1)];
      if (prod) defaultSelection.push(prod.id);
    }
    setSelectedComboPerfumes(defaultSelection);
    setIsComboModalOpen(true);
  };

  const handleAddCustomComboToCart = () => {
    const selectedNames = selectedComboPerfumes
      .map((id) => products.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const customComboProduct: Product = {
      id: `custom-combo-${Date.now()}`,
      name: `Custom ${comboCount}-Bottle Perfume Combo (${selectedComboPerfumes.length} Fragrances)`,
      price: settings.comboOfferOriginalPrice || 2499,
      salePrice: comboPrice,
      category: 'Deals & Combos',
      volume: `${comboCount} x 50ml EDP Set`,
      sku: 'MZ-COMBO-CUST',
      stock: 100,
      featured: true,
      bestSeller: true,
      newArrival: false,
      status: 'available',
      description: `Selected Fragrances: ${selectedNames}`,
      notes: { top: ['Custom Selection'], middle: ['Selected Fragrances'], base: ['MEZRAAN PERFUME'] },
      images: [
        '/IMG-20261004-WA0054.jpg',
        '/IMG-20261004-WA0074.jpg',
      ],
      createdAt: new Date().toISOString(),
    };

    addToCart(customComboProduct);
    setIsComboModalOpen(false);
    showToast(`Custom ${comboCount}-Perfume Set (₹${comboPrice}) added to Cart!`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSubscription.trim()) {
      showToast('Thank you for subscribing to MEZRAAN PERFUME VIP updates!');
      setEmailSubscription('');
    }
  };

  // Weekly picks using newly uploaded photos as priority
  const weeklyPicks = React.useMemo(() => {
    return products.slice(0, 8).map((p, idx) => ({
      ...p,
      inspiredBy: (p as any).brand || (idx % 2 === 0 ? 'CARTHUSIA' : idx % 3 === 0 ? 'DIOR' : 'BYREDO'),
    }));
  }, [products]);

  const moodFilteredProducts = React.useMemo(() => {
    if (activeScentMood === 'FRESH') return products.filter(p => p.name.includes('Blue') || p.name.includes('Ice') || p.category.includes('Aquatic') || p.category.includes('Fresh') || p.id.includes('WHT')).slice(0, 4);
    if (activeScentMood === 'OUD') return products.filter(p => p.name.includes('Oud') || p.name.includes('Alpha') || p.category.includes('Oud') || p.name.includes('AL OUD')).slice(0, 4);
    if (activeScentMood === 'GOURMAND') return products.filter(p => p.name.includes('Dessert') || p.name.includes('Vanilla') || p.category.includes('Sweet') || p.name.includes('KHAMRAH')).slice(0, 4);
    return products.filter(p => p.name.includes('Floral') || p.category.includes('Women') || p.name.includes('FEMME') || p.featured).slice(0, 4);
  }, [products, activeScentMood]);

  const brandInspirations = React.useMemo(() => {
    return products.filter(p => p.category === 'Perfumes' || p.category.includes('Perfume') || p.category.includes('Luxury')).slice(0, 6);
  }, [products]);

  const featuredCollectionProducts = React.useMemo(() => {
    if (activeFeaturedTab === 'POEM') return products.filter(p => p.name.includes('Poem') || p.category.includes('Luxury') || p.name.includes('FEMME')).slice(0, 4);
    if (activeFeaturedTab === 'NOBLE') return products.filter(p => p.name.includes('Noble') || p.name.includes('Gold') || p.name.includes('NOBLE')).slice(0, 4);
    if (activeFeaturedTab === 'DEJA VU') return products.filter(p => p.name.includes('Oud') || p.name.includes('Silver') || p.name.includes('KHAMRAH')).slice(0, 4);
    return products.slice(0, 4);
  }, [products, activeFeaturedTab]);

  const scrollWeekly = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const whatsappNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788993123';
  const whatsappTarget = whatsappNum.length === 10 ? `91${whatsappNum}` : whatsappNum;

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] min-h-screen font-sans selection:bg-amber-300 selection:text-neutral-950">
      
      {/* 1. CONTINUOUS ANIMATED TICKER / ANNOUNCEMENT MARQUEE */}
      <div className="bg-[#141414] text-white py-2.5 px-4 overflow-hidden border-b border-amber-500/20 whitespace-nowrap select-none">
        <div className="inline-block animate-marquee font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">
          <span className="mx-4 text-amber-300">✨ FREE EXPRESS DISPATCH ACROSS INDIA ON ORDERS ABOVE ₹1,499</span>
          <span className="mx-4 text-neutral-500">•</span>
          <span className="mx-4 text-white">100% PURE ALCOHOL-FREE CONCENTRATED ATTARS &amp; LUXURY EDP EXTRAITS</span>
          <span className="mx-4 text-neutral-500">•</span>
          <span className="mx-4 text-amber-300">MEZRAAN PERFUME • DIRECT BERHAMPUR ODISHA BOUTIQUE DISPATCH</span>
          <span className="mx-4 text-neutral-500">•</span>
          <span className="mx-4 text-white">WHATSAPP ORDERS: +91 {whatsappNum}</span>
          <span className="mx-4 text-neutral-500">•</span>
          <span className="mx-4 text-amber-300">📍 VISIT OUR BOUTIQUE IN BERHAMPUR, ODISHA</span>
        </div>
      </div>

      {/* 2. RESPONSIVE HERO BANNER WITH THE NEWLY UPLOADED IMAGE */}
      <section className="relative w-full bg-[#0a0a0a] text-white">
        <div className="relative w-full overflow-hidden">
          {/* User uploaded top hero image preserved */}
          <img
            src="/mezraan_hero_banner.png?v=6.0"
            alt="MEZRAAN PERFUME Luxury Hero Background"
            className="w-full h-auto block"
            loading="eager"
            decoding="sync"
          />
          {/* Subtle bottom gradient so buttons pop without darkening the image */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* Hero Overlay Content */}
          <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-10 max-w-4xl mx-auto text-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full px-4 sm:px-10 flex flex-row items-center justify-between gap-3 sm:gap-6"
            >
              {/* Left Button: EXPLORE */}
              <button
                onClick={() => setCurrentPage('shop')}
                className="flex-1 max-w-[190px] py-3.5 sm:py-5 bg-black/90 hover:bg-amber-400 hover:text-black text-white font-bold text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.3em] uppercase border border-amber-400/60 backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-2xl hover:scale-105 text-center whitespace-nowrap"
              >
                EXPLORE
              </button>

              {/* Center Pulsating Scroll Indicator */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-amber-300 hover:text-white cursor-pointer px-1 flex-shrink-0"
                onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
              >
                <ChevronDown className="w-5 h-5 sm:w-7 sm:h-7" />
              </motion.div>

              {/* Right Button: ATTARS & OILS */}
              <button
                onClick={() => setCurrentPage('collections')}
                className="flex-1 max-w-[190px] py-3.5 sm:py-5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-neutral-950 font-black text-[10px] sm:text-xs tracking-[0.08em] sm:tracking-[0.2em] uppercase border border-amber-300 transition-all duration-300 cursor-pointer shadow-xl hover:scale-105 text-center whitespace-nowrap"
              >
                ATTARS &amp; OILS
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SCENT PROFILE MOOD MATCHER QUIZ WIDGET (CREAMY & SOFT BLACK REMIX) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border border-neutral-300/80 bg-white/95 my-10 rounded-3xl shadow-xl">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[10px] tracking-[0.3em] text-amber-600 font-bold uppercase block font-mono">
            PERSONAL FRAGRANCE SELECTOR
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 uppercase tracking-widest font-normal">
            FIND YOUR SIGNATURE SCENT MOOD
          </h2>
          <p className="text-xs text-neutral-600 font-light">
            Match your vibe with handcrafted French EDPs and pure alcohol-free attars by MEZRAAN PERFUME
          </p>
        </div>

        {/* Mood Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl mx-auto mb-8">
          {[
            { id: 'FRESH', label: '🌊 FRESH & AQUATIC' },
            { id: 'OUD', label: '👑 ROYAL OUD & WOODS' },
            { id: 'GOURMAND', label: '🍨 SWEET GOURMAND' },
            { id: 'FLORAL', label: '🌸 FRENCH FLORAL' },
          ].map((mood) => (
            <button
              key={mood.id}
              onClick={() => setActiveScentMood(mood.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer border ${
                activeScentMood === mood.id
                  ? 'bg-neutral-950 text-amber-400 border-amber-500 shadow-md font-bold'
                  : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-amber-400 hover:text-neutral-950'
              }`}
            >
              {mood.label}
            </button>
          ))}
        </div>

        {/* Product Cards for Scent Matcher - ENLARGED DISPLAY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {moodFilteredProducts.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -5 }}
              onClick={() => setCurrentPage('product-detail', { productId: p.id })}
              className="bg-[#FAF8F5] rounded-2xl border border-neutral-200 hover:border-amber-500 p-4 transition-all shadow-md group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative w-full h-[260px] sm:h-[320px] rounded-xl overflow-hidden bg-white flex items-center justify-center p-2 border border-neutral-100">
                <img
                  src={p.images[0] || '/IMG-20261004-WA0054.jpg'}
                  alt={p.name}
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-neutral-900/90 text-amber-300 text-[9px] font-mono uppercase font-bold tracking-wider">
                  {p.category.split(' ')[0]}
                </span>
              </div>

              <div className="pt-3 space-y-1 text-center">
                <h3 className="font-serif text-sm sm:text-base font-bold text-neutral-900 truncate">
                  {p.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-amber-700 font-bold font-mono text-sm sm:text-base">
                    ₹{p.salePrice || p.price}
                  </span>
                  {p.salePrice && (
                    <span className="text-neutral-400 line-through text-xs font-mono">
                      ₹{p.price}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. FRAGRANCE OF THE WEEK SECTION WITH USER UPLOADED BRIGHT BACKGROUND (BACKGROUND PRESERVED) */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-y border-amber-500/20 my-10 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/fragrance_of_week_bg.jpg?v=4.0"
            alt="Fragrance of the week bright background"
            className="w-full h-full object-cover object-center filter brightness-95"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-300 font-bold font-mono">
              CURATED EXCELLENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white uppercase tracking-widest font-normal drop-shadow-lg">
              FRAGRANCE OF THE WEEK
            </h2>
            <p className="text-xs sm:text-sm text-neutral-200 max-w-md mx-auto font-light">
              Signature selections compounding high concentration oil bases with exceptional projection.
            </p>
          </div>

          {/* Carousel Buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={() => scrollWeekly('left')}
              className="p-2.5 rounded-full bg-black/80 border border-amber-400/40 text-amber-300 hover:bg-amber-400 hover:text-black transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollWeekly('right')}
              className="p-2.5 rounded-full bg-black/80 border border-amber-400/40 text-amber-300 hover:bg-amber-400 hover:text-black transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Container with ENLARGED PRODUCT IMAGES */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-6"
          >
            {weeklyPicks.map((product) => (
              <div
                key={product.id}
                className="w-[280px] sm:w-[320px] flex-shrink-0 bg-neutral-900/90 backdrop-blur-md rounded-2xl p-4 border border-amber-500/30 flex flex-col justify-between group shadow-xl hover:border-amber-400 transition-all"
              >
                <div
                  onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                  className="w-full h-[300px] sm:h-[340px] bg-black/80 rounded-xl overflow-hidden p-2 relative cursor-pointer flex items-center justify-center border border-neutral-800"
                >
                  <img
                    src={product.images[0] || '/IMG-20261004-WA0054.jpg'}
                    alt={product.name}
                    className="w-full h-full object-contain p-1 group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/80 border border-amber-500/30 text-amber-300 text-[9px] font-mono font-bold tracking-wider">
                    {product.inspiredBy}
                  </div>
                </div>

                <div className="pt-3 space-y-1">
                  <h3 className="font-serif text-base font-bold text-white truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-serif text-lg text-amber-300 font-bold">
                      ₹{product.salePrice || product.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                        showToast(`${product.name} added to cart!`);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold text-xs uppercase hover:from-amber-400 transition-all cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR TRUE MASTERCLASS / SPECIALTY PILLS */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: '100% PURE ITTAR', desc: 'No Alcohol • Zero Skin Burn', icon: ShieldCheck },
            { title: 'LONG-LASTING EDP', desc: '30% Extrait Concentration', icon: Sparkles },
            { title: 'PAN-INDIA COURIER', desc: 'Dispatched from Berhampur', icon: Truck },
            { title: 'WHATSAPP CONCIERGE', desc: 'Direct Personal Assistance', icon: MessageCircle },
          ].map((pill, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm flex flex-col items-center text-center space-y-2 hover:border-amber-400 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                <pill.icon className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-neutral-900 text-xs sm:text-sm tracking-wider uppercase">
                {pill.title}
              </h4>
              <p className="text-[11px] text-neutral-500">{pill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. POUR HOMME & POUR FEMME - THE ICONIC DUO (REPLACED WITH NEWLY UPLOADED IMAGES + ENLARGED DISPLAY + NEW ANIMATIONS) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border border-amber-500/30 text-center space-y-8 relative overflow-hidden rounded-3xl my-10 shadow-2xl">
        {/* User uploaded background image preserved */}
        <div className="absolute inset-0 z-0">
          <img
            src="/iconic_duo_bg.jpg?v=3.0"
            alt="The Iconic Duo background"
            className="w-full h-full object-cover object-center filter saturate-125 brightness-90"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-amber-300 font-bold font-mono">
              MASTER BLENDS • POUR HOMME &amp; POUR FEMME
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white uppercase tracking-widest font-normal drop-shadow-md">
              THE ICONIC DUO
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-lg mx-auto">
              Compounded to perfection with rare botanicals, aged oudhs, and magnetic projection.
            </p>
          </div>

          {/* 2 GRAND ENLARGED CARDS WITH NEW REAL CUSTOMER PHOTOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-4">
            
            {/* 1. POUR HOMME - WA0054 (ENLARGED DISPLAY) */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              onClick={() => setCurrentPage('shop')}
              className="group relative rounded-3xl overflow-hidden bg-black/85 backdrop-blur-md border border-amber-500/40 p-6 sm:p-8 shadow-2xl cursor-pointer flex flex-col items-center justify-between min-h-[500px] sm:min-h-[580px] hover:border-amber-400 hover:shadow-[0_0_35px_rgba(217,163,55,0.35)] transition-all"
            >
              {/* Floating Top Badge */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-[10px] tracking-[0.25em] text-amber-400 uppercase font-mono font-bold">
                  GENTLEMAN RESERVE
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono uppercase font-bold">
                  POUR HOMME
                </span>
              </div>

              {/* Huge Product Showcase Image */}
              <div className="w-full h-[380px] sm:h-[460px] flex items-center justify-center p-2 relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#181818] to-[#0c0c0c] border border-neutral-800 my-4">
                <img
                  src="/IMG-20261004-WA0054.jpg"
                  alt="MEZRAAN PERFUME - Pour Homme Fragrance"
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-700 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                />
                <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Bottom Info & CTA */}
              <div className="w-full pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-wider">
                    POUR HOMME
                  </h3>
                  <span className="text-xs text-neutral-400 font-light">French Extrait • 50ml EDP</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>DISCOVER</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* 2. POUR FEMME - WA0074 (ENLARGED DISPLAY) */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              onClick={() => setCurrentPage('shop')}
              className="group relative rounded-3xl overflow-hidden bg-black/85 backdrop-blur-md border border-amber-500/40 p-6 sm:p-8 shadow-2xl cursor-pointer flex flex-col items-center justify-between min-h-[500px] sm:min-h-[580px] hover:border-amber-400 hover:shadow-[0_0_35px_rgba(217,163,55,0.35)] transition-all"
            >
              {/* Floating Top Badge */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-[10px] tracking-[0.25em] text-amber-400 uppercase font-mono font-bold">
                  ROYAL FEMME COLLECTION
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono uppercase font-bold">
                  POUR FEMME
                </span>
              </div>

              {/* Huge Product Showcase Image */}
              <div className="w-full h-[380px] sm:h-[460px] flex items-center justify-center p-2 relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#181818] to-[#0c0c0c] border border-neutral-800 my-4">
                <img
                  src="/IMG-20261004-WA0074.jpg"
                  alt="MEZRAAN PERFUME - Pour Femme Fragrance"
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-700 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* Bottom Info & CTA */}
              <div className="w-full pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-wider">
                    POUR FEMME
                  </h3>
                  <span className="text-xs text-neutral-400 font-light">Sensual Velvet Flowers • 50ml EDP</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>DISCOVER</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. HIGH NOTES & NOBLE COLLECTION - REPLACED WITH REAL CUSTOMER PHOTOS + ENLARGED */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#141414] text-white relative overflow-hidden border-y border-neutral-800">
        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-3">
            <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-amber-400 font-mono font-semibold block">
              INTRODUCING THE HIGH NOTES COLLECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-widest uppercase drop-shadow-md">
              SAY NO TO DRUGS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-light">
              Elevate your senses with pure artisanal fragrances crafted for high reflection and mental clarity.
            </p>
          </div>

          {/* 4 ENLARGED CARDS WITH NEW REAL PHOTOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-4">
            {[
              { title: 'HIGH NOTE I', subtitle: 'Royal Matured Amber', img: '/IMG-20261004-WA0098.jpg', badge: 'EXTRAIT' },
              { title: 'HIGH NOTE II', subtitle: 'Emerald Crisp Decanter', img: '/IMG-20261004-WA0054.jpg', badge: 'SIGNATURE' },
              { title: 'HIGH NOTE III', subtitle: 'Aura Trio Essence', img: '/IMG-20261004-WA0074.jpg', badge: 'EDP 50ML' },
              { title: 'HIGH NOTE IV', subtitle: 'Crown Imperial Flacon', img: '/IMG-20261004-WA0099.jpg', badge: 'LIMITED' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setCurrentPage('shop')}
                className="bg-[#1C1C1C] border border-amber-500/20 hover:border-amber-400 rounded-3xl p-4 shadow-xl cursor-pointer text-center space-y-3 group transition-all"
              >
                {/* Big Image Container */}
                <div className="w-full h-[320px] sm:h-[380px] bg-[#0c0c0c] rounded-2xl overflow-hidden relative p-3 flex items-center justify-center border border-neutral-800">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain p-1 group-hover:scale-108 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/85 text-amber-300 text-[9px] font-mono uppercase font-bold tracking-wider border border-amber-500/30">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="font-serif text-base text-white tracking-wider uppercase block font-bold group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </span>
                  <p className="text-[11px] text-neutral-400 font-light">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEW FEATURE: INTERACTIVE OLFACTORY NOTES PYRAMID ACCORDION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6">
        <FragranceNotesPyramid />
      </section>

      {/* 9. BRAND INSPIRATIONS - PERFUMES (CREAMY & SOFT BLACK REMIX) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-300">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-700 font-mono font-semibold">
            BRAND INSPIRATIONS
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-neutral-900 uppercase tracking-widest font-normal">
            LUXURY PERFUMES
          </h2>
          <p className="text-xs text-neutral-600 font-light">
            Handcrafted in Berhampur, Odisha with masterfully distilled oils
          </p>
        </div>

        {/* 6 Products Grid with BIGGER PRODUCT IMAGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {brandInspirations.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-5 border border-neutral-200 hover:border-amber-400 transition-all shadow-md hover:shadow-xl flex flex-col justify-between group"
            >
              <div
                onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                className="w-full h-[300px] sm:h-[350px] bg-[#FAF8F5] rounded-2xl overflow-hidden p-3 relative cursor-pointer flex items-center justify-center border border-neutral-100"
              >
                <img
                  src={product.images[0] || '/IMG-20261004-WA0054.jpg'}
                  alt={product.name}
                  className="w-full h-full object-contain p-2 group-hover:scale-108 transition-transform duration-500"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    showToast(`${product.name} added to cart!`);
                  }}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-neutral-950 text-amber-400 shadow-md flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all cursor-pointer"
                  title="Add to cart"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-semibold">
                    {product.category}
                  </span>
                  <span className="text-neutral-500 text-[11px] font-mono">{product.volume}</span>
                </div>

                <h3
                  onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                  className="font-serif text-lg font-bold text-neutral-900 hover:text-amber-700 transition-colors cursor-pointer truncate"
                >
                  {product.name}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl font-bold text-neutral-950">
                      ₹{product.salePrice || product.price}
                    </span>
                    {product.salePrice && (
                      <span className="text-xs text-neutral-400 line-through font-mono">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                    className="text-xs uppercase font-bold tracking-wider text-amber-700 hover:text-neutral-950 transition-colors"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10. VERIFIED CUSTOMER REVIEWS & TESTIMONIALS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-300">
        <div className="text-center space-y-2 mb-12">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-700 font-mono font-semibold">
            COMMUNITY LOVE
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-neutral-900 uppercase tracking-widest font-normal">
            PATRON TESTIMONIALS
          </h2>
          <p className="text-xs text-neutral-600 font-light">
            Loved by fragrance connoisseurs across Odisha and pan-India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Arhan Khan',
              location: 'Bhubaneswar, Odisha',
              text: 'The projection and maceration quality of MEZRAAN PERFUME is exceptional. Lasts 14+ hours easily through Odisha heat.',
              stars: 5,
              product: 'AL OUD SIGNATURE',
            },
            {
              name: 'Sufiyan Shaikh',
              location: 'Delhi',
              text: 'Ordered the customized combo box. The presentation, glass atomizers, and alcohol-free attars are true masterclass quality.',
              stars: 5,
              product: 'Custom 5-Bottle Combo',
            },
            {
              name: 'Priyanka Das',
              location: 'Berhampur, Odisha',
              text: 'Visited the Berhampur showroom in person. Beautiful fragrance layering consultation and pure natural attars without synthetic sharpness.',
              stars: 5,
              product: 'POUR FEMME ROYAL',
            },
          ].map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="font-serif font-bold text-neutral-900 text-sm block">
                    {rev.name}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {rev.location}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. SCENTED DELIGHTS - TRIO OF LUXURIOUS FRAGRANCES (REPLACED WITH NEWLY UPLOADED IMAGES + ENLARGED DISPLAY) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border border-amber-500/30 relative overflow-hidden rounded-3xl my-10 shadow-2xl text-center space-y-8">
        {/* User uploaded portrait background image preserved */}
        <div className="absolute inset-0 z-0">
          <img
            src="/trio_luxurious_bg.jpg?v=2.0"
            alt="Scented Delights background"
            className="w-full h-full object-cover object-center filter saturate-150 brightness-90"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-amber-300 font-bold font-mono">
              SCENTED DELIGHTS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white uppercase tracking-widest font-normal drop-shadow-lg">
              A TRIO OF LUXURIOUS FRAGRANCES
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-md mx-auto">
              Three pillars of luxury fragrance craftsmanship from our Berhampur boutique.
            </p>
          </div>

          {/* 3 ENLARGED TRIO CARDS WITH NEW REAL PHOTOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'PERFUMES',
                subtitle: 'Royal French EDP Extraits',
                img: '/IMG-20261004-WA0099.jpg',
                page: 'shop',
                badge: 'EXTRAIT DE PARFUM'
              },
              {
                title: 'ROYAL ESSENCES',
                subtitle: 'Concentrated Pure Attars',
                img: '/IMG-20261004-WA0100.jpg',
                page: 'shop',
                badge: '100% ALCOHOL-FREE'
              },
              {
                title: 'BAKHOOR & OUD',
                subtitle: 'Aromatic Agarwood Chips',
                img: '/IMG-20261004-WA0046.jpg',
                page: 'collections',
                badge: 'ARTISANAL INCENSE'
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setCurrentPage(item.page as any)}
                className="group relative rounded-3xl overflow-hidden bg-black/85 backdrop-blur-md border border-amber-500/40 cursor-pointer shadow-2xl p-6 flex flex-col items-center justify-between min-h-[440px] sm:min-h-[500px] hover:border-amber-400 hover:shadow-[0_0_35px_rgba(217,163,55,0.35)] transition-all"
              >
                <div className="w-full flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-[10px] tracking-[0.2em] text-amber-400 font-mono font-bold">
                    MEZRAAN TRIO
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold border border-amber-500/30">
                    {item.badge}
                  </span>
                </div>

                {/* Big Image Display */}
                <div className="w-full h-[320px] sm:h-[380px] flex items-center justify-center p-2 relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#181818] to-[#0a0a0a] my-3 border border-neutral-800">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain p-1 group-hover:scale-108 transition-transform duration-700 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                  />
                </div>

                <div className="w-full pt-3 border-t border-neutral-800 text-center space-y-1">
                  <span className="font-serif text-xl text-white font-bold tracking-widest uppercase group-hover:text-amber-300 transition-colors block">
                    {item.title}
                  </span>
                  <span className="text-xs text-neutral-400 font-light block">
                    {item.subtitle}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. NEW FEATURE: INTERACTIVE BERHAMPUR SHOWROOM MAP WITH ANIMATED RADAR & PAN-INDIA LOGISTICS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-8 space-y-8">
        <BerhampurMapAnimation />
        <ShowroomMap />
      </section>

      {/* 13. FEATURED COLLECTION TABS (POEM, NOBLE, DEJA VU) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-300">
        <div className="text-center space-y-3 mb-8">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-700 font-mono font-semibold">
            SIGNATURE SERIES
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-neutral-900 uppercase tracking-widest font-normal">
            FEATURED COLLECTIONS
          </h2>
        </div>

        {/* Collection Selector Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-10">
          {['POEM', 'NOBLE', 'DEJA VU'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFeaturedTab(tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all cursor-pointer border ${
                activeFeaturedTab === tab
                  ? 'bg-neutral-950 text-amber-400 border-amber-500 shadow-md'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-amber-400'
              }`}
            >
              {tab} COLLECTION
            </button>
          ))}
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {featuredCollectionProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => setCurrentPage('product-detail', { productId: p.id })}
              className="bg-white rounded-2xl p-4 border border-neutral-200 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="w-full h-[240px] sm:h-[280px] bg-[#FAF8F5] rounded-xl overflow-hidden p-2 flex items-center justify-center border border-neutral-100">
                <img
                  src={p.images[0] || '/IMG-20261004-WA0054.jpg'}
                  alt={p.name}
                  className="w-full h-full object-contain p-1 group-hover:scale-108 transition-transform duration-500"
                />
              </div>

              <div className="pt-3 text-center space-y-1">
                <h4 className="font-serif font-bold text-neutral-900 text-sm truncate">
                  {p.name}
                </h4>
                <span className="font-mono text-amber-700 font-bold text-sm block">
                  ₹{p.salePrice || p.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 14. NOBLE COLLECTION (REPLACED WITH NEWLY UPLOADED PHOTO WA0098) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-300 text-center space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-700 font-mono font-semibold block">
            ROYAL EXTRAITS RESERVE
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-neutral-900 uppercase tracking-widest font-normal">
            NOBLE COLLECTION
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-md mx-auto">
            Elevating elegance through every fragrance drop distilled in Berhampur.
          </p>
        </div>

        {/* Grand Showcase Frame with User's WA0098 Photo */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-neutral-950 p-4 sm:p-6 group relative">
          <div className="w-full h-[360px] sm:h-[460px] rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#181818] to-[#0a0a0a]">
            <img
              src="/IMG-20261004-WA0098.jpg"
              alt="MEZRAAN PERFUME - Noble Collection"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute bottom-8 left-8 right-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-none">
            <div className="bg-black/85 backdrop-blur-md px-5 py-3 rounded-2xl border border-amber-500/30">
              <span className="text-amber-400 font-mono text-[10px] uppercase font-bold tracking-widest block">
                MASTERPIECE RESERVE
              </span>
              <span className="text-white font-serif text-lg font-bold">
                MEZRAAN NOBLE EXTRAIT
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setCurrentPage('collections')}
            className="px-10 py-4 bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-bold text-xs tracking-[0.3em] uppercase transition-all shadow-xl cursor-pointer rounded-xl border border-amber-500/40"
          >
            EXPLORE NOBLE COLLECTION →
          </button>
        </div>
      </section>

      {/* 15. INTERNATIONAL SHIPPING & NEWSLETTER */}
      <section className="py-16 bg-[#141414] text-white border-b border-neutral-800 text-center space-y-12">
        <div className="max-w-xl mx-auto space-y-2 px-4">
          <Plane className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="font-serif text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-white">
            INTERNATIONAL &amp; PAN-INDIA SHIPPING
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Direct insured dispatch from Berhampur, Odisha to all Indian PIN codes with tamper-proof packaging.
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-4 px-4">
          <span className="text-[10px] tracking-[0.25em] text-amber-400 uppercase font-mono font-bold block">
            KEEP ME UPDATED
          </span>
          <h4 className="font-serif text-2xl font-bold uppercase tracking-wider text-white">
            VIP NEWSLETTER
          </h4>
          <p className="text-xs text-neutral-400 font-light">
            Subscribe to get notified about product launches, special offers and company news.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
            <input
              type="email"
              required
              placeholder="Your Email Address"
              value={emailSubscription}
              onChange={(e) => setEmailSubscription(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-neutral-800 focus:border-amber-400 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-neutral-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      {/* 16. WHATSAPP COMMUNITY & BOUTIQUE LOCATION (REPLACED WITH NEWLY UPLOADED IMAGES + ENLARGED) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border border-amber-500/30 text-center space-y-8 relative overflow-hidden rounded-3xl my-10 shadow-2xl">
        {/* Background image preserved */}
        <div className="absolute inset-0 z-0">
          <img
            src="/whatsapp_support_bg.jpg?v=3.0"
            alt="WhatsApp support background"
            className="w-full h-full object-cover object-center filter brightness-90"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <span className="text-xs text-amber-300 uppercase tracking-[0.25em] font-mono font-semibold block">
              DIRECT WHATSAPP ORDER &amp; SUPPORT
            </span>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href={`https://wa.me/${whatsappTarget}?text=${encodeURIComponent(`Hello MEZRAAN PERFUME, I want to explore your perfumes and order directly.`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 font-serif text-xl sm:text-2xl text-white font-bold hover:text-amber-300 transition-colors bg-black/80 px-6 py-3 rounded-full border border-amber-400/50 backdrop-blur-md shadow-2xl"
              >
                <MessageCircle className="w-6 h-6 text-emerald-400 fill-emerald-400" />
                <span>+91 {whatsappNum}</span>
              </a>

              <a
                href={settings.instagramUrl || "https://www.instagram.com/mezraan01?stkn=MWlwdmkzczlvMjR6dQ=="}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold text-xs shadow-xl transition-opacity border border-white/20"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>

          {/* 4 ENLARGED CARDS WITH USER'S REAL UPLOADED PHOTOS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4 max-w-5xl mx-auto">
            {[
              { img: "/IMG-20261004-WA0100.jpg", label: "White Musk Elixir" },
              { img: "/IMG-20261004-WA0046.jpg", label: "Bakhoor & Rollon Reserve" },
              { img: "/IMG-20261004-WA0098.jpg", label: "Noble Extrait Flacon" },
              { img: "/IMG-20261004-WA0099.jpg", label: "Royal Khamrah Decanter" }
            ].map((card, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -6, scale: 1.03 }}
                href={`https://wa.me/${whatsappTarget}?text=${encodeURIComponent(`Hello MEZRAAN PERFUME, I am interested in ordering ${card.label}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl overflow-hidden border border-amber-500/40 bg-black/85 p-3 group relative shadow-2xl block cursor-pointer flex flex-col items-center justify-between min-h-[280px] sm:min-h-[340px] hover:border-emerald-400 transition-all"
              >
                <div className="w-full h-[220px] sm:h-[270px] rounded-2xl overflow-hidden flex items-center justify-center bg-[#101010] p-2">
                  <img
                    src={card.img}
                    alt={card.label}
                    className="w-full h-full object-contain p-1 group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                <div className="w-full pt-2 text-center">
                  <span className="text-[11px] font-mono text-amber-300 font-bold block truncate">
                    {card.label}
                  </span>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold inline-flex items-center gap-1 pt-0.5">
                    <MessageCircle className="w-3 h-3 fill-emerald-400" />
                    <span>WhatsApp Order</span>
                  </span>
                </div>

                <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 rounded-3xl border border-emerald-400 p-4">
                  <MessageCircle className="w-10 h-10 text-emerald-400 fill-emerald-400 animate-bounce" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Order via WhatsApp</span>
                  <span className="text-[10px] text-neutral-300">Instant direct response from Berhampur boutique</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK VIEW PRODUCT MODAL (CREAMY & SOFT BLACK THEME) */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-neutral-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative border border-amber-500/40 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 items-center">
              <div className="w-28 h-32 bg-[#FAF8F5] rounded-2xl overflow-hidden p-2 flex items-center justify-center border border-neutral-200 shrink-0">
                <img
                  src={quickViewProduct.images[0] || '/IMG-20261004-WA0054.jpg'}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">
                  {quickViewProduct.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-neutral-900">
                  {quickViewProduct.name}
                </h3>
                <span className="font-serif text-2xl font-bold text-neutral-950 block">
                  ₹{quickViewProduct.salePrice || quickViewProduct.price}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              {quickViewProduct.description}
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  addToCart(quickViewProduct);
                  setQuickViewProduct(null);
                  showToast(`${quickViewProduct.name} added to cart!`);
                }}
                className="flex-1 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer border border-amber-500/30"
              >
                Add To Cart
              </button>
              <button
                onClick={() => {
                  const prod = quickViewProduct;
                  setQuickViewProduct(null);
                  setCurrentPage('product-detail', { productId: prod.id });
                }}
                className="px-5 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer border border-neutral-300"
              >
                Full Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM COMBO BUILDER MODAL */}
      {isComboModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-neutral-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 relative border border-amber-500/40 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsComboModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-700 font-bold">
                LIMITED VALUE OFFER
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                Custom {comboCount}-Perfume Bundle (₹{comboPrice})
              </h3>
              <p className="text-xs text-neutral-600">
                Select your favorite {comboCount} perfumes from MEZRAAN PERFUME. Includes luxury presentation box.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableComboProducts.map((prod) => {
                const isSelected = selectedComboPerfumes.includes(prod.id);
                return (
                  <div
                    key={prod.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedComboPerfumes(prev => prev.filter(id => id !== prod.id));
                      } else {
                        if (selectedComboPerfumes.length < comboCount) {
                          setSelectedComboPerfumes(prev => [...prev, prod.id]);
                        } else {
                          showToast(`You can select up to ${comboCount} fragrances.`);
                        }
                      }
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${
                      isSelected
                        ? 'bg-amber-50 border-amber-600 shadow-md ring-1 ring-amber-500'
                        : 'bg-[#FAF8F5] border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="w-20 h-24 bg-white rounded-xl overflow-hidden p-1 flex items-center justify-center">
                      <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-serif text-xs font-bold text-neutral-900 line-clamp-1">{prod.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-amber-600 text-white' : 'bg-neutral-200 text-neutral-700'}`}>
                      {isSelected ? 'SELECTED' : 'SELECT'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-700 font-mono">
                Selected: <span className="font-bold text-amber-700">{selectedComboPerfumes.length}</span> of {comboCount} bottles
              </div>
              <button
                disabled={selectedComboPerfumes.length !== comboCount}
                onClick={handleAddCustomComboToCart}
                className="w-full sm:w-auto px-8 py-3.5 bg-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 text-amber-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer border border-amber-500/40"
              >
                Add Custom Bundle To Cart (₹{comboPrice})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
