'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from './QuantitySelector';
import { PincodeChecker } from './PincodeChecker';
import { RegisterInterestModal } from './RegisterInterestModal';
import { ShieldCheck, Info } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface ProductInfoProps {
  product: any;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { openInterestModal, toggleCart } = useUIStore();

  const isPurchasable = product.type === 'purchasable';
  const price = selectedSize ? selectedSize.price : product.price;

  const handleAddToCart = () => {
    addItem({
      productId: product._id || product.slug,
      name: product.name,
      price: price,
      quantity,
      image: product.images?.[0] || '',
      size: selectedSize?.label
    });
    toggleCart(); // Open cart sidebar to give visual feedback
  };

  const handleRegisterInterest = () => {
    openInterestModal({ id: product._id || product.slug, name: product.name, category: product.category });
  };

  return (
    <div className="flex flex-col h-full">
      <RegisterInterestModal />
      
      <AnimatedSection direction="left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-dark)] mb-2">
          {product.name}
        </h1>
        
        {/* Rating Mockup */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-[var(--color-brand-gold)]">
             {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill={i < Math.floor(product.rating || 5) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
             ))}
          </div>
          <span className="text-sm text-gray-500 underline cursor-pointer">{product.reviewCount || 10} reviews</span>
        </div>

        <div className="text-3xl font-bold text-[var(--color-brand-dark)] mb-8">
          ₹{price} <span className="text-sm text-gray-500 font-normal ml-2">Inclusive of all taxes</span>
        </div>

        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          {product.description}
        </p>

        {/* Benefits (if any) */}
        {product.benefits && product.benefits.length > 0 && (
          <div className="mb-8 p-6 bg-[var(--color-brand-cream)] rounded-2xl border border-white">
             <h4 className="font-bold text-[var(--color-brand-dark)] mb-4 flex items-center gap-2">
               <ShieldCheck className="w-5 h-5 text-[var(--color-brand-gold)]" /> Product Benefits
             </h4>
             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {product.benefits.map((b: string, i: number) => (
                 <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)] mt-2 shrink-0" />
                    {b}
                 </li>
               ))}
             </ul>
          </div>
        )}

        <hr className="border-gray-100 my-8" />

        {isPurchasable ? (
          <div className="space-y-8">
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h4 className="font-medium text-[var(--color-brand-dark)] mb-3">Select Size</h4>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size: any) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-3 rounded-xl border-2 font-medium transition-all ${
                        selectedSize?.label === size.label 
                          ? 'border-[var(--color-brand-blue)] bg-blue-50 text-[var(--color-brand-blue)]' 
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <PincodeChecker />

            <div className="flex items-center gap-4 pt-4">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} max={product.stock > 0 ? product.stock : 10} />
              <Button size="lg" className="flex-1 text-lg py-6 shadow-xl shadow-blue-500/20" onClick={handleAddToCart} disabled={product.stock === 0}>
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        ) : (
           <div className="bg-yellow-50/50 p-6 rounded-2xl border border-yellow-100 text-center">
             <div className="flex justify-center mb-4 text-[var(--color-brand-gold)]">
               <Info className="w-10 h-10" />
             </div>
             <h4 className="font-bold text-lg text-[var(--color-brand-dark)] mb-2">Available in Select Areas</h4>
             <p className="text-gray-600 mb-6 text-sm max-w-md mx-auto">
               Due to the highly perishable nature of our fresh range, we currently supply this directly from our farm to select PIN codes.
             </p>
             <Button size="lg" variant="secondary" onClick={handleRegisterInterest}>
               Register Interest
             </Button>
           </div>
        )}

      </AnimatedSection>
    </div>
  );
}
