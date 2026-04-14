'use client';

import React, { useState, useEffect } from 'react';
import { Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  converted: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-600',
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLeads = () => {
    setLoading(true);
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLeads(data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadLeads(); }, []);

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)] flex items-center gap-3">
            <Users className="w-8 h-8 text-[var(--color-brand-gold)]" />
            Lead Interests
          </h1>
          <p className="text-gray-500 mt-1">Review &ldquo;Register Interest&rdquo; submissions</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={loadLeads}>
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[640px]">
              <thead className="bg-gray-50 border-b border-gray-100 uppercase text-xs font-bold text-gray-500">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">PIN Code</th>
                  <th className="px-6 py-4">Interest</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[var(--color-brand-dark)]">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                    <td className="px-6 py-4 font-mono text-sm">{lead.pincode}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[var(--color-brand-blue)]">
                        {lead.productInterest}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[lead.status] || 'bg-gray-100 text-gray-700'}`}>
                        {lead.status || 'new'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No leads found.
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading leads...
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
