import React from 'react';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | Rizak Foods`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch product from DB based on slug
  let product = null;
  
  try {
    await dbConnect();
    const doc = await Product.findOne({ slug, isActive: true }).lean();
    if (doc) {
      // Serialize Mongoose doc
      product = JSON.parse(JSON.stringify(doc));
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  // Fallback data if DB fails or isn't seeded yet for preview purposes
  if (!product) {
     const fallbackData = [
       { slug: 'premium-desi-ghee', name: 'Premium Desi Ghee', price: 650, category: 'ghee', type: 'purchasable', images: [], description: 'Made from pure milk cream (malai).', shortDescription: 'Pure traditional A2 Ghee.', sizes: [{label: '1L', price: 650}], stock: 10, benefits: ['Improves Digestion'] },
       { slug: 'fresh-farm-milk', name: 'Fresh Farm Milk', price: 70, category: 'milk', type: 'inquiry', images: [], description: '100% pure, unadulterated farm-fresh milk delivered right to your doorstep.', shortDescription: 'Daily fresh milk delivery.', stock: 0 },
     ];
     product = fallbackData.find(p => p.slug === slug);
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Gallery - Left Side */}
          <div className="w-full lg:w-1/2 relative">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Info - Right Side */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
