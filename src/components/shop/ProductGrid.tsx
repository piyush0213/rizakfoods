'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/shop/ProductCard';
import { FilterBar } from '@/components/shop/FilterBar';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function ProductGrid() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(
    initialCategory !== 'All' ? initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1) : 'All'
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // Simulating fetch or fetching from real API
        const res = await fetch(`/api/products${activeFilter !== 'All' ? `?category=${activeFilter.toLowerCase()}` : ''}`);
        const data = await res.json();
        
        if (data.success) {
          setProducts(data.data);
        } else {
          // If no DB is connected yet, use dummy data Fallback for preview
          setProducts(getFallbackData(activeFilter));
        }
      } catch (error) {
        setProducts(getFallbackData(activeFilter));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeFilter]);

  return (
    <div>
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-12 h-12 animate-spin text-[var(--color-brand-blue)]" />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <AnimatedSection key={product._id || product.slug} direction="up" delay={index * 0.1}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-serif text-[var(--color-brand-dark)] mb-2">No products found</h3>
          <p className="text-gray-500">Try changing your filter selection</p>
        </div>
      )}
    </div>
  );
}

// Fallback data if DB isn't seeded yet
function getFallbackData(filter: string) {
  const all = [
    { slug: 'premium-desi-ghee', name: 'Premium Desi Ghee', price: 650, category: 'ghee', type: 'purchasable', images: [], shortDescription: 'Pure traditional A2 Ghee.' },
    { slug: 'fresh-farm-milk', name: 'Fresh Farm Milk', price: 70, category: 'milk', type: 'inquiry', images: [], shortDescription: 'Daily fresh milk delivery.' },
    { slug: 'fresh-malai-paneer', name: 'Fresh Malai Paneer', price: 380, category: 'paneer', type: 'inquiry', images: [], shortDescription: 'Soft and creamy malai paneer.' },
    { slug: 'fresh-dahi', name: 'Fresh Dahi', price: 60, category: 'dahi', type: 'inquiry', images: [], shortDescription: 'Thick creamy natural probiotic.' },
  ];
  if (filter === 'All') return all;
  return all.filter(p => p.category.toLowerCase() === filter.toLowerCase());
}
