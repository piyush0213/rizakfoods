'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const heroContent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const heroItem = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 }
  }
};

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 400], [0, -50]);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[var(--color-brand-cream)]">
      {/* Animated Background Orbs */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-1/3 left-1/4 w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] rounded-full bg-[var(--color-brand-blue)]/15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] md:w-[25vw] md:h-[25vw] rounded-full bg-[var(--color-brand-gold)]/10 blur-[100px] animate-pulse [animation-delay:1s]" />
      </motion.div>

      {/* Floating golden particles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[var(--color-brand-gold)]/30"
            initial={{ 
              x: `${20 + i * 15}%`, 
              y: `${30 + (i % 3) * 20}%`,
              opacity: 0 
            }}
            animate={{ 
              y: [`${30 + (i % 3) * 20}%`, `${20 + (i % 3) * 15}%`, `${30 + (i % 3) * 20}%`],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{ 
              duration: 4 + i * 0.5, 
              repeat: Infinity, 
              ease: 'easeInOut',
              delay: i * 0.7 
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ y: textY, opacity }}
        className="container relative z-10 mx-auto px-4 text-center mt-12 md:mt-24"
      >
        <motion.div
          variants={heroContent}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            variants={heroItem}
            className="inline-block py-1.5 px-4 rounded-full bg-[var(--color-brand-gold)]/20 text-[var(--color-brand-gold-hover)] text-sm font-bold tracking-wider mb-6 border border-[var(--color-brand-gold)]/30"
          >
            DIET GOOD, LIFE GOOD
          </motion.span>
          
          <motion.h1 
            variants={heroItem}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[var(--color-brand-dark)] mb-6 leading-tight"
          >
            Farm to Table <br />
            <span className="text-[var(--color-brand-blue)] relative inline-block">
              Purity
              <svg className="absolute w-full h-auto -bottom-4 left-0 text-[var(--color-brand-blue)] opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
                <motion.path 
                  d="M0 10 Q 50 20 100 10" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
                />
              </svg>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={heroItem}
            className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
          >
            Experience the rich heritage of Punjab's dairy farming. 
            Our premium A2 Desi Ghee and fresh milk products are crafted with traditional wisdom and modern hygiene.
          </motion.p>

          <motion.div 
            variants={heroItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/shop?category=ghee">
              <Button size="lg" className="text-lg px-10 shadow-xl shadow-blue-900/10 hover:-translate-y-1 transition-transform duration-300">
                Buy Premium Ghee
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg" className="text-lg px-10 bg-white/50 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300">
                Explore Fresh Range
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Parallax Milk Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full text-white h-[60px] md:h-[120px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,120.31,192.4,111.45,236.4,105.15,279.7,85.25,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
