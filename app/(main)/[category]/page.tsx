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
      <div className="p-8">
        <h1 className="text-2xl font-bold">Category: {category}</h1>
        <p>No products found in this category.</p>
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
