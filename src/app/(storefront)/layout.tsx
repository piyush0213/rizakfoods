import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MilkLoader } from "@/components/layout/MilkLoader";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingWidget } from "@/components/layout/FloatingWidget";

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MilkLoader />
      <CartDrawer />
      <FloatingWidget />
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
