import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

const initialProducts = [
  {
    name: 'Premium Desi Ghee',
    slug: 'premium-desi-ghee',
    description: 'Made from pure milk cream (malai). Rich in healthy fats & fat-soluble vitamins (A, D, E, K). Boosts digestion by improving gut health. Supports immunity & metabolism. No artificial colors or preservatives.',
    shortDescription: 'Pure traditional A2 Ghee made from grass-fed cows.',
    price: 650,
    category: 'ghee',
    type: 'purchasable',
    stock: 100,
    sizes: [
      { label: '1 Litre', price: 650, weight: '1L' },
      { label: '5 Litres', price: 3150, weight: '5L' },
      { label: '10 Litres', price: 6200, weight: '10L' }
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 128,
    benefits: ['Improves digestion', 'Rich in vitamins A, D, E, K', 'No artificial colors']
  },
  {
    name: 'Fresh Farm Milk',
    slug: 'fresh-farm-milk',
    description: '100% pure, unadulterated farm-fresh milk delivered right to your doorstep. Sourced daily from our healthy cows.',
    shortDescription: 'Daily fresh milk delivery.',
    price: 70,
    category: 'milk',
    type: 'inquiry',
    stock: 0,
    sizes: [{ label: '1 Litre', price: 70, weight: '1L' }],
    featured: true,
    rating: 4.8,
    reviewCount: 245
  },
  {
    name: 'Fresh Malai Paneer',
    slug: 'fresh-malai-paneer',
    description: 'Super soft and rich malai paneer made from fresh farm milk. Perfect for all your traditional dishes.',
    shortDescription: 'Soft and creamy malai paneer.',
    price: 380,
    category: 'paneer',
    type: 'inquiry',
    stock: 0,
    sizes: [{ label: '1 Kg', price: 380, weight: '1kg' }],
    featured: true,
    rating: 4.7,
    reviewCount: 89
  },
  {
    name: 'Fresh Plain Lassi',
    slug: 'fresh-plain-lassi',
    description: 'Traditional Punjabi plain lassi. Refreshing and good for digestion.',
    shortDescription: 'Refreshing traditional drink.',
    price: 50,
    category: 'lassi',
    type: 'inquiry',
    stock: 0,
    sizes: [{ label: '500 ml', price: 50, weight: '500ml' }],
    featured: false,
    rating: 4.6,
    reviewCount: 42
  },
  {
    name: 'Fresh Dahi',
    slug: 'fresh-dahi',
    description: 'Thick, creamy set curd. Acts as a natural probiotic and aids digestion.',
    shortDescription: 'Thick creamy natural probiotic.',
    price: 60,
    category: 'dahi',
    type: 'inquiry',
    stock: 0,
    sizes: [{ label: '500g', price: 60, weight: '500g' }],
    featured: false,
    rating: 4.8,
    reviewCount: 156
  }
];

export async function GET(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ message: 'Not allowed in production' }, { status: 403 });
  }

  try {
    await dbConnect();

    // 1. Clear existing products
    await Product.deleteMany({});
    
    // 2. Insert new products
    const products = await Product.insertMany(initialProducts);

    // 3. Setup default Admin if none exists
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Rizak Admin'
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      productsSeeded: products.length
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Seeding failed', error: error.message },
      { status: 500 }
    );
  }
}
