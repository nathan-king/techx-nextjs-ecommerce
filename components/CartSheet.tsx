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
} from "./ui/sheet";
import { useRouter } from "next/navigation";
import { Handbag } from "lucide-react";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { Separator } from "./ui/separator";

export default function Cart() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);

  // next/link conflicts with SheetClose so routing the button manually

  const handleGoToCart = () => {
    router.push("/cart");
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <div className="relative">
          <Handbag />
          {items.length > 0 ? (
            <span className="absolute -top-2 -right-3 bg-primary text-white p-0.5 text-[8px] rounded-full h-4 w-4 flex item-center justify-center">
              {items.length}
            </span>
          ) : null}
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetTitle className="text-xl">Your Cart</SheetTitle>
        <div className="p-10">
          {items.length > 0 ? (
            items.map((item) => {
              const { product, quantity } = item;
              const { title, price } = product;
              return (
                <div key={item.id} className="flex flex-col mb-10 items-center">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p>${price}</p>
                  <p>{quantity}</p>
                  <div className="flex justify-center gap-10 mb-10">
                    <Button onClick={() => removeItem(product)}>-</Button>
                    <Button onClick={() => addItem(product)}>+</Button>
                  </div>
                  <Separator />
                </div>
              );
            })
          ) : (
            <div className="min-h-50 flex items-center justify-center">
              Please add items to your cart
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleGoToCart}>Go to cart</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
