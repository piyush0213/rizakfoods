'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function RegisterInterestModal() {
  const { interestModalProduct, closeInterestModal } = useUIStore();
  const [formData, setFormData] = useState({ name: '', phone: '', pincode: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!interestModalProduct) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productInterest: interestModalProduct.name,
          productCategory: interestModalProduct.category
        })
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          closeInterestModal();
          setSuccess(false);
          setFormData({ name: '', phone: '', pincode: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[var(--color-brand-dark)]/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={closeInterestModal}
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-[var(--color-brand-cream)] p-6 md:p-8 flex items-start justify-between border-b border-gray-100">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[var(--color-brand-dark)]">Register Interest</h3>
              <p className="text-gray-600 mt-1">For {interestModalProduct.name}</p>
            </div>
            <button 
              onClick={closeInterestModal}
              className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-[var(--color-brand-dark)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            {success ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-[var(--color-brand-gold)] mb-4" />
                <h4 className="text-xl font-bold text-[var(--color-brand-dark)] mb-2">Thank You!</h4>
                <p className="text-gray-600">
                  We've registered your interest for {interestModalProduct.name}. We'll notify you as soon as we start deliveries in your area.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-gray-500 mb-6">
                  Currently, our fresh range is available in select PIN codes. Leave your details below.
                </p>
                
                <Input 
                  label="Full Name" 
                  required 
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Phone Number" 
                    required 
                    type="tel"
                    placeholder="10-digit mobile"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <Input 
                    label="Delivery PIN Code" 
                    required 
                    placeholder="e.g. 140001"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  fullWidth 
                  isLoading={loading}
                  className="mt-6"
                >
                  Submit Interest
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
