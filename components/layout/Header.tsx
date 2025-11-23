import Link from "next/link";
import NavBar from "../NavBar";
import CartSheet from "../CartSheet";
import WishListSheet from "../WishListSheet";
import { User } from "lucide-react";

export default function Header() {
  return (
    <div className="w-full border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-4">
          <Link
            href="/"
            className="font-bold font-heading text-2xl text-primary"
          >
            TECHX
          </Link>

          <div className="flex flex-row gap-3 items-center">
            {/* NavBar includes the burger menu on mobile */}
            <div className="md:hidden">
              <NavBar />
            </div>
            <User className="h-5 w-5" />
            <WishListSheet />
            <CartSheet />
          </div>
        </div>
      </div>
      <div className="w-full border-b hidden md:block" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 hidden md:block">
        <NavBar />
      </div>
    </div>
  );
}
