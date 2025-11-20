import { getProductBySlug } from "@/lib/data/products";
import Image from "next/image";
import ProductSideBar from "@/components/ProductSidebar";
// import { useState } from "react";

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

  const { title, image } = product;

  return (
    <div className="flex w-full justify-between">
      <Image
        src={image}
        alt={title}
        height={500}
        width={500}
        className="h-150 w-150 shadow-lg"
      />
      <ProductSideBar product={product} />
    </div>
  );
}
