'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const cartItemsCount = useCartStore((state) => state.getTotals().totalItems);
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Our Story', href: '/story' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100 py-3' 
          : 'bg-white/70 backdrop-blur-md py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-brand-blue)]">
              Rizak Foods
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-[var(--color-brand-blue)] ${
                  pathname === link.href 
                    ? 'text-[var(--color-brand-blue)]' 
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="hidden md:flex p-2 text-gray-700 hover:text-[var(--color-brand-blue)] transition-colors">
              <User className="w-5 h-5" />
            </Link>
            
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-[var(--color-brand-blue)] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] text-xs font-bold flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="flex flex-col px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={toggleMobileMenu}
                  className={`text-lg font-medium p-3 rounded-xl transition-colors ${
                    pathname === link.href 
                      ? 'bg-[var(--color-brand-blue)] text-white' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/admin/login"
                onClick={toggleMobileMenu}
                className="text-lg font-medium p-3 rounded-xl text-gray-800 hover:bg-gray-100 flex items-center gap-2"
              >
                <User className="w-5 h-5" /> Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
