import { getProductBySlug } from "@/lib/data/products";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  console.log(`Slug: ${slug}`);
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product doesn't exist</div>;
  }

  const { title, description, price, category } = product;

  return (
    <div>
      <h1 className="text-5xl">{title}</h1>
      <p>{description}</p>
      <p>{price}</p>
      <p>{category}</p>
    </div>
  );
}
