'use client';

import React from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { Heart, Leaf, Shield, Users, Award, MapPin } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Passion for Purity', description: 'Every product we make is a testament to our unwavering commitment to purity and quality.' },
  { icon: Leaf, title: 'Natural & Fresh', description: 'No artificial colors, preservatives, or additives. Just pure, natural dairy goodness.' },
  { icon: Shield, title: 'FSSAI Certified', description: 'Our facility meets the highest food safety standards set by the Food Safety Authority of India.' },
  { icon: Users, title: 'Farmer First', description: 'We work directly with local dairy farmers in Punjab, ensuring fair prices and sustainable practices.' },
  { icon: Award, title: 'Traditional Craft', description: 'Our ghee is made using time-honored bilona method, preserving centuries of dairy wisdom.' },
  { icon: MapPin, title: 'Proudly Punjabi', description: 'Born in the heart of India\'s dairy belt, Punjab — the land of five rivers and rich agriculture.' },
];

const timeline = [
  { year: '2023', title: 'The Beginning', desc: 'Rizak Foods India Pvt. Ltd. was incorporated with a vision to bring pure, unadulterated dairy to every Indian household.' },
  { year: '2024', title: 'First Product Launch', desc: 'Our signature Premium A2 Desi Ghee was launched, crafted from 100% pure milk cream using the traditional bilona method.' },
  { year: '2025', title: 'Expanding the Range', desc: 'We expanded our portfolio with fresh farm milk, malai paneer, dahi, and lassi — available in select Punjab areas.' },
  { year: '2026', title: 'Growing Nationwide', desc: 'Rizak Foods ghee is now delivered pan-India while we expand fresh dairy delivery to more locations.' },
];

export default function StoryPage() {
  return (
    <div className="bg-[var(--color-brand-cream)] min-h-screen">
      
      {/* Hero */}
      <section className="relative py-32 bg-[var(--color-brand-dark)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/3 w-[50vw] h-[50vw] rounded-full bg-[var(--color-brand-blue)] blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <AnimatedSection direction="up">
            <span className="text-[var(--color-brand-gold)] text-sm font-bold tracking-widest uppercase">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mt-4 mb-6">
              Born from <span className="text-[var(--color-brand-blue)]">Punjab&apos;s</span> Heart
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Rizak Foods is more than a dairy brand. It&apos;s a promise — a promise of purity, a taste of Punjab&apos;s 
              rich agricultural heritage, and a dedication to your family&apos;s health and well-being.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-[var(--color-brand-gold)]/10 border border-white flex items-center justify-center shadow-lg">
                <div className="text-center p-12">
                  <h3 className="font-serif text-4xl font-bold text-[var(--color-brand-dark)] mb-4">&ldquo;Diet Good,<br/>Life Good&rdquo;</h3>
                  <p className="text-gray-500">— Our Guiding Philosophy</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <h2 className="text-sm font-bold text-[var(--color-brand-gold)] tracking-widest uppercase mb-4">Our Mission</h2>
              <h3 className="text-4xl font-serif font-bold text-[var(--color-brand-dark)] mb-6 leading-tight">
                Bridging Tradition <br/>& Modern Nutrition
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We believe that the food you nourish your family with should be as pure as the love you have for them. 
                That&apos;s why every Rizak product is sourced, processed, and delivered with the utmost care.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our advanced facility in Punjab combines traditional dairy craftsmanship with modern hygiene 
                standards to deliver products that are not just safe, but truly wholesome.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-sm font-bold text-[var(--color-brand-blue)] tracking-widest uppercase mb-4">What We Stand For</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-dark)]">Our Core Values</h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} direction="up" delay={i * 0.1}>
                <motion.div 
                  className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 h-full hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-blue)]/10 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-[var(--color-brand-blue)]" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[var(--color-brand-dark)] mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[var(--color-brand-cream)]">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-sm font-bold text-[var(--color-brand-gold)] tracking-widest uppercase mb-4">Our Journey</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-dark)]">Milestones</h3>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-8">
            {timeline.map((event, i) => (
              <AnimatedSection key={event.year} direction="left" delay={i * 0.15}>
                <div className="flex gap-6 items-start">
                  <div className="w-20 shrink-0 text-right">
                    <span className="text-2xl font-bold font-serif text-[var(--color-brand-blue)]">{event.year}</span>
                  </div>
                  <div className="relative pl-8 border-l-2 border-[var(--color-brand-gold)]/30 pb-8">
                    <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-[var(--color-brand-gold)] border-4 border-[var(--color-brand-cream)]" />
                    <h4 className="font-bold text-lg text-[var(--color-brand-dark)] mb-2">{event.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{event.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
