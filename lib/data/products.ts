import { Product } from "@/lib/types";
import { products } from "../constants/products";
import { slugify } from "../utils";

export const getProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products;
};

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  return products.find((product) => product.slug === slug) || null;
};
