import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: 'ghee' | 'milk' | 'paneer' | 'butter' | 'dahi' | 'lassi' | 'yogurt';
  type: 'purchasable' | 'inquiry';
  stock: number;
  sizes: { label: string; price: number; weight: string }[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  benefits: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    images: [{ type: String }],
    category: {
      type: String,
      enum: ['ghee', 'milk', 'paneer', 'butter', 'dahi', 'lassi', 'yogurt'],
      required: true,
    },
    type: {
      type: String,
      enum: ['purchasable', 'inquiry'],
      default: 'inquiry',
    },
    stock: { type: Number, default: 0 },
    sizes: [
      {
        label: String,
        price: Number,
        weight: String,
      },
    ],
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    benefits: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
