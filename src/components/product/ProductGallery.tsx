'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package } from 'lucide-react';

interface ProductGalleryProps {
  images?: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const hasImages = images && images.length > 0 && images[0] !== '';

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      {/* Main Image */}
      <div className="aspect-square bg-white rounded-3xl border border-gray-100 flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand-gold)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full h-full relative flex items-center justify-center"
          >
            {hasImages && images[activeIdx] ? (
              <img
                src={images[activeIdx]}
                alt={`${productName} - Image ${activeIdx + 1}`}
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-gray-300">
                <Package className="w-20 h-20" />
                <span className="text-gray-400 font-medium">{productName}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative w-20 h-20 shrink-0 rounded-xl bg-white border-2 overflow-hidden transition-all duration-300 ${
                idx === activeIdx ? 'border-[var(--color-brand-gold)] shadow-md' : 'border-gray-100 opacity-70 hover:opacity-100'
              }`}
            >
              {img ? (
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-2 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-400">{idx + 1}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
