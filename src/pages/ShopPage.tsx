import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Search, SlidersHorizontal, X, ArrowUpDown, Star, Plus, Eye, Sparkles, Filter } from 'lucide-react';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const { products, categories, pageParams, setCurrentPage, addToCart, settings, showToast } = useStore();

  const [searchQuery, setSearchQuery] = useState<string>(pageParams?.search || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(pageParams?.category || 'All');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const brand = settings.brandName || "MEZRAAN PERFUME";
  const whatsappNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || "7788993123";
  const whatsappTarget = whatsappNum.length === 10 ? `91${whatsappNum}` : whatsappNum;

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const queryMatch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ((p as any).brand && (p as any).brand.toLowerCase().includes(searchQuery.toLowerCase()));

      const categoryMatch =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'New Arrivals' && p.newArrival) ||
        (selectedCategory === 'Best Sellers' && p.bestSeller);

      const actualPrice = p.salePrice || p.price;
      const priceMatch = actualPrice <= maxPrice;
      const stockMatch = !inStockOnly || p.status === 'available';

      return queryMatch && categoryMatch && priceMatch && stockMatch;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      if (selectedSort === 'price-low') return priceA - priceB;
      if (selectedSort === 'price-high') return priceB - priceA;
      if (selectedSort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (selectedSort === 'bestselling') return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, searchQuery, selectedCategory, selectedSort, maxPrice, inStockOnly]);

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] min-h-screen pb-20 font-sans selection:bg-amber-300 selection:text-neutral-950">
      
      {/* 1. SHOP HEADER BANNER (SOFT OBSIDIAN & GOLD) */}
      <section className="bg-[#141414] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-500/20 text-center space-y-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-2 relative z-10">
          <span className="text-[10px] sm:text-xs text-amber-400 uppercase tracking-[0.3em] font-mono font-bold block">
            {brand} FRAGRANCE CATALOGUE • BERHAMPUR, ODISHA
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white font-light uppercase tracking-wider drop-shadow-md">
            THE COMPLETE COLLECTION
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-light">
            Hand-crafted French Eau de Parfums, 100% non-alcoholic concentrated attar oils, and exclusive gift sets.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Pills Bar */}
        <div className="flex overflow-x-auto scrollbar-none gap-2 sm:gap-3 pb-6 select-none" style={{ scrollbarWidth: 'none' }}>
          {[
            { id: 'All', label: 'ALL FRAGRANCES' },
            { id: 'Luxury Perfumes (EDP)', label: 'EAU DE PARFUM' },
            { id: 'Attar (Pure Non-Alcoholic)', label: 'PURE ATTARS' },
            { id: 'Royal Bakhoor & Dhoop', label: 'BAKHOOR & INCENSE' },
            { id: 'Deals & Combos', label: 'DEALS & COMBOS' },
            { id: 'Best Sellers', label: 'BEST SELLERS' },
            { id: 'New Arrivals', label: 'NEW ARRIVALS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === tab.id
                  ? 'bg-neutral-950 text-amber-400 border-amber-500 shadow-md font-bold'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-amber-400 hover:text-neutral-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by notes, name or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-neutral-200 focus:border-amber-500 text-neutral-900 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & Quick Stats */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs font-mono text-neutral-500">
              Showing <span className="font-bold text-neutral-900">{filteredProducts.length}</span> fragrances
            </span>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl px-3 py-2 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-700" />
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-transparent text-neutral-800 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="bestselling">Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID (ENLARGED DISPLAY + CREAMY & SOFT BLACK REMIX) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-5 border border-neutral-200 hover:border-amber-400 transition-all shadow-md hover:shadow-xl flex flex-col justify-between group"
            >
              {/* Product Image Frame (MUCH LARGER: 320px - 380px) */}
              <div
                onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                className="w-full h-[300px] sm:h-[360px] bg-[#FAF8F5] rounded-2xl overflow-hidden p-3 relative cursor-pointer flex items-center justify-center border border-neutral-100"
              >
                <img
                  src={product.images[0] || '/IMG-20261004-WA0054.jpg'}
                  alt={product.name}
                  className="w-full h-full object-contain p-2 group-hover:scale-108 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.bestSeller && (
                    <span className="bg-neutral-950 text-amber-300 text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full uppercase border border-amber-500/40">
                      BESTSELLER
                    </span>
                  )}
                  {product.newArrival && (
                    <span className="bg-amber-600 text-white text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full uppercase">
                      NEW ARRIVAL
                    </span>
                  )}
                </div>

                {/* Quick Add and View Buttons */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="p-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 shadow-md transition-colors cursor-pointer"
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                      showToast(`${product.name} added to cart!`);
                    }}
                    className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-bold shadow-md transition-all cursor-pointer border border-amber-500/30"
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Information */}
              <div className="mt-4 space-y-1.5 text-left">
                <span className="text-[10px] font-mono tracking-widest text-amber-700 uppercase block font-semibold">
                  {product.category}
                </span>
                <h3
                  onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                  className="font-serif text-lg font-bold text-neutral-900 uppercase tracking-wide truncate cursor-pointer hover:text-amber-700 transition-colors"
                >
                  {product.name}
                </h3>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl font-bold text-neutral-950">
                      ₹ {(product.salePrice || product.price).toLocaleString('en-IN')}
                    </span>
                    {product.salePrice && (
                      <span className="text-xs text-neutral-400 line-through font-mono">
                        ₹ {product.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-neutral-500">{product.volume}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 p-8 space-y-3 my-8 shadow-sm">
            <Sparkles className="w-10 h-10 text-amber-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-neutral-900">No Fragrances Found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your search keywords or select a different fragrance category tab.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-6 py-2.5 bg-neutral-950 text-amber-400 text-xs uppercase font-bold tracking-widest rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer border border-amber-500/30"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* QUICK VIEW POPUP MODAL (CREAMY WHITE & SOFT BLACK THEME) */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-neutral-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative border border-amber-500/40 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-full h-[280px] bg-[#FAF8F5] rounded-2xl overflow-hidden p-3 border border-neutral-200 flex items-center justify-center">
                <img src={quickViewProduct.images[0] || '/IMG-20261004-WA0054.jpg'} alt={quickViewProduct.name} className="w-full h-full object-contain" />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-700 uppercase font-bold">
                  {quickViewProduct.category}
                </span>
                <h3 className="font-serif text-2xl font-bold uppercase tracking-wide text-neutral-900">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  {quickViewProduct.description}
                </p>
                <div className="mt-3 font-serif text-2xl font-bold text-neutral-950">
                  ₹ {(quickViewProduct.salePrice || quickViewProduct.price).toLocaleString('en-IN')}
                </div>
              </div>

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
        </div>
      )}

    </div>
  );
};
