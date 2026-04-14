'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

export function FeaturedGhee() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <AnimatedSection direction="right" className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[var(--color-brand-gold)]/10 rounded-full blur-3xl transform -translate-x-10 translate-y-10" />
            <div className="relative aspect-square max-w-lg mx-auto bg-[var(--color-brand-cream)] rounded-[2rem] overflow-hidden border border-white/50 shadow-2xl p-8 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent" />
              {/* Note: In a real environment, replace this with the generated ghee product image */}
              <div className="w-3/4 h-3/4 relative z-10 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-2">
                 <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden relative">
                   <Image src="/uploads/1000167449.png" alt="Premium A2 Desi Ghee" fill className="object-cover" />
                 </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" className="lg:w-1/2" delay={0.2}>
            <div className="max-w-xl">
              <h2 className="text-sm font-bold text-[var(--color-brand-gold)] tracking-widest uppercase mb-4">
                Signature Product
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-dark)] mb-6 leading-tight">
                Premium A2 <br />Desi Ghee
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Made from pure milk cream (malai) using our time-honored traditional practices. 
                Rich in healthy fats and fat-soluble vitamins (A, D, E, K), our ghee boosts digestion 
                and supports immunity. No artificial colors or preservatives — just pure, golden health.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Made from 100% pure milk cream',
                  'Boosts digestion & gut health',
                  'Rich in natural vitamins',
                  'FSSAI Certified Quality'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium text-lg">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/shop?category=ghee">
                <Button size="lg" className="w-full sm:w-auto px-12 py-4 text-lg">
                  Shop Ghee Now
                </Button>
              </Link>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
