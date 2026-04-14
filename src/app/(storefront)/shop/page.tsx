import React, { Suspense } from 'react';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata = {
  title: 'Shop Premium Dairy | Rizak Foods',
  description: 'Explore our range of premium A2 Ghee, fresh milk, and paneer.',
};

export default async function ShopPage() {
  let initialProducts = [];
  try {
    await dbConnect();
    const queryResult = await Product.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    // Serialize MongoDB objects for Client Component transfer
    initialProducts = JSON.parse(JSON.stringify(queryResult));
  } catch (error) {
    console.error("Failed to load initial products:", error);
  }

  return (
    <div className="bg-[var(--color-brand-cream)] min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        
        <AnimatedSection direction="up" className="text-center mb-12">
           <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-dark)] mb-4">
             Our Premium Range
           </h1>
           <p className="text-gray-600 max-w-2xl mx-auto">
             From pure A2 Desi Ghee delivered nationwide, to fresh farm milk available in select areas.
           </p>
        </AnimatedSection>

        <Suspense fallback={<div className="py-24 text-center">Loading products...</div>}>
          <ProductGrid initialProducts={initialProducts} />
        </Suspense>

      </div>
    </div>
  );
}
