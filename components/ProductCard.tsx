import { Product } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <h3>{product.title}</h3>
      <p>{`$${product.price}`}</p>
    </Card>
  );
}
