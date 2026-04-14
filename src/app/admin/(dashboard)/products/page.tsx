'use client';

import React, { useState, useEffect } from 'react';
import { Package, Plus, Trash2, RefreshCw, X, ImagePlus, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  
  // File upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: '', description: '', shortDescription: '', price: '', category: 'ghee', type: 'purchasable', stock: '10'
  });

  const loadProducts = () => {
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadProducts(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      const validFiles = newFiles.filter(file => {
          if (file.size > 4 * 1024 * 1024) { // 4MB Limit
              alert(`File ${file.name} is too large. Vercel blocks images larger than 4.5MB. Please compress the image!`);
              return false;
          }
          return true;
      });

      setSelectedFiles(prev => [...prev, ...validFiles]);
      
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]); // Free memory
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const uploadedUrls: string[] = [];

      // 1. Upload files first
      for (const file of selectedFiles) {
        const fileData = new FormData();
        fileData.append('file', file);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: fileData
        });
        
        if (!uploadRes.ok) {
          const errText = await uploadRes.text();
          if (errText.includes('413') || errText.includes('Request Entity Too Large')) {
             throw new Error(`File ${file.name} is too large. Vercel limits uploads to 4.5MB. Please compress the image!`);
          }
          throw new Error(`Upload failed: ${errText || uploadRes.statusText}`);
        }

        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          uploadedUrls.push(uploadData.url);
        } else {
          throw new Error('File upload failed for ' + file.name);
        }
      }

      // 2. Create product with uploaded URLs
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          images: uploadedUrls,
        })
      });
      const data = await res.json();
      if (data.success) {
        setShowAddForm(false);
        setFormData({ name: '', description: '', shortDescription: '', price: '', category: 'ghee', type: 'purchasable', stock: '10' });
        setSelectedFiles([]);
        setPreviews([]);
        loadProducts();
      } else {
        alert(data.message || 'Failed to create product');
      }
    } catch (error) {
       console.error("Creation error:", error);
       alert('Failed to create product. Check console.');
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)] flex items-center gap-3">
            <Package className="w-8 h-8 text-[var(--color-brand-gold)]" />
            Products
          </h1>
          <p className="text-gray-500 mt-1">Manage your catalog and stock</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2" onClick={loadProducts}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
          <Button className="flex items-center gap-2" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showAddForm ? 'Cancel' : 'Add Product'}
          </Button>
        </div>
      </motion.div>

      {/* Add Product Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <form onSubmit={handleAddProduct} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-bold text-lg text-[var(--color-brand-dark)]">Add New Product</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Product Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Premium Desi Ghee" />
                <Input label="Short Description" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} placeholder="Brief tagline" />
              </div>
              <Input label="Full Description" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Detailed product description..." />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input label="Price (₹)" required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="650" />
                <Input label="Stock" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} placeholder="10" />
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-dark)] mb-1.5">Category</label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-white"
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="ghee">Ghee</option>
                    <option value="milk">Milk</option>
                    <option value="paneer">Paneer</option>
                    <option value="butter">Butter</option>
                    <option value="dahi">Dahi</option>
                    <option value="lassi">Lassi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-dark)] mb-1.5">Type</label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-white"
                    value={formData.type} 
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="purchasable">Purchasable</option>
                    <option value="inquiry">Inquiry Only</option>
                  </select>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="border-t border-gray-100 pt-5">
                <label className="text-sm font-medium text-[var(--color-brand-dark)] flex items-center gap-2 mb-3">
                  <ImagePlus className="w-4 h-4 text-[var(--color-brand-blue)]" />
                  Product Images
                </label>
                
                <div className="flex flex-wrap gap-4 items-start">
                  {/* Previews */}
                  {previews.map((preview, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-xl border border-gray-200 overflow-hidden group">
                      <img src={preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="bg-white text-red-500 rounded-full p-1 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Upload Button */}
                  <div className="w-24 h-24">
                     <label className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-[var(--color-brand-blue)] hover:border-[var(--color-brand-blue)] transition-colors cursor-pointer cursor-allowed relative">
                        <UploadCloud className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Add Files</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                     </label>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">Upload high-quality images. The first image will be used as the main product photo.</p>
              </div>

              <Button type="submit" isLoading={addLoading} className="w-full sm:w-auto">
                 {addLoading ? 'Uploading Images & Creating Product...' : 'Create Product'}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={item}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[740px]">
              <thead className="bg-gray-50 border-b border-gray-100 uppercase text-xs font-bold text-gray-500">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                        {product.images && product.images.length > 0 && product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[var(--color-brand-dark)]">{product.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{product.shortDescription}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 capitalize">{product.category}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">₹{product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {product.stock > 0 ? product.stock : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        product.type === 'purchasable' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {product.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-3 text-gray-400">
                      <button className="hover:text-red-500 transition-colors p-1" onClick={() => handleDeleteProduct(product._id)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No products found. Add some to get started!
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading products...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
