import { Product } from "@/lib/types";
import { products } from "../constants/products";

export const getProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return products.find((product) => product.id === id) || null;
};
