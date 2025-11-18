import { Product } from "@/lib/types";

export const Products: Product[] = [
  {
    id: "1",
    title: "Premium Headphones",
    description: "Noise-cancelling wireless headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "/images/headphones.jpg",
    images: ["/images/headphones-1.jpg", "/images/headphones-2.jpg"],
    category: "electronics",
    inventory: 15,
    rating: 4.5,
    reviewCount: 128,
    tags: ["wireless", "noise-cancelling", "bluetooth"],
  },
];
