"use client";

import Link from "next/link";

import ProductCard from "@/components/ProductCard";
import { useWishStore } from "@/lib/store/wish-list-store";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const items = useWishStore((state) => state.items);

  if (!items.length) {
    return (
      <div className="w-full rounded-xl border bg-card/70 p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-6">
          Save products you like and access them quickly from here.
        </p>
        <Button asChild>
          <Link href="/">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Wishlist</h1>
          <p className="text-muted-foreground">
            {items.length} item{items.length === 1 ? "" : "s"} saved for later
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/">Continue shopping</Link>
        </Button>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map(({ id, product }) => (
          <ProductCard key={id} product={product} />
        ))}
      </div>
    </div>
  );
}
