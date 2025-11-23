import { create } from "zustand";
import { persist } from "zustand/middleware"; // Persist in local storage
import { Product } from "../types";
import { nanoid } from "nanoid";

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (product: Product) => void;
  clearItem: (productID: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: nanoid(),
                product,
                quantity: quantity,
              },
            ],
          });
        }
      },
      removeItem: (product) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          if (existingItem.quantity > 1) {
            set({
              items: items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            });
          } else {
            set({
              items: items.filter((item) => item.product.id !== product.id),
            });
          }
        }
      },
      clearItem: (productId: string) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.product.id !== productId),
        });
      },
    }),

    {
      name: "cart-storage",
    }
  )
);
