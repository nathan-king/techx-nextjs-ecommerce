"use client";

import { Product } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { Tag, Star } from "lucide-react";

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
    tags,
    category,
    inventory,
  } = product;

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const onSale =
    typeof originalPrice === "number" && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;
  const stockCopy =
    inventory > 10 ? "In stock" : inventory > 0 ? "Low stock" : "Out of stock";

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card/70 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`products/${slug}`} className="relative block aspect-square">
        {onSale && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-destructive/90 px-2.5 py-1 text-xs font-semibold text-destructive-foreground shadow-sm">
            -{onSale}%
          </span>
        )}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 300px, 50vw"
          className="object-contain transition duration-500 group-hover:scale-105"
          priority={false}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary">
          <span className="rounded-full bg-primary/10 px-2 py-1">{category}</span>
          <span
            className={
              inventory > 0 ? "text-emerald-600" : "text-destructive font-semibold"
            }
          >
            {stockCopy}
          </span>
        </div>

        <Link href={`products/${slug}`}>
          <h3 className="text-lg font-semibold leading-tight line-clamp-2">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-2">
          <Rating style={{ maxWidth: 90 }} value={rating} readOnly />
          <span className="text-sm font-semibold text-foreground">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({reviewCount})
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {tags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Tag className="h-3.5 w-3.5" />
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-1 font-medium"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="rounded-full bg-muted px-2 py-1 font-medium">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="mt-auto">
          <Button
            variant="default"
            onClick={() => addItem(product)}
            className="w-full"
            disabled={inventory === 0}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
