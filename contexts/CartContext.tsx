/**
 * Cart Context using Zustand
 * Global state management for shopping cart
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  storeName?: string;
  storeId?: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  getItem: (productId: string) => CartItem | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      /**
       * Add item to cart or increase quantity if already exists
       */
      addItem: (product: CartProduct, quantity: number = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingItemIndex >= 0) {
            // Item exists, update quantity
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity,
            };
            return { items: updatedItems };
          } else {
            // New item, add to cart
            return {
              items: [...state.items, { product, quantity }],
            };
          }
        });
      },

      /**
       * Remove item from cart completely
       */
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      /**
       * Update item quantity (set to specific value)
       * If quantity is 0 or less, remove the item
       */
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === productId
          );

          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity,
            };
            return { items: updatedItems };
          }

          return state;
        });
      },

      /**
       * Clear all items from cart
       */
      clearCart: () => {
        set({ items: [] });
      },

      /**
       * Calculate total price of all items in cart
       */
      getTotal: () => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      /**
       * Get total number of items in cart (sum of all quantities)
       */
      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      },

      /**
       * Get specific item from cart by product ID
       */
      getItem: (productId: string) => {
        const state = get();
        return state.items.find((item) => item.product.id === productId);
      },
    }),
    {
      name: 'glamgo-cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Export hook for easy access
export default useCartStore;
