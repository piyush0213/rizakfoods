'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MapPin, CheckCircle2, Clock } from 'lucide-react';

export function PincodeChecker() {
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{available: boolean; message: string} | null>(null);

  const checkPincode = async () => {
    if (pincode.length !== 6) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/pincode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pincode })
      });
      const data = await res.json();
      setResult({ available: data.available, message: data.message });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-[var(--color-brand-blue)]" />
        <h4 className="font-medium text-[var(--color-brand-dark)]">Check Delivery Availability</h4>
      </div>
      
      <div className="flex gap-2">
        <input 
          type="text" 
          maxLength={6}
          placeholder="Enter PIN Code"
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/50 bg-white"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
        />
        <Button 
          variant="outline" 
          onClick={checkPincode}
          disabled={pincode.length !== 6 || loading}
          isLoading={loading}
        >
          Check
        </Button>
      </div>

      {result && (
        <div className={`mt-3 flex items-start gap-2 text-sm ${result.available ? 'text-green-700' : 'text-amber-700'}`}>
          {result.available ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <Clock className="w-5 h-5 shrink-0" />
          )}
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
}
