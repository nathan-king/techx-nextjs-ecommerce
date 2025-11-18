import { Product } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { title, slug, description, price } = product;

  return (
    <Card className="p-5">
      <h3>{title}</h3>
      <p>{`$${price}`}</p>
      <p>{description}</p>
      <Button>
        <Link href={`/products/${slug}`}>See Product</Link>
      </Button>
    </Card>
  );
}
