'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart, Users, Package, AlertCircle, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
  }
};

interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
  iconBg: string;
  change?: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ products: 0, orders: 0, leads: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, leadsRes] = await Promise.all([
          fetch('/api/products').then(res => res.json()),
          fetch('/api/orders').then(res => res.json()),
          fetch('/api/leads').then(res => res.json())
        ]);
        
        setStats({
          products: productsRes.count || 0,
          orders: ordersRes.count || 0,
          leads: leadsRes.count || 0,
        });

        if (ordersRes.data) setRecentOrders(ordersRes.data.slice(0, 5));
        if (leadsRes.data) setRecentLeads(leadsRes.data.slice(0, 5));
      } catch (e) {
        console.error("Failed to load stats", e);
      }
    };
    
    fetchStats();
  }, []);

  const statCards: StatCard[] = [
    { 
      title: 'Total Products', value: stats.products, 
      icon: <Package className="w-6 h-6" />, 
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50', 
      iconBg: 'bg-blue-500 text-white',
      change: 'Active catalog'
    },
    { 
      title: 'Orders', value: stats.orders, 
      icon: <ShoppingCart className="w-6 h-6" />, 
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50', 
      iconBg: 'bg-amber-500 text-white',
      change: 'All time'
    },
    { 
      title: 'Leads', value: stats.leads, 
      icon: <Users className="w-6 h-6" />, 
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50', 
      iconBg: 'bg-emerald-500 text-white',
      change: 'Interest registrations'
    },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)]">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back to the Rizak Foods Admin Panel.</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statCards.map((card, idx) => (
          <motion.div key={idx} variants={item}>
            <div className={`${card.bg} p-6 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow duration-300`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg} shadow-lg`}>
                  {card.icon}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  {card.change}
                </div>
              </div>
              <h3 className="text-4xl font-bold text-[var(--color-brand-dark)] mb-1">{card.value}</h3>
              <p className="text-gray-500 font-medium text-sm">{card.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={item}>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[var(--color-brand-dark)]">Recent Orders</h3>
              <a href="/admin/orders" className="text-sm text-[var(--color-brand-blue)] hover:underline flex items-center gap-1">
                View All <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            {recentOrders.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-sm text-[var(--color-brand-dark)]">
                        {order.customer?.name || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">#{order._id.slice(-6)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">₹{order.total}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                <p>No recent orders found.</p>
              </div>
            )}
          </div>
        </motion.div>
         
        <motion.div variants={item}>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[var(--color-brand-dark)]">Recent Leads</h3>
              <a href="/admin/leads" className="text-sm text-[var(--color-brand-blue)] hover:underline flex items-center gap-1">
                View All <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            {recentLeads.length > 0 ? (
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div key={lead._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-sm text-[var(--color-brand-dark)]">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.phone}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-[var(--color-brand-blue)]">
                        {lead.productInterest}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">{lead.pincode}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                <p>No recent leads found.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
