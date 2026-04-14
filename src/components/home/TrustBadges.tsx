'use client';

import React from 'react';
import { ShieldCheck, Truck, CreditCard, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
  }
};

export function TrustBadges() {
  const badges = [
    {
      icon: <Truck className="w-8 h-8 text-[var(--color-brand-blue)]" />,
      title: 'Reliable Delivery',
      description: 'Right to your doorstep'
    },
    {
      icon: <CreditCard className="w-8 h-8 text-[var(--color-brand-blue)]" />,
      title: 'Flexible Payment',
      description: 'Cash, cards, or e-wallets'
    },
    {
      icon: <Clock className="w-8 h-8 text-[var(--color-brand-blue)]" />,
      title: '24/7 Support',
      description: 'Always here to help'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[var(--color-brand-blue)]" />,
      title: 'Quality Assured',
      description: 'FSSAI Certified Purity'
    }
  ];

  return (
    <section className="py-16 bg-white shrink-0">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {badges.map((badge, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
              className="flex flex-col items-center text-center p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-gray-100 cursor-default"
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-[var(--color-brand-cream)] flex items-center justify-center mb-4"
                whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
              >
                {badge.icon}
              </motion.div>
              <h3 className="font-bold text-[var(--color-brand-dark)] mb-2">{badge.title}</h3>
              <p className="text-gray-500 text-sm">{badge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
