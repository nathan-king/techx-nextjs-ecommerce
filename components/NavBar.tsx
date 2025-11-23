"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Computers", href: "/computers" },
  { title: "Mobiles", href: "/mobiles" },
  { title: "Wearables", href: "/wearables" },
  { title: "Audio", href: "/audio" },
  { title: "Accessories", href: "/accessories" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-20">
        {navItems.map(({ title, href }) => (
          <NavigationMenuItem key={title}>
            <NavigationMenuLink asChild>
              <Link
                href={href}
                className={cn(
                  "text-md text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  pathname.startsWith(href) &&
                    "text-primary font-semibold underline underline-offset-4"
                )}
                aria-current={pathname.startsWith(href) ? "page" : undefined}
              >
                {title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
