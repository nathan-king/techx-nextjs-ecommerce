"use client";

import { Product } from "@/lib/types";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  product: Product;
}

export default function ProductSidebar({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { title, description, price, originalPrice, category } = product;
  const addItem = useCartStore((state) => state.addItem);

  const increment = () => {
    setQuantity((prev) => {
      return prev + 1;
    });
  };

  const decrement = () => {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  };

  const handleChange = (value: number) => {
    if (value > 0) setQuantity(value);
  };

  return (
    <div className="w-full flex justify-center mx-auto">
      <div className="p-10 max-w-xl">
        <h1 className="text-5xl mb-5 font-serif">{title}</h1>
        <p>{description}</p>
        <div className="flex gap-3">
          <p className="line-through text-gray-600">{`$${originalPrice}`}</p>
          <p>{`$${price}`}</p>
        </div>
        <p>{category}</p>
        <div className="flex max-w-md">
          <Button onClick={decrement} className="rounded-none">
            -
          </Button>
          <Input
            value={quantity.toString()}
            type="number"
            onChange={(e) =>
              setQuantity(e.target.value === "" ? 0 : Number(e.target.value))
            }
            className="text-center rounded-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button onClick={increment} className="rounded-none">
            +
          </Button>
        </div>
        <Button onClick={() => addItem(product, quantity)}>Add to cart</Button>
      </div>
    </div>
  );
}
