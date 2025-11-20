import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";
import { nanoid } from "nanoid";

interface WishListItem {
  id: string;
  product: Product;
}

interface WishListStore {
  items: WishListItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
}

export const useWishStore = create<WishListStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id
        );

        if (!existingItem) {
          set({
            items: [
              ...items,
              {
                id: nanoid(),
                product,
              },
            ],
          });
        }
      },
      removeItem: (productId) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.product.id !== productId),
        });
      },
    }),
    {
      name: "wish-list-storage",
    }
  )
);
