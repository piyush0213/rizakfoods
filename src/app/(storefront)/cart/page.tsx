'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotals } = useCartStore();
  const { subtotal } = getTotals();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[var(--color-brand-cream)] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif text-[var(--color-brand-dark)] mb-6">Your Cart is Empty</h1>
        <Link href="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[var(--color-brand-cream)]">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection direction="up">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-dark)] mb-10">
            Shopping Cart
          </h1>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items List */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden">
                       {item.image ? (
                         <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                       ) : (
                         <span className="text-xs text-gray-400">Image</span>
                       )}
                    </div>
                    
                    <div className="flex-1 flex flex-col md:flex-row justify-between w-full md:items-center gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-[var(--color-brand-dark)]">{item.name}</h3>
                        {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                        <p className="font-bold text-[var(--color-brand-blue)] mt-1">₹{item.price}</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                          <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100" onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size)}>-</button>
                          <span className="text-sm font-bold w-8 text-center">{item.quantity}</span>
                          <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100" onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size)}>+</button>
                        </div>
                        <button onClick={() => removeItem(item.productId, item.size)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                           <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-24">
                <h3 className="font-serif text-2xl font-bold text-[var(--color-brand-dark)] mb-6">Order Summary</h3>
                
                <div className="space-y-4 text-gray-600 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[var(--color-brand-dark)]">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Calculated at next step</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-[var(--color-brand-dark)]">Total</span>
                    <span className="font-bold text-2xl text-[var(--color-brand-blue)]">₹{subtotal}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 text-right">Tax included</p>
                </div>

                <Link href="/checkout">
                  <Button size="lg" fullWidth className="font-bold text-lg py-6 shadow-lg shadow-blue-500/20">
                    Proceed to Checkout
                  </Button>
                </Link>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure SSL Checkout
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
