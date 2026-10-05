import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, User, Search, ShieldCheck, Menu, X, Sparkles, Instagram } from 'lucide-react';
import { AmBrandEmblem } from '../brand/AmBrandEmblem';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cart,
    currentUser,
    isAdminLoggedIn,
    settings
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('shop', { search: searchQuery });
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className={currentPage === 'home' ? 'absolute top-0 left-0 right-0 z-40' : 'sticky top-0 z-40'}>
      {/* Main Luxury Header */}
      <header className={`transition-all duration-300 w-full overflow-hidden ${
        currentPage === 'home'
          ? 'bg-gradient-to-b from-black/90 via-black/60 to-transparent text-white'
          : 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-amber-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)] text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-4 overflow-hidden">
          
          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 transition-colors shrink-0 text-white hover:text-amber-400"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
          </button>

          {/* Brand Logo & Name */}
          <div
            onClick={() => setCurrentPage('home')}
            className="cursor-pointer group flex items-center gap-2.5 sm:gap-4 select-none min-w-0 flex-1 overflow-hidden"
          >
            <div className="shrink-0 flex items-center justify-center">
              <AmBrandEmblem size="xs" showSubtitle={false} interactive={false} />
            </div>
            <div className="flex flex-col items-start min-w-0 overflow-hidden">
              <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 max-w-full">
                <span className="font-serif text-lg xs:text-xl sm:text-2xl md:text-3xl font-black tracking-wider transition-colors uppercase truncate text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] group-hover:text-amber-300">
                  {settings.brandName || "MEZRAAN PERFUME"}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 border rounded-xs font-sans font-bold hidden md:inline-block shrink-0 shadow-2xs text-amber-300 border-amber-400/60 bg-amber-500/10 backdrop-blur-xs">
                  BERHAMPUR
                </span>
              </div>
              <span className="text-[9px] xs:text-[10px] sm:text-[12px] tracking-widest font-bold uppercase -mt-0.5 transition-colors truncate max-w-[200px] xs:max-w-[280px] sm:max-w-none text-amber-300/90 group-hover:text-amber-200">
                {settings.brandTagline || "Pure Non-Alcoholic Attar & French Luxury Perfumes"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.2em] font-medium uppercase shrink-0 text-neutral-300">
            <button
              id="nav-link-home"
              onClick={() => setCurrentPage('home')}
              className={`hover:text-amber-300 transition-colors py-1 relative ${
                currentPage === 'home' ? 'text-amber-300 font-bold' : ''
              }`}
            >
              HOME
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              )}
            </button>
            <button
              id="nav-link-shop"
              onClick={() => setCurrentPage('shop')}
              className={`hover:text-amber-300 transition-colors py-1 relative ${
                currentPage === 'shop' ? 'text-amber-300 font-bold' : ''
              }`}
            >
              ALL PERFUMES
              {currentPage === 'shop' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              )}
            </button>
            <button
              id="nav-link-collections"
              onClick={() => setCurrentPage('collections')}
              className={`hover:text-amber-300 transition-colors py-1 relative ${
                currentPage === 'collections' ? 'text-amber-300 font-bold' : ''
              }`}
            >
              COLLECTIONS
              {currentPage === 'collections' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              )}
            </button>
            <button
              id="nav-link-about"
              onClick={() => setCurrentPage('about')}
              className={`hover:text-amber-300 transition-colors py-1 relative ${
                currentPage === 'about' ? 'text-amber-300 font-bold' : ''
              }`}
            >
              ABOUT US
              {currentPage === 'about' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              )}
            </button>
            <button
              id="nav-link-contact"
              onClick={() => setCurrentPage('contact')}
              className={`hover:text-amber-300 transition-colors py-1 relative ${
                currentPage === 'contact' ? 'text-amber-300 font-bold' : ''
              }`}
            >
              CONTACT
              {currentPage === 'contact' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              )}
            </button>
            <button
              id="nav-link-wholesale"
              onClick={() => setCurrentPage('wholesale')}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black uppercase rounded-lg transition-all tracking-wider shadow-md hover:scale-105"
            >
              WHOLESALE 💼
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-auto">
            
            {/* Search Toggle */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                currentPage === 'home' ? 'text-white hover:text-amber-300 hover:bg-white/10' : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
              }`}
              title="Search Fragrances"
              aria-label="Search"
            >
              <Search className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            </button>

            {/* Store Owner Admin Shortcut (Visible ONLY to logged in admin) */}
            {isAdminLoggedIn && (
              <button
                onClick={() => setCurrentPage('admin-dashboard')}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-[10px] tracking-wider uppercase rounded-lg shadow-sm flex items-center gap-1 transition-all cursor-pointer"
                title="Go to Admin Panel"
              >
                <span>👑</span>
                <span className="hidden sm:inline">ADMIN</span>
              </button>
            )}

            {/* Customer Account Icon (Strictly for customers) */}
            <button
              id="header-account-btn"
              onClick={() => {
                if (currentUser?.role === 'superadmin' && isAdminLoggedIn) {
                  setCurrentPage('admin-dashboard');
                } else if (currentUser) {
                  setCurrentPage('customer-dashboard');
                } else {
                  setCurrentPage('login');
                }
              }}
              className={`p-1.5 sm:p-2 rounded-full transition-colors flex items-center gap-1.5 ${
                currentPage === 'home' ? 'text-white hover:text-amber-300 hover:bg-white/10' : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
              }`}
              title={currentUser ? currentUser.fullName : 'Login / Account'}
            >
              <User className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              {currentUser && (
                <span className={`hidden xl:inline text-[11px] font-medium tracking-wider truncate max-w-[100px] ${
                  currentPage === 'home' ? 'text-amber-200' : 'text-neutral-700'
                }`}>
                  {currentUser.fullName.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Instagram Profile Link */}
            <a
              id="header-instagram-btn"
              href={settings.instagramUrl || "https://www.instagram.com/mezraan01?stkn=MWlwdmkzczlvMjR6dQ=="}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-full transition-colors flex items-center justify-center text-white hover:text-pink-400 hover:bg-white/10"
              title="Follow on Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            </a>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setCurrentPage('cart')}
              className="p-1.5 sm:p-2 rounded-full transition-colors relative text-white hover:text-amber-300 hover:bg-white/10 cursor-pointer"
              title="Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-neutral-950 font-black text-[9px] sm:text-[10px] w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-lg border border-black">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Expandable Search Input Bar */}
        {isSearchOpen && (
          <div className="bg-[#121212] border-b border-amber-500/30 py-3 px-4 shadow-2xl">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-400" />
              <input
                id="search-input-field"
                type="text"
                placeholder="Search by perfume name, fragrance notes (e.g. Tuscan Leather, Oud, Amber, Rose)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-[#1a1a1a] border border-amber-500/30 rounded-lg px-3 py-2 text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400 text-sm tracking-wide"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold text-xs rounded-lg hover:brightness-110 uppercase tracking-widest transition-colors cursor-pointer"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0c0c0c] border-b border-amber-500/30 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2 text-sm sm:text-base tracking-[0.1em] uppercase font-bold text-neutral-200">
              
              {/* Home */}
              <button
                onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }}
                className="text-left py-3 px-3.5 rounded-xl bg-neutral-900 border border-amber-500/30 text-amber-300 font-bold flex items-center justify-between"
              >
                <span>🏠 Home</span>
              </button>

              {/* Wholesale Enquiry Option in Menu */}
              <button
                onClick={() => { setCurrentPage('wholesale'); setIsMobileMenuOpen(false); }}
                className="text-left py-3 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-black flex items-center justify-between shadow-md border border-amber-400 hover:brightness-105 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>💼 Wholesale Enquiry</span>
                </span>
                <span className="text-[10px] bg-black text-amber-300 px-2 py-0.5 rounded font-mono font-bold tracking-widest">BULK ORDERS</span>
              </button>

              {/* Latest Products */}
              <button
                onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }}
                className="text-left py-3 px-3.5 rounded-xl text-neutral-200 hover:bg-neutral-900 hover:text-amber-300 font-bold flex items-center justify-between transition-colors"
              >
                <span>Latest Products</span>
              </button>

              {/* Best Selling with Accordion */}
              <div>
                <button
                  onClick={() => setOpenCategory(openCategory === 'bestselling' ? null : 'bestselling')}
                  className="w-full text-left py-3 px-3.5 rounded-xl text-neutral-200 hover:bg-neutral-900 hover:text-amber-300 font-bold flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span>Best Selling</span>
                  <span>{openCategory === 'bestselling' ? '▲' : '▼'}</span>
                </button>
                {openCategory === 'bestselling' && (
                  <div className="pl-6 py-2.5 space-y-2 bg-[#141414] border border-amber-500/20 rounded-xl my-1 text-xs text-neutral-300 font-medium">
                    <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-1.5 hover:text-amber-300">Arabic Attars</button>
                    <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-1.5 hover:text-amber-300">Arabic Perfumes</button>
                    <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-1.5 hover:text-amber-300">French Attars</button>
                    <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-1.5 hover:text-amber-300">French Perfumes</button>
                  </div>
                )}
              </div>

              {/* Attars with Accordion */}
              <div>
                <button
                  onClick={() => setOpenCategory(openCategory === 'attars' ? null : 'attars')}
                  className="w-full text-left py-3 px-3.5 rounded-xl text-neutral-200 hover:bg-neutral-900 hover:text-amber-300 font-bold flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span>Attars (Non-Alcoholic)</span>
                  <span>{openCategory === 'attars' ? '▲' : '▼'}</span>
                </button>
                {openCategory === 'attars' && (
                  <div className="pl-6 py-2.5 space-y-2 bg-[#141414] border border-amber-500/20 rounded-xl my-1 text-xs text-neutral-300 font-medium">
                    <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-1.5 hover:text-amber-300">French Extraits</button>
                    <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-1.5 hover:text-amber-300">Arabic Concentrates</button>
                    <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-1.5 hover:text-amber-300">Pure Indian Attar</button>
                  </div>
                )}
              </div>

              {/* Perfumes with Accordion */}
              <div>
                <button
                  onClick={() => setOpenCategory(openCategory === 'perfumes' ? null : 'perfumes')}
                  className="w-full text-left py-3 px-3.5 rounded-xl text-neutral-200 hover:bg-neutral-900 hover:text-amber-300 font-bold flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span>Perfumes (EDP)</span>
                  <span>{openCategory === 'perfumes' ? '▲' : '▼'}</span>
                </button>
                {openCategory === 'perfumes' && (
                  <div className="pl-6 py-2.5 space-y-2 bg-[#141414] border border-amber-500/20 rounded-xl my-1 text-xs text-neutral-300 font-medium">
                    <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-1.5 hover:text-amber-300">French Luxury</button>
                    <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-1.5 hover:text-amber-300">Royal Oudh Collection</button>
                    <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-1.5 hover:text-amber-300">High Notes Collection</button>
                  </div>
                )}
              </div>

              {/* About Brand */}
              <button
                onClick={() => { setCurrentPage('about'); setIsMobileMenuOpen(false); }}
                className="text-left py-3 px-3.5 rounded-xl text-neutral-200 hover:bg-neutral-900 hover:text-amber-300 font-bold flex items-center justify-between transition-colors"
              >
                <span>About Mezraan</span>
              </button>

              {/* Contact / Showroom */}
              <button
                onClick={() => { setCurrentPage('contact'); setIsMobileMenuOpen(false); }}
                className="text-left py-3 px-3.5 rounded-xl text-neutral-200 hover:bg-neutral-900 hover:text-amber-300 font-bold flex items-center justify-between transition-colors"
              >
                <span>Berhampur Showroom</span>
              </button>
            </div>

            <div className="pt-3 flex flex-col gap-2 border-t border-neutral-800 text-xs">
              <a
                href={settings.instagramUrl || "https://www.instagram.com/mezraan01?stkn=MWlwdmkzczlvMjR6dQ=="}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-xs transition-opacity"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram</span>
              </a>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-amber-400 uppercase tracking-wider text-[11px] font-medium truncate max-w-[170px]">
                  {settings.brandName || "MEZRAAN PERFUME"}
                </span>
                
                <a
                  href={`tel:${settings.contactPhone?.split(',')[0].trim() || "7788993123"}`}
                  className="text-white font-mono font-medium hover:text-amber-400"
                >
                  +91 {settings.contactPhone?.split(',')[0].trim() || "7788993123"}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
