'use client';

import React, { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, title: 'Address', lines: ['Rizak Foods India Pvt. Ltd.', 'Punjab, India'] },
  { icon: Phone, title: 'Phone', lines: ['+91-XXXXX-XXXXX'] },
  { icon: Mail, title: 'Email', lines: ['info@rizakfoods.com', 'orders@rizakfoods.com'] },
  { icon: Clock, title: 'Working Hours', lines: ['Mon–Sat: 8 AM – 8 PM', 'Sunday: 9 AM – 5 PM'] },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit as a lead/inquiry
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          pincode: '000000',
          productInterest: `Contact: ${formData.subject}`,
          productCategory: 'inquiry',
          message: formData.message
        })
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--color-brand-cream)] min-h-screen">
      
      {/* Hero */}
      <section className="relative py-32 bg-[var(--color-brand-dark)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-1/4 right-1/3 w-[40vw] h-[40vw] rounded-full bg-[var(--color-brand-gold)] blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <AnimatedSection direction="up">
            <span className="text-[var(--color-brand-gold)] text-sm font-bold tracking-widest uppercase">Get In Touch</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mt-4 mb-6">
              Contact <span className="text-[var(--color-brand-blue)]">Us</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Have questions about our products, delivery, or wholesale orders? 
              We&apos;d love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-16 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <AnimatedSection key={info.title} direction="up" delay={i * 0.1}>
                <motion.div 
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-blue)]/10 flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-[var(--color-brand-blue)]" />
                  </div>
                  <h3 className="font-bold text-[var(--color-brand-dark)] mb-2">{info.title}</h3>
                  {info.lines.map((line, j) => (
                    <p key={j} className="text-gray-600 text-sm">{line}</p>
                  ))}
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection direction="up">
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
                <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)] mb-2 text-center">Send Us a Message</h2>
                <p className="text-gray-500 text-center mb-10">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <CheckCircle2 className="w-20 h-20 text-[var(--color-brand-gold)] mb-6" />
                    <h3 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-3">Message Sent!</h3>
                    <p className="text-gray-600 max-w-md">
                      Thank you for reaching out. Our team will review your message and
                      respond within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input 
                        label="Full Name" 
                        required 
                        placeholder="Your name"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                      <Input 
                        label="Email" 
                        type="email"
                        required 
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input 
                        label="Phone Number" 
                        type="tel"
                        placeholder="10-digit mobile"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                      <Input 
                        label="Subject" 
                        required
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                      />
                    </div>
                    
                    <div className="w-full">
                      <label className="block text-sm font-medium text-[var(--color-brand-dark)] mb-1.5">
                        Message <span className="text-red-500 ml-1">*</span>
                      </label>
                      <textarea 
                        required
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] transition-colors resize-none"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <Button type="submit" size="lg" fullWidth isLoading={loading} className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
