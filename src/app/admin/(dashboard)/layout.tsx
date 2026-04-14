import React from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Dashboard | Rizak Foods',
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <main className="flex-1 min-w-0">
         <div className="p-6 md:p-10 pt-20 lg:pt-10 h-full w-full max-w-7xl mx-auto">
           {children}
         </div>
      </main>
    </div>
  );
}
