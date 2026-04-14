'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotals, clearCart } = useCartStore();
  const { subtotal } = getTotals();
  const deliveryCharge = subtotal > 1000 ? 0 : 50; 
  const total = subtotal + deliveryCharge;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Punjab',
    pincode: '',
  });

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-cream)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 font-serif">Checkout not available.</h2>
          <Button onClick={() => router.push('/shop')}>Shop Now</Button>
        </div>
      </div>
    );
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create order on server
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          user: { name: formData.name, email: formData.email, phone: formData.phone },
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
          items: items.map(i => ({ product: i.productId, quantity: i.quantity, price: i.price, size: i.size }))
        })
      });
      const data = await res.json();
      
      if (!data.success) throw new Error('Order creation failed');

      // 2. Initialize Razorpay popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use public key from env
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: "Rizak Foods",
        description: "Premium Dairy Purchase",
        order_id: data.razorpayOrder.id,
        handler: async function (response: any) {
          // 3. Verify payment on server
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              db_order_id: data.orderId
            })
          });
          const verifyData = await verifyRes.json();
          
          if (verifyData.success) {
            clearCart();
            // In a real app we'd redirect to a success page
            alert('Payment Successful! Thank you for ordering from Rizak Foods.');
            router.push('/'); 
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#0072CE" // Brand Blue
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        alert("Payment Failed. Reason: " + response.error.description);
      });
      rzp.open();

    } catch (error) {
       console.error("Payment error", error);
       alert("Something went wrong with the payment gateway initialization.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[var(--color-brand-cream)]">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection direction="up" className="max-w-6xl mx-auto">
           <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-dark)] mb-10 text-center">
             Secure Checkout
           </h1>

           <div className="flex flex-col lg:flex-row gap-10">
             
             {/* Form - Left Side */}
             <div className="lg:w-2/3">
               <form id="checkout-form" onSubmit={handlePayment} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                 <h3 className="font-serif text-2xl font-bold text-[var(--color-brand-dark)] mb-6 flex items-center gap-2">
                   <Truck className="w-6 h-6 text-[var(--color-brand-blue)]" /> Shipping Details
                 </h3>
                 
                 <div className="space-y-4">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <Input label="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                     <Input label="Phone Number" required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                   </div>
                   <Input label="Email Address" required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                   <Input label="Street Address" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <Input label="City" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                     <Input label="State" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
                     <Input label="PIN Code" required value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
                   </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="bg-blue-50/50 p-4 rounded-xl flex items-start gap-3 border border-blue-100 text-sm">
                      <ShieldCheck className="w-5 h-5 text-[var(--color-brand-blue)] shrink-0" />
                      <p className="text-gray-600">Your details are securely transmitted. We process payments through our RBI-approved partner Razorpay.</p>
                    </div>
                 </div>
               </form>
             </div>

             {/* Order Summary - Right Side */}
             <div className="lg:w-1/3">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-24">
                   <h3 className="font-serif text-2xl font-bold text-[var(--color-brand-dark)] mb-6">Order Summary</h3>
                   
                   <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                     {items.map((item) => (
                       <div key={`${item.productId}-${item.size}`} className="flex justify-between items-start text-sm">
                          <div className="pr-4">
                             <p className="font-bold text-[var(--color-brand-dark)]">{item.name}</p>
                             <p className="text-gray-500">Qty: {item.quantity} {item.size && `• ${item.size}`}</p>
                          </div>
                          <p className="font-medium text-right shrink-0">₹{item.price * item.quantity}</p>
                       </div>
                     ))}
                   </div>

                   <hr className="border-gray-100 mb-6" />

                   <div className="space-y-3 text-sm text-gray-600 mb-6">
                     <div className="flex justify-between">
                       <span>Subtotal</span>
                       <span className="font-medium text-[var(--color-brand-dark)]">₹{subtotal}</span>
                     </div>
                     <div className="flex justify-between">
                       <span>Delivery Charge</span>
                       <span className="font-medium text-[var(--color-brand-dark)]">{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
                     </div>
                   </div>

                   <div className="bg-[var(--color-brand-cream)] p-4 rounded-xl mb-8 flex justify-between items-center border border-[var(--color-brand-gold)]/30">
                      <span className="font-bold text-lg text-[var(--color-brand-dark)]">Total to Pay</span>
                      <span className="font-bold text-2xl text-[var(--color-brand-blue)]">₹{total}</span>
                   </div>

                   <Button 
                    type="submit" 
                    form="checkout-form"
                    size="lg" 
                    fullWidth 
                    isLoading={loading}
                    className="font-bold text-lg py-6 shadow-xl shadow-[var(--color-brand-blue)]/20 flex items-center justify-center gap-2"
                   >
                     Pay Securely <ArrowRight className="w-5 h-5" />
                   </Button>
                </div>
             </div>

           </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
