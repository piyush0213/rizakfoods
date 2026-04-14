'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const isPurchasable = product.type === 'purchasable';
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <Link href={`/product/${product.slug}`} className="group h-full flex flex-col">
      <motion.div 
        className="bg-white rounded-[2rem] p-4 flex flex-col h-full border border-gray-100 shadow-sm relative overflow-hidden"
        whileHover={{ 
          y: -6, 
          boxShadow: '0 20px 40px -12px rgba(0, 114, 206, 0.15)',
          borderColor: 'rgba(245, 197, 24, 0.3)',
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Image Container */}
        <div className="aspect-[4/5] w-full bg-gray-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
           {imageUrl ? (
             <Image 
               src={imageUrl} 
               alt={product.name} 
               fill
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               className="object-cover transition-transform duration-500 group-hover:scale-110 z-10"
             />
           ) : (
             <div className="flex flex-col items-center justify-center gap-2 text-gray-300 z-10">
               <Package className="w-12 h-12" />
               <span className="text-sm font-medium">{product.name}</span>
             </div>
           )}
           
           {/* Badge */}
           {product.category === 'ghee' && (
             <motion.div 
               className="absolute top-4 left-4 bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] text-xs font-bold px-3 py-1 rounded-full z-20 shadow-sm"
               initial={{ scale: 0, rotate: -10 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.3 }}
             >
               Bestseller
             </motion.div>
           )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col relative z-20">
          <div className="flex items-start justify-between gap-4 mb-2">
             <h3 className="font-serif text-xl font-bold text-[var(--color-brand-dark)] group-hover:text-[var(--color-brand-blue)] transition-colors">
               {product.name}
             </h3>
             <span className="font-bold text-lg whitespace-nowrap text-gray-800">₹{product.price}</span>
          </div>
          
          <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-2">
            {product.shortDescription || product.description}
          </p>
          
          {/* Action Button */}
          {isPurchasable ? (
            <Button className="w-full relative overflow-hidden group/btn">
               <span className="relative z-10">View Options</span>
               <div className="absolute inset-0 bg-[var(--color-brand-blue-hover)] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
            </Button>
          ) : (
            <Button variant="outline" className="w-full">
              Register Interest
            </Button>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
