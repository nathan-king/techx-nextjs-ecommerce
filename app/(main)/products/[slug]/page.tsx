import Link from "next/link";
import Image from "next/image";
import { Tag, Truck, ShieldCheck } from "lucide-react";

import { getProductBySlug } from "@/lib/data/products";
import ProductSideBar from "@/components/ProductSidebar";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="w-full rounded-xl border bg-card/70 p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Product not found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find this item. It may have been moved or removed.
        </p>
        <Link href="/" className="text-primary underline underline-offset-4">
          Back to home
        </Link>
      </div>
    );
  }

  const { title, image, category, tags } = product;

  return (
    <div className="bg-linear-to-b from-background to-muted/40 w-full">
      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>•</span>
          <span className="text-foreground font-medium">{title}</span>
        </div>

        <div className="grid items-start gap-6 rounded-2xl glass-panel lg:grid-cols-2 xl:grid-cols-[1.3fr,0.7fr]">
          <div className="space-y-4  p-4 lg:p-6">
            <div className="relative overflow-hidden rounded-xl">
              <div className="relative aspect-square">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1280px) 640px, (min-width: 1024px) 520px, 90vw"
                  className="object-contain p-6 transition duration-500"
                  priority
                />
              </div>
            </div>
          </div>

          <ProductSideBar product={product} />
        </div>
      </div>
    </div>
  );
}
