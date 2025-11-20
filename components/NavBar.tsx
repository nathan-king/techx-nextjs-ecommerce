"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";

export default function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-20 font-serif">
        <NavigationMenuItem>
          <Link href="/computers">Computers</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/mobiles">Mobiles</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/accessories">Accessories</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/products">Products</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
