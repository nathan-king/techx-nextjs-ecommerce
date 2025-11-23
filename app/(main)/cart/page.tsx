"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <Card className="w-full glass-panel">
      <div className="p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        {items.length > 0 ? (
          <div className="space-y-6">
            {items.map((item) => {
              const { product, quantity } = item;
              const { title, price, image } = product;
              return (
                <div
                  key={item.id}
                  className="grid gap-4 sm:grid-cols-[120px,1fr] items-center rounded-xl border bg-card/70 p-4"
                >
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-lg border bg-muted">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold leading-tight">
                      {title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        ${price.toFixed(2)}
                      </span>
                      <span>Qty: {quantity}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeItem(product)}
                      >
                        -
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addItem(product)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            <Separator />
            <div className="flex flex-wrap justify-between gap-3">
              <Button variant="outline" asChild>
                <Link href="/">Continue shopping</Link>
              </Button>
              <Button>Proceed to checkout</Button>
            </div>
          </div>
        ) : (
          <div className="min-h-50 flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-muted-foreground">
              Add items to see them here.
            </p>
            <Button asChild>
              <Link href="/">Browse products</Link>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
