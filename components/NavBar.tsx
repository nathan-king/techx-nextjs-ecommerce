"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { title: "Computers", href: "/computers" },
  { title: "Mobiles", href: "/mobiles" },
  { title: "Wearables", href: "/wearables" },
  { title: "Audio", href: "/audio" },
  { title: "Accessories", href: "/accessories" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Desktop nav */}
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList className="flex flex-wrap gap-4 md:gap-6 lg:gap-10">
          {navItems.map(({ title, href }) => (
            <NavigationMenuItem key={title}>
              <NavigationMenuLink asChild>
                <Link
                  href={href}
                  className={cn(
                    "relative text-sm sm:text-md text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    pathname.startsWith(href) && "text-primary font-semibold"
                  )}
                  aria-current={pathname.startsWith(href) ? "page" : undefined}
                >
                  {title}
                  {pathname.startsWith(href) && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-primary" />
                  )}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile nav */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              aria-label="Open navigation"
            >
              <Menu
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  open && "rotate-90"
                )}
              />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex w-full sm:max-w-sm flex-col gap-4 p-0 border-r-0"
          >
            <SheetHeader className="px-5 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter:blur(0)]:bg-background/60">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              </div>
            </SheetHeader>
            <div className="flex flex-col gap-1.5 px-5 pb-6">
              {navItems.map(({ title, href }) => (
                <SheetClose asChild key={title}>
                  <Link
                    href={href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-base transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      pathname.startsWith(href) &&
                        "bg-accent text-accent-foreground font-semibold"
                    )}
                    aria-current={
                      pathname.startsWith(href) ? "page" : undefined
                    }
                  >
                    {title}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
