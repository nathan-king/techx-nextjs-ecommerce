import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductByCategory } from "@/lib/data/products";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const products = await getProductByCategory(category);

  if (!products || products.length === 0) {
    return (
      <div className="w-full rounded-xl border bg-card/70 p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Category: {category}</h1>
        <p className="text-muted-foreground mb-6">
          No products found in this category.
        </p>
        <Link href="/" className="text-primary underline underline-offset-4">
          Browse all products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.title} product={product} />
      ))}
    </div>
  );
}
