import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

interface AmBrandEmblemProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showSubtitle?: boolean;
  interactive?: boolean;
}

export const AmBrandEmblem: React.FC<AmBrandEmblemProps> = ({
  className = '',
  size = 'hero',
  showSubtitle = false,
  interactive = false,
}) => {
  let settingsLogo = '';
  try {
    const { settings } = useStore();
    settingsLogo = settings.logoUrl || '';
  } catch (e) {}

  const logoSources = [
    '/official_logo.jpg?v=5.0',
    '/new_luxury_logo.jpg?v=5.0',
    '/brand_logo.png?v=5.0',
    settingsLogo,
  ].filter(Boolean);

  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  const dimensionMap = {
    xs: 'w-12 h-12 sm:w-14 sm:h-14',
    sm: 'w-16 h-16 sm:w-18 sm:h-18',
    md: 'w-28 h-28 sm:w-32 sm:h-32',
    lg: 'w-36 h-36 sm:w-42 sm:h-42',
    xl: 'w-48 h-48 sm:w-52 sm:h-52',
    hero: 'w-38 h-38 sm:w-44 sm:h-44',
  };

  const dim = dimensionMap[size];

  const handleImageError = () => {
    if (currentSourceIndex < logoSources.length - 1) {
      setCurrentSourceIndex((prev) => prev + 1);
    } else {
      setImageFailed(true);
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Clean Luxury Emblem Frame - Edge-to-Edge Logo */}
      <div
        className={`relative ${dim} flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 border border-amber-400/50 shadow-lg bg-black ${
          interactive ? 'hover:scale-105' : ''
        }`}
      >
        {!imageFailed ? (
          <img
            src={logoSources[currentSourceIndex]}
            alt="MEZRAAN PERFUME Logo"
            className="w-full h-full object-cover rounded-full"
            onError={handleImageError}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-neutral-900 to-black text-amber-300 flex items-center justify-center font-serif font-black tracking-tighter text-xs sm:text-base border border-amber-400/40">
            MP
          </div>
        )}
      </div>

      {showSubtitle && size !== 'xs' && size !== 'sm' && (
        <div className="mt-3 text-center space-y-1">
          <p className="text-[10px] font-sans tracking-[0.25em] text-amber-300 uppercase font-bold">
            MEZRAAN PERFUME
          </p>
          <p className="text-[9px] tracking-widest text-neutral-400 uppercase font-mono">
            BERHAMPUR, ODISHA
          </p>
        </div>
      )}
    </div>
  );
};

export const IqbalAzmiBrandTree = AmBrandEmblem;
