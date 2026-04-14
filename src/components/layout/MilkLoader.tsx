'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MilkLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for the premium feel loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-brand-cream)] overflow-hidden"
        >
          {/* Background Pour Effect */}
          <div className="absolute inset-0 w-full h-full bg-white opacity-40 animate-[milk-pour_2s_cubic-bezier(0.4,0,0.2,1)_infinite]" style={{ transformOrigin: 'top' }} />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[var(--color-brand-blue)] mb-4 tracking-wider">
              Rizak Foods
            </h1>
            <p className="text-[var(--color-brand-dark)] uppercase tracking-[0.2em] text-sm">
              Diet Good, Life Good
            </p>
            
            <div className="mt-8 w-48 h-1 bg-[var(--color-brand-blue)]/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[var(--color-brand-blue)] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
