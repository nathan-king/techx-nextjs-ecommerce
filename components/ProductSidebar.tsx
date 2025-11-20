"use client";

import { Product } from "@/lib/types";
import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  product: Product;
}

export default function ProductSidebar({ product }: Props) {
  const [quantity, setQuantity] = useState(0);
  const { title, description, price, category } = product;

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
    <div className="w-full flex justify-center">
      <div className="p-10">
        <h1 className="text-5xl mb-5">{title}</h1>
        <p>{description}</p>
        <p>{price}</p>
        <p>{category}</p>
        <div className="flex max-w-md">
          <Button onClick={decrement}>-</Button>
          <Input
            value={quantity.toString()}
            type="number"
            onChange={(e) =>
              setQuantity(e.target.value === "" ? 0 : Number(e.target.value))
            }
            className="text-center"
          />
          <Button onClick={increment}>+</Button>
        </div>
      </div>
    </div>
  );
}
