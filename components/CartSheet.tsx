"use client";

import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Cart</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="text-xl">Your Cart</SheetTitle>
        <div className="p-10">
          {items.map((item) => {
            const { product, quantity } = item;
            const { title, price } = product;
            return (
              <div key={item.id} className="mb-10">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p>{price}</p>
                <p>{quantity}</p>
                <div className="flex justify-center gap-10">
                  <Button onClick={() => removeItem(product)}>-</Button>
                  <Button onClick={() => addItem(product)}>+</Button>
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
