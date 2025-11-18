"use client";

import { Product } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import { useCartStore } from "@/lib/store/cart-store";
import { useEffect } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { title, slug, description, price } = product;

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  console.log(items);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <Card className="p-5">
      <h3>{title}</h3>
      <p>{`$${price}`}</p>
      <p>{description}</p>
      <Button>
        <Link href={`/products/${slug}`}>See product</Link>
      </Button>
      <Button onClick={() => addItem(product)}>Add item to cart</Button>
    </Card>
  );
}
