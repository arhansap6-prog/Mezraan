import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, ShieldCheck, Sparkles, ChevronRight, Check, Minus, Plus, MessageSquare, ArrowLeft, Star, Heart, ShoppingBag, Zap } from 'lucide-react';
import { ProductVolumeVariant } from '../types';
import { getProductVolumeVariants } from '../utils/productUtils';

export const ProductDetailPage: React.FC = () => {
  const { products, pageParams, setCurrentPage, addToCart, settings, showToast } = useStore();

  const productId = pageParams?.productId;
  const product = products.find((p) => p.id === productId) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const variants = product ? getProductVolumeVariants(product) : [];
  const [selectedVolume, setSelectedVolume] = useState<string>(() => variants[0]?.volume || product?.volume || '100ml');

  useEffect(() => {
    if (product) {
      const v = getProductVolumeVariants(product);
      if (v.length > 0 && !v.some((item) => item.volume === selectedVolume)) {
        setSelectedVolume(v[0].volume);
      }
    }
  }, [product?.id]);

  const selectedVariant =
    variants.find((v) => v.volume === selectedVolume) ||
    variants[0] || {
      volume: product?.volume || '100ml',
      price: product?.price || 1500,
      salePrice: product?.salePrice,
    };

  if (!product) {
    return (
      <div className="bg-[#FAF7F2] text-[#1A1A1A] min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4">
        <h2 className="font-serif text-2xl font-bold">Perfume Not Found</h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 bg-neutral-950 text-amber-400 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-800 cursor-pointer border border-amber-500/30"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const price = selectedVariant.price;
  const salePrice = selectedVariant.salePrice;
  const isDiscounted = !!(salePrice && salePrice < price);
  const discountPercent = isDiscounted
    ? Math.round(((price - salePrice!) / price) * 100)
    : 0;
  const currentPrice = salePrice || price;

  const brand = settings.brandName || "MEZRAAN PERFUME";
  const rawNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || "7788993123";
  const whatsappTarget = rawNum.length === 10 ? `91${rawNum}` : rawNum;

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant.volume, selectedVariant.price, selectedVariant.salePrice);
    showToast(`${product.name} (${selectedVariant.volume}) added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant.volume, selectedVariant.price, selectedVariant.salePrice);
    setCurrentPage('checkout');
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-16 font-sans selection:bg-amber-300 selection:text-neutral-950">
      
      {/* Back to Shop Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <button
          onClick={() => setCurrentPage('shop')}
          className="hover:text-amber-700 transition-colors flex items-center gap-1 uppercase tracking-wider font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Shop</span>
        </button>
        <ChevronRight className="w-3 h-3 text-neutral-400" />
        <span className="text-amber-700 uppercase tracking-wider font-semibold">{product.category}</span>
        <ChevronRight className="w-3 h-3 text-neutral-400" />
        <span className="text-neutral-700 font-serif font-medium truncate">{product.name}</span>
      </div>

      {/* Main Product Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Gallery Section (7 cols) - MUCH BIGGER DISPLAY */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Display Image */}
          <div className="relative aspect-[4/5] bg-white p-6 sm:p-8 rounded-3xl overflow-hidden border border-neutral-200 shadow-xl flex items-center justify-center">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.status === 'out_of_stock' ? (
                <span className="bg-red-600 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-lg font-bold shadow-md">
                  OUT OF STOCK
                </span>
              ) : isDiscounted ? (
                <span className="bg-amber-600 text-white text-[10px] uppercase tracking-wider font-black px-3 py-1 rounded-lg shadow-md">
                  SAVE {discountPercent}%
                </span>
              ) : null}
              {product.bestSeller && (
                <span className="bg-neutral-950 text-amber-300 text-[10px] uppercase tracking-wider px-3 py-1 rounded-lg font-mono font-bold shadow-md border border-amber-500/30">
                  BEST SELLER
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4 text-xs font-mono uppercase tracking-wider text-neutral-700 bg-[#FAF8F5] px-3 py-1 rounded-full border border-neutral-300 shadow-sm">
              SKU: {product.sku}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer bg-white ${
                    selectedImageIndex === idx
                      ? 'border-amber-600 ring-2 ring-amber-500/40 shadow-md'
                      : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Product Info Section (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-700 font-mono font-semibold mb-2">
              <span>{product.category}</span>
              <span>•</span>
              <span>MEZRAAN MASTERPIECE</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 tracking-tight font-bold">
              {product.name}
            </h1>
          </div>

          {/* Pricing */}
          <div className="py-4 border-y border-neutral-200 flex items-baseline gap-3 flex-wrap">
            <span className="text-3xl sm:text-4xl font-serif text-neutral-950 font-bold">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            {isDiscounted && (
              <span className="text-base text-neutral-400 line-through">
                ₹{selectedVariant.price.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs text-neutral-500 tracking-wider uppercase ml-auto font-mono">
              (Pan-India Express Dispatch Included)
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Volume Variant Selector */}
          {variants.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs text-neutral-700 uppercase tracking-wider font-semibold block">
                Select Flacon Volume:
              </span>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.volume}
                    onClick={() => setSelectedVolume(v.volume)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer border ${
                      selectedVolume === v.volume
                        ? 'bg-neutral-950 text-amber-400 border-amber-500 shadow-md'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-amber-400 hover:text-neutral-950'
                    }`}
                  >
                    <span>{v.volume}</span>
                    <span className="ml-2 font-normal text-[11px] opacity-80">
                      ₹{v.salePrice || v.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Olfactory Notes Box */}
          {product.notes && (
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-3 text-xs shadow-sm">
              <div className="flex items-center gap-1.5 text-amber-700 font-mono text-[10px] tracking-widest uppercase font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OLFACTORY PYRAMID</span>
              </div>
              <div className="space-y-2 pt-1">
                {product.notes.top && (
                  <div>
                    <span className="text-neutral-800 font-mono font-semibold uppercase text-[10px] tracking-wider block">
                      TOP NOTES (Initial Sillage):
                    </span>
                    <p className="text-neutral-600 mt-0.5">
                      {product.notes.top.join(' • ')}
                    </p>
                  </div>
                )}
                {product.notes.middle && (
                  <div>
                    <span className="text-neutral-800 font-mono font-semibold uppercase text-[10px] tracking-wider block">
                      HEART NOTES (Core Soul):
                    </span>
                    <p className="text-neutral-600 mt-0.5">
                      {product.notes.middle.join(' • ')}
                    </p>
                  </div>
                )}
                {product.notes.base && (
                  <div>
                    <span className="text-neutral-800 font-mono font-semibold uppercase text-[10px] tracking-wider block">
                      BASE NOTES (Lingering Drydown):
                    </span>
                    <p className="text-neutral-600 mt-0.5">
                      {product.notes.base.join(' • ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quantity & Buy Buttons */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-4">
              <span className="text-xs text-neutral-700 uppercase tracking-wider font-semibold">Quantity:</span>
              <div className="flex items-center bg-white border border-neutral-300 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-xs font-mono font-bold text-neutral-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-neutral-500">
                Availability: {' '}
                <span className={product.status === 'available' ? 'text-emerald-600 font-semibold' : 'text-red-500 font-semibold'}>
                  {product.status === 'available' ? 'In Stock (Ready for Dispatch)' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                id="add-to-cart-product-detail-btn"
                disabled={product.status === 'out_of_stock'}
                onClick={handleAddToCart}
                className="py-4 bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-black text-xs tracking-[0.16em] uppercase rounded-xl transition-all disabled:opacity-40 cursor-pointer shadow-xl flex items-center justify-center gap-2 border border-amber-500/30"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>
              <button
                id="buy-now-product-detail-btn"
                disabled={product.status === 'out_of_stock'}
                onClick={handleBuyNow}
                className="py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-neutral-950 font-black text-xs tracking-[0.16em] uppercase rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>BUY NOW</span>
              </button>
            </div>
          </div>

          {/* Delivery & Security Badges */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200 space-y-2.5 text-xs text-neutral-600 shadow-sm">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>Fast Pan-India Express Delivery (3-5 Business Days)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>Direct WhatsApp Orders &amp; Shockproof Protective Packing</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Authentic Formulation • Berhampur, Odisha Boutique</span>
            </div>
          </div>

          {/* Direct WhatsApp Inquiry */}
          <div className="pt-2 text-center">
            <a
              href={`https://wa.me/${whatsappTarget}?text=${encodeURIComponent(`Hello ${brand}, I have a query about ${product.name} (${selectedVariant.volume}).`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs text-emerald-700 hover:text-emerald-800 uppercase tracking-wider font-semibold"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Have questions about this item? WhatsApp Us (+91 {rawNum})</span>
            </a>
          </div>

        </div>

      </div>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-neutral-300 space-y-6">
          <div>
            <span className="text-xs text-amber-700 uppercase tracking-[0.25em] font-mono font-semibold block mb-1">
              OLFACTORY MATCHES
            </span>
            <h2 className="font-serif text-2xl text-neutral-900 font-bold tracking-tight">
              You May Also Appreciate
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setCurrentPage('product-detail', { productId: p.id });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-2xl p-4 border border-neutral-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="w-full h-[220px] bg-[#FAF8F5] rounded-xl overflow-hidden p-2 flex items-center justify-center border border-neutral-100">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-1 group-hover:scale-108 transition-transform duration-500" />
                </div>
                <div className="pt-3 text-center space-y-1">
                  <h4 className="font-serif font-bold text-neutral-900 text-sm truncate">{p.name}</h4>
                  <span className="font-mono text-amber-700 font-bold text-xs block">
                    ₹{p.salePrice || p.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
