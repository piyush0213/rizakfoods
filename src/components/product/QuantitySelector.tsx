'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (q: number) => void;
  max?: number;
}

export function QuantitySelector({ quantity, setQuantity, max = 10 }: QuantitySelectorProps) {
  const handleDecrease = () => setQuantity(Math.max(1, quantity - 1));
  const handleIncrease = () => setQuantity(Math.min(max, quantity + 1));

  return (
    <div className="flex items-center">
      <button 
        type="button"
        onClick={handleDecrease}
        className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-l-lg bg-gray-50 hover:bg-gray-100 text-[var(--color-brand-dark)] transition-colors"
        disabled={quantity <= 1}
      >
        <Minus className="w-4 h-4" />
      </button>
      
      <div className="w-12 h-10 flex items-center justify-center border-y border-gray-200 font-medium font-serif text-[var(--color-brand-dark)]">
        {quantity}
      </div>
      
      <button 
        type="button"
        onClick={handleIncrease}
        className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-r-lg bg-gray-50 hover:bg-gray-100 text-[var(--color-brand-dark)] transition-colors"
        disabled={quantity >= max}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
