import { Product } from "@/lib/types";
import { Products } from "../constants/products";

export const getProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return Products;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return Products.find((product) => product.id === id) || null;
};
