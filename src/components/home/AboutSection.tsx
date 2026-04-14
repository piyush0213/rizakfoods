'use client';

import React from 'react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function AboutSection() {
  return (
    <section className="py-24 bg-[var(--color-brand-dark)] text-white relative overflow-hidden">
      {/* Abstract wave background */}
      <div className="absolute inset-0 opacity-10">
         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[var(--color-brand-blue)] fill-current">
            <path d="M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z" />
         </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <AnimatedSection direction="right" className="space-y-8">
            <h2 className="text-sm font-bold text-[var(--color-brand-gold)] tracking-widest uppercase">
              About Us
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              A Cornerstone of <br/>
              <span className="text-[var(--color-brand-blue)]">Punjab's Dairy Tradition</span>
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              Nestled in the heart of India's dairy land, Rizak Foods combines time-honored practices with cutting-edge technology to ensure every drop meets the highest standards of quality and taste.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              More than just a processing plant; it's a promise of purity, a taste of Punjab's rich agricultural heritage, and a dedication to your family's health and well-being.
            </p>
            
            <div className="pt-4 flex items-center gap-6">
              <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10 glass">
                <span className="block text-3xl font-bold font-serif text-[var(--color-brand-gold)] mb-1">2023</span>
                <span className="text-sm text-gray-400 uppercase tracking-wider">Incorporated</span>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10 glass">
                <span className="block text-3xl font-bold font-serif text-[var(--color-brand-gold)] mb-1">100%</span>
                <span className="text-sm text-gray-400 uppercase tracking-wider">Pure & Safe</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.2} className="grid grid-cols-2 gap-4">
  <div className="space-y-4 pt-12">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-800 relative group">
                <Image src="/uploads/1000167451.jpg" alt="Dairy Farming" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--color-brand-blue)]/20 p-6 flex flex-col justify-end relative">
                <h4 className="font-bold text-xl mb-2 text-white">Farmer Partnership</h4>
                <p className="text-sm text-blue-200">Equitable and supportive relationships with our local dairy farmers.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--color-brand-gold)]/20 p-6 flex flex-col justify-end relative">
                 <h4 className="font-bold text-xl mb-2 text-white">Strict Quality</h4>
                <p className="text-sm text-yellow-200">Rigorous sourcing, testing, and advanced processing hygiene.</p>
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-800 relative group">
                <Image src="/uploads/1000167436.jpg" alt="Quality Processing" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
