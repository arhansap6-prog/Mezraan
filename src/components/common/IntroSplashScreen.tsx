import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../context/StoreContext';

interface IntroSplashScreenProps {
  onComplete?: () => void;
}

export const IntroSplashScreen: React.FC<IntroSplashScreenProps> = ({ onComplete }) => {
  const { settings } = useStore();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isWelcomeState, setIsWelcomeState] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Ultra-smooth luxury loading progress timer (~1.4s)
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsWelcomeState(true);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 700);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 bg-[#080808] text-white flex flex-col items-center justify-center p-6 select-none cursor-pointer overflow-hidden"
        onClick={() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }}
      >
        {/* Background ambient luxury glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-lg w-full text-center space-y-8 relative z-10">
          {/* Brand Logo & Typography */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-3"
          >
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.25em] font-light uppercase text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              {settings.brandName || "MEZRAAN PERFUME"}
            </h1>
            <p className="text-[11px] sm:text-xs tracking-[0.45em] uppercase text-amber-300 font-sans font-medium">
              LUXURY FRAGRANCES
            </p>
            <div className="w-12 h-[1px] bg-amber-400/50 mx-auto my-3" />
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 font-sans italic">
              {settings.brandTagline || "Pure Non-Alcoholic Attar & French Luxury Perfumes"}
            </p>
          </motion.div>

          {/* Luxury Loading Bar & Status */}
          <div className="w-56 sm:w-72 mx-auto pt-6 space-y-4">
            {!isWelcomeState ? (
              <>
                <div className="h-[2px] w-full bg-neutral-900 rounded-full overflow-hidden shadow-inner border border-neutral-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                    style={{ width: `${loadingProgress}%` }}
                    transition={{ ease: 'easeOut', duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-sans font-semibold">
                  <span>LOADING</span>
                  <span className="text-amber-300 font-mono">{loadingProgress}%</span>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-2.5"
              >
                <div className="text-xs tracking-[0.4em] uppercase text-amber-300 font-serif font-bold">
                  WELCOME
                </div>
                <div className="h-[1px] w-28 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Skip hint */}
        <div className="absolute bottom-10 text-[9px] tracking-[0.25em] text-neutral-500 uppercase font-sans font-medium animate-pulse">
          Tap anywhere to explore
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
