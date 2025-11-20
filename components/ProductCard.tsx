"use client";

import { Product } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { title, slug, description, price, originalPrice, image } = product;

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="my-3">
      <Link href={`products/${slug}`}>
        <div className="h-75 w-75 overflow-hidden">
          <Image
            src={image}
            alt={title}
            height={500}
            width={500}
            className="object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="pt-4">
        <Link href={`products/${slug}`}>
          <h3 className="font-serif text-xl mb-2">{title}</h3>
        </Link>
        <div className="flex gap-3 font-mono mb-2 text-sm font-light">
          <p className="line-through text-gray-600">{`$${originalPrice}`}</p>
          <p>{`$${price}`}</p>
        </div>
        <p className="mb-4">{description}</p>
        <Button
          variant="default"
          onClick={() => addItem(product)}
          className="hover:cursor-pointer w-full text-lg"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
