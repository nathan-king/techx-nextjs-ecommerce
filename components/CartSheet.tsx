"use client";

import { useCartStore } from "@/lib/store/cart-store";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
  SheetHeader,
} from "./ui/sheet";
import { useRouter } from "next/navigation";
import { Handbag, Minus, Plus, Trash2, X } from "lucide-react";
import { Separator } from "./ui/separator";
import Image from "next/image";

export default function Cart() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);
  const clearItem = useCartStore((state) => state.clearItem);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleGoToCart = () => {
    router.push("/cart");
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <div className="relative p-2 rounded-md hover:bg-accent transition-all duration-200 hover:scale-110">
          <Handbag className="h-5 w-5 transition-transform duration-200" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {items.length}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col w-full sm:max-w-md overflow-hidden p-0 border-l-0 shadow-2xl"
        side="right"
      >
        <SheetHeader className="px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter:blur(0)]:bg-background/60 supports-[backdrop-filter:blur(0)]:backdrop-blur">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold flex items-center gap-2">
              Your Cart
              {items.length > 0 && (
                <span className="text-sm font-normal text-muted-foreground">
                  ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {items.length > 0 ? (
            <div className="p-4 space-y-4">
              {items.map((item, index) => {
                const { product, quantity } = item;
                const { title, price, image } = product;
                const itemTotal = price * quantity;

                return (
                  <div
                    key={item.id}
                    className="group relative p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "fadeInRight 0.3s ease-out both",
                    }}
                  >
                    <button
                      onClick={() => clearItem(product.id)}
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 border-1 bg-background text-destructive-foreground p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
                    >
                      <X className="h-3 w-3" />
                    </button>

                    <div className="flex gap-3">
                      <div className="shrink-0">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                          <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm leading-tight truncate">
                          {title}
                        </h3>
                        <p className="text-lg font-bold text-primary mt-1">
                          ${price}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(product)}
                              className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-110"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addItem(product)}
                              className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              ${itemTotal.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center min-h-64 p-8 text-center"
              style={{ animation: "fadeIn 0.5s ease-out" }}
            >
              <Handbag className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add some items to get started
              </p>
              <SheetClose asChild>
                <Button
                  asChild
                  className="transition-all duration-200 hover:scale-105"
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </SheetClose>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <>
            <Separator />
            <div
              className="p-6 bg-muted/50 space-y-4"
              style={{ animation: "fadeInUp 0.4s ease-out" }}
            >
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-xl text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <SheetClose asChild>
                  <Button
                    onClick={handleGoToCart}
                    className="w-full h-12 text-base font-semibold transition-all duration-200 hover:scale-[1.02] bg-primary hover:bg-primary/90"
                  >
                    Proceed to Checkout
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full transition-all duration-200 hover:scale-[1.02]"
                  >
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
