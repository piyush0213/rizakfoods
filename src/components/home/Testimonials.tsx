'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function Testimonials() {
  const testimonials = [
    {
      name: "Simran Kaur",
      location: "Chandigarh",
      text: "The A2 Desi Ghee from Rizak Foods reminds me of the ghee my grandmother used to make. The aroma is authentic and the taste is unparalleled. Truly farm to table purity!",
      rating: 5
    },
    {
      name: "Rahul Sharma",
      location: "Ludhiana",
      text: "I highly recommend their malai paneer. It's incredibly soft and fresh. Knowing it's sourced directly from Punjab's finest dairy farms gives me complete peace of mind.",
      rating: 5
    },
    {
      name: "Priya Patel",
      location: "New Delhi",
      text: "The quality difference is clear. I loved the premium packaging and the purity of the ghee. Fast delivery and excellent customer service. Diet Good, Life Good indeed!",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[var(--color-brand-blue)] tracking-widest uppercase mb-4">
            Customer Stories
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-dark)]">
            What Our Family Says
          </h3>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={index} 
              direction="up" 
              delay={index * 0.2}
            >
              <div className="glass bg-[var(--color-brand-cream)]/50 p-8 rounded-3xl h-full flex flex-col relative border border-[var(--color-brand-gold)]/20 shadow-sm hover:shadow-xl transition-shadow duration-300">
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-8 text-[var(--color-brand-gold)]/20 font-serif text-8xl leading-none">
                  "
                </div>

                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[var(--color-brand-gold)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-700 italic mb-8 relative z-10 flex-1 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="relative z-10 mt-auto">
                  <h4 className="font-bold text-[var(--color-brand-dark)] font-serif text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
