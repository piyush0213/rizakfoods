import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getTotals: () => { subtotal: number; totalItems: number; deliveryCharge: number; total: number };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex(
          (i) => i.productId === item.productId && i.size === item.size
        );

        if (existingItemIndex > -1) {
          const newItems = [...state.items];
          newItems[existingItemIndex].quantity += item.quantity;
          return { items: newItems };
        }

        return { items: [...state.items, item] };
      }),
      removeItem: (productId, size) => set((state) => ({
        items: state.items.filter((i) => !(i.productId === productId && i.size === size))
      })),
      updateQuantity: (productId, quantity, size) => set((state) => ({
        items: state.items.map((i) => {
          if (i.productId === productId && i.size === size) {
            return { ...i, quantity: Math.max(1, quantity) };
          }
          return i;
        })
      })),
      clearCart: () => set({ items: [] }),
      getTotals: () => {
        const items = get().items;
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const deliveryCharge = subtotal > 1000 ? 0 : 50; // Example: Free delivery above 1000
        const total = subtotal + deliveryCharge;
        
        return { subtotal, totalItems, deliveryCharge, total };
      }
    }),
    {
      name: 'rizak-cart-storage',
    }
  )
);
