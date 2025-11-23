"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";

import { useWishStore } from "@/lib/store/wish-list-store";
import { useCartStore } from "@/lib/store/cart-store";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function WishListSheet() {
  const items = useWishStore((state) => state.items);
  const removeItem = useWishStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addItem);

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer relative">
        <div className="relative p-2 rounded-md hover:bg-accent transition-all duration-200 hover:scale-110">
          <Heart className="h-5 w-5 transition-transform duration-200" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-600 text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {items.length}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col w-full sm:max-w-md overflow-hidden p-0 border-l-0 shadow-2xl"
      >
        <SheetHeader className="px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter:blur(0)]:bg-background/60">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold flex items-center gap-2">
              Wishlist
              {items.length > 0 && (
                <span className="text-sm font-normal text-muted-foreground">
                  ({items.length} item{items.length === 1 ? "" : "s"})
                </span>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {items.length > 0 ? (
            <div className="p-4 space-y-4">
              {items.map(({ id, product }) => (
                <div
                  key={id}
                  className="group relative flex gap-3 rounded-lg border bg-card hover:bg-accent/40 transition-all duration-300 p-3"
                >
                  <div className="relative h-20 w-20 rounded-md overflow-hidden border bg-muted">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-semibold text-sm leading-snug line-clamp-2 hover:underline"
                    >
                      {product.title}
                    </Link>
                    <p className="text-sm text-primary font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span className="capitalize">{product.category}</span>
                      <span>•</span>
                      <span>{product.rating.toFixed(1)} ★</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToCart(product, 1)}
                        className="h-8 px-2"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(product.id)}
                        className="h-8 px-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-64 p-8 text-center space-y-3">
              <Heart className="h-12 w-12 text-muted-foreground/50" />
              <div>
                <h3 className="text-lg font-semibold">No favorites yet</h3>
                <p className="text-sm text-muted-foreground">
                  Save items you love to find them faster later.
                </p>
              </div>
              <SheetClose asChild>
                <Button className="mt-2">Start browsing</Button>
              </SheetClose>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <>
            <Separator />
            <div className="p-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Go to wishlist page for more actions</span>
              <SheetClose asChild>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/wishlist">Open</Link>
                </Button>
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
