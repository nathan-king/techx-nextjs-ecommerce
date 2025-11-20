"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <Card className="max-w-5xl mx-auto w-full">
      <div className="p-10">
        {items.length > 0 ? (
          items.map((item) => {
            const { product, quantity } = item;
            const { title, price, image } = product;
            return (
              <div className="flex">
                <Image src={image} alt={title} height={400} width={400} />
                <div key={item.id}>
                  <div className="mb-10 flex flex-col justify-center items-center">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p>{price}</p>
                    <p>{quantity}</p>

                    <div className="flex justify-center gap-10">
                      <Button onClick={() => removeItem(product)}>-</Button>
                      <Button onClick={() => addItem(product)}>+</Button>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="min-h-50 flex items-center justify-center">
            Please add items to your cart
          </div>
        )}
      </div>
    </Card>
  );
}
