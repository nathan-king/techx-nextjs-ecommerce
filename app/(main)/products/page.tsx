import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data/products";
import { Product } from "@/lib/types";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
