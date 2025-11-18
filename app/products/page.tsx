import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data/products";
import { Product } from "@/lib/types";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
