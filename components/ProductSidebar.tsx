"use client";

import { useState } from "react";
import { Star, Tag, ShieldCheck, Truck } from "lucide-react";

import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  product: Product;
}

export default function ProductSidebar({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const {
    title,
    description,
    price,
    originalPrice,
    category,
    rating,
    reviewCount,
    tags,
    inventory,
  } = product;
  const addItem = useCartStore((state) => state.addItem);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  const handleChange = (value: number) => {
    if (value > 0) setQuantity(value);
  };

  const onSale =
    typeof originalPrice === "number" && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;
  const stockCopy =
    inventory > 10 ? "In stock" : inventory > 0 ? "Low stock" : "Out of stock";

  return (
    <aside className="w-full mx-auto max-w-2xl rounded-xl bg-card/60 p-8 space-y-6 backdrop-blur-sm">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {category}
          </span>
          {onSale && (
            <span className="inline-flex items-center rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
              {onSale}% OFF
            </span>
          )}
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold text-foreground">
              {rating.toFixed(1)}
            </span>
            <span>({reviewCount} reviews)</span>
          </div>
          <span>•</span>
          <span
            className={
              inventory > 0 ? "text-emerald-600 font-medium" : "text-red-500"
            }
          >
            {stockCopy}
          </span>
        </div>
      </div>

      <div className="flex items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold tracking-tight">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Taxes calculated at checkout
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground">
          Quantity
        </label>
        <div className="flex max-w-xs items-center overflow-hidden rounded-lg border bg-background">
          <Button
            type="button"
            onClick={decrement}
            variant="ghost"
            className="h-10 w-12 rounded-none"
          >
            -
          </Button>
          <Input
            value={quantity.toString()}
            type="number"
            min={1}
            onChange={(e) =>
              setQuantity(e.target.value === "" ? 1 : Number(e.target.value))
            }
            onBlur={() => {
              if (!quantity || quantity < 1) setQuantity(1);
            }}
            className="h-10 w-16 border-0 text-center text-base focus:outline-none focus:ring-0 focus-visible:ring-0"
          />
          <Button
            type="button"
            onClick={increment}
            variant="ghost"
            className="h-10 w-12 rounded-none"
          >
            +
          </Button>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
        onClick={() => addItem(product, quantity)}
        disabled={inventory === 0}
      >
        Add to cart
      </Button>

      <div className="grid gap-3 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
          <span>30-day returns and secure checkout.</span>
        </div>
        <div className="flex items-start gap-2">
          <Truck className="h-4 w-4 text-primary mt-0.5" />
          <span>Free shipping on orders over $100.</span>
        </div>
      </div>

      {tags?.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
