'use client';

import React, { useState, useEffect } from 'react';
import { Truck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;
    
    // Show after scrolling a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 border border-gray-100 p-4 pr-12 relative flex items-center gap-4">
             <button 
               onClick={() => setIsDismissed(true)}
               className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors p-1"
             >
               <X className="w-4 h-4" />
             </button>
             
             <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
               <Truck className="w-5 h-5 text-[var(--color-brand-blue)]" />
             </div>
             
             <div>
               <h4 className="font-bold text-[var(--color-brand-dark)] text-sm">Free Delivery</h4>
               <p className="text-xs text-gray-500">On all orders above ₹1000</p>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
