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
    return <div>Product doesn't exist</div>;
  }

  const { title, image, category, tags } = product;

  return (
    <div className="bg-gradient-to-b from-background to-muted/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:py-14">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>•</span>
          <span className="text-foreground font-medium">{title}</span>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2 xl:grid-cols-[1.3fr,0.7fr]">
          <div className="space-y-4 rounded-2xl border bg-card/80 shadow-lg p-4 lg:p-6">
            <div className="relative overflow-hidden rounded-xl border bg-muted/20">
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

            <div className="grid gap-3 rounded-xl border bg-card/60 p-4 text-sm text-muted-foreground shadow-sm sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
                <span>30-day returns and secure checkout.</span>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="h-4 w-4 text-primary mt-0.5" />
                <span>Free shipping on orders over $100.</span>
              </div>
            </div>

            {tags?.length ? (
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Tag className="h-4 w-4" />
                {tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 5 && (
                  <span className="rounded-full bg-muted px-3 py-1 font-medium">
                    +{tags.length - 5} more
                  </span>
                )}
              </div>
            ) : null}
          </div>

          <ProductSideBar product={product} />
        </div>
      </div>
    </div>
  );
}
