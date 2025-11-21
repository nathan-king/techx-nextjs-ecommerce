"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "./ui/navigation-menu";

const navItems = [
  { title: "Computers", href: "/computers" },
  { title: "Mobiles", href: "/mobiles" },
  { title: "Wearables", href: "/wearables" },
  { title: "Audio", href: "/audio" },
  { title: "Accessories", href: "/accessories" },
];

export default function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-20">
        {navItems.map(({ title, href }) => (
          <NavigationMenuItem key={title}>
            <NavigationMenuLink asChild>
              <Link href={href} className="text-md text-foreground">
                {title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
