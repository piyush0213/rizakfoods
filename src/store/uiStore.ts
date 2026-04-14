import { create } from 'zustand';

interface UIState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  interestModalProduct: { id: string; name: string; category: string } | null;
  toggleCart: () => void;
  toggleMobileMenu: () => void;
  openInterestModal: (product: { id: string; name: string; category: string }) => void;
  closeInterestModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  interestModalProduct: null,
  
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen, isMobileMenuOpen: false })),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen, isCartOpen: false })),
  
  openInterestModal: (product) => set({ interestModalProduct: product }),
  closeInterestModal: () => set({ interestModalProduct: null }),
}));
