import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: StaticImageData;
  images: string[];
  category: string;
  inventory: number;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface ShoppingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
}
