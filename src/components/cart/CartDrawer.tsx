'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const { isCartOpen, toggleCart } = useUIStore();
  const { items, updateQuantity, removeItem, getTotals } = useCartStore();
  const { total, subtotal } = getTotals();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[var(--color-brand-dark)]/60 backdrop-blur-sm shadow-2xl"
          onClick={toggleCart} // Close when clicking overlay
        >
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-white flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Stop event bubbling
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-serif text-2xl font-bold text-[var(--color-brand-dark)]">Your Cart</h2>
              <button 
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-[var(--color-brand-dark)]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                  <p className="font-medium">Your cart is empty</p>
                  <Button variant="outline" className="mt-8" onClick={toggleCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center border border-gray-100 shrink-0 object-cover">
                         {item.image ? (
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                         ) : (
                           <span className="text-[10px] text-gray-400">Image</span>
                         )}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                             <h4 className="font-bold text-[var(--color-brand-dark)] line-clamp-1">{item.name}</h4>
                             <button onClick={() => removeItem(item.productId, item.size)} className="text-gray-400 hover:text-red-500 transition-colors">
                               <Trash2 className="w-4 h-4" />
                             </button>
                          </div>
                          {item.size && <p className="text-xs text-gray-500">{item.size}</p>}
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center bg-white rounded-md border border-gray-200">
                            <button className="px-2.5 py-1 text-gray-600 focus:outline-none" onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size)}>-</button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button className="px-2.5 py-1 text-gray-600 focus:outline-none" onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size)}>+</button>
                          </div>
                          <p className="font-bold text-[var(--color-brand-blue)]">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-[var(--color-brand-cream)] border-t border-gray-100 shrink-0">
                <div className="flex justify-between mb-2">
                   <span className="text-gray-600">Subtotal</span>
                   <span className="font-bold text-[var(--color-brand-dark)]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between mb-4">
                   <span className="text-gray-600">Shipping</span>
                   <span className="text-gray-600">Calculated at checkout</span>
                </div>
                
                <Link href="/checkout" onClick={toggleCart}>
                  <Button fullWidth size="lg">
                    Checkout • ₹{subtotal}
                  </Button>
                </Link>
              </div>
            )}
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
