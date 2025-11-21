"use client";

import { Product } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Rating, Star } from "@smastrom/react-rating";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";

import "@smastrom/react-rating/style.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    title,
    slug,
    description,
    price,
    originalPrice,
    image,
    rating,
    reviewCount,
  } = product;

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
          <h3 className="text-xl mb-1">{title}</h3>
        </Link>
        <div className="flex gap-2 items-center">
          <Rating
            style={{ maxWidth: 100 }}
            value={rating}
            className="my-2"
            readOnly
          />
          <p>{rating}</p>
          <p>({reviewCount})</p>
        </div>

        <div className="flex gap-3 font-mono my-2 text-sm font-light">
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
