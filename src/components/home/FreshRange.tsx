'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const products = [
  {
    name: 'Fresh Farm Milk',
    description: '100% pure, unadulterated farm-fresh milk delivered right to your doorstep.',
    category: 'milk',
    color: 'bg-blue-50',
    image: '/uploads/1000167444.png'
  },
  {
    name: 'Fresh Malai Paneer',
    description: 'Super soft and rich malai paneer made from fresh farm milk.',
    category: 'paneer',
    color: 'bg-yellow-50',
    image: '/uploads/1000167428.png'
  },
  {
    name: 'Fresh Dahi & Lassi',
    description: 'Thick, creamy set curd and traditional refreshing lassi.',
    category: 'dahi',
    color: 'bg-green-50',
    image: '/uploads/1000167442.png'
  }
];

export function FreshRange() {
  return (
    <section className="py-24 bg-[var(--color-brand-cream)] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[var(--color-brand-gold)] tracking-widest uppercase mb-4">
            Our Fresh Range
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-dark)] mb-6">
            Purity You Can Trust, <br/> Delivered Daily
          </h3>
          <p className="text-gray-600 text-lg">
            Our fresh dairy products are currently available in select areas. Register your interest and we'll notify you when we launch in your neighborhood.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <AnimatedSection 
              key={product.name} 
              direction="up" 
              delay={index * 0.2}
              className="group"
            >
              <div className={`p-8 rounded-3xl h-full flex flex-col ${product.color} border border-white transition-all duration-500 hover:shadow-xl hover:-translate-y-2`}>
                <div className="aspect-video bg-white rounded-2xl mb-8 flex items-center justify-center overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
                   <Image src={product.image} alt={product.name} fill className="object-cover" />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-10" />
                </div>
                
                <h4 className="text-2xl font-serif font-bold text-[var(--color-brand-dark)] mb-4">{product.name}</h4>
                <p className="text-gray-600 mb-8 flex-1">{product.description}</p>
                
                <Link href={`/shop?category=${product.category}`} className="mt-auto block">
                  <Button fullWidth variant="outline" className="group-hover:bg-[var(--color-brand-blue)] group-hover:text-white transition-colors">
                    Notify Me in My Area
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection direction="up" delay={0.6} className="mt-16 text-center">
          <Link href="/shop">
            <Button variant="ghost" size="lg" className="font-bold underline underline-offset-4 decoration-[var(--color-brand-gold)] decoration-2">
              View All Products
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
