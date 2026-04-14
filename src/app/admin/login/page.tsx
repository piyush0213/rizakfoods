'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-dark)] via-[#0d1f3c] to-[var(--color-brand-dark)] px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[var(--color-brand-blue)]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-[var(--color-brand-gold)]/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/20 max-w-md w-full relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.2 }}
            className="mx-auto w-16 h-16 rounded-2xl bg-[var(--color-brand-dark)] flex items-center justify-center mb-6 shadow-lg"
          >
            <ShieldCheck className="w-8 h-8 text-[var(--color-brand-gold)]" />
          </motion.div>
           <h1 className="font-serif text-3xl font-bold text-[var(--color-brand-dark)]">Rizak Foods</h1>
           <p className="text-gray-500 mt-2">Admin Portal Login</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center border border-red-100"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
           <Input 
             label="Admin Email" 
             type="email" 
             required 
             value={email}
             onChange={e => setEmail(e.target.value)}
             placeholder="admin@rizakfoods.com"
           />
           <Input 
             label="Password" 
             type="password" 
             required 
             value={password}
             onChange={e => setPassword(e.target.value)}
             placeholder="••••••••"
           />
           <Button type="submit" fullWidth size="lg" isLoading={loading}>
             Sign In
           </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          Protected area. Authorized personnel only.
        </p>
      </motion.div>
    </div>
  );
}
