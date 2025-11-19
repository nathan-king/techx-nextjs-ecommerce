import Link from "next/link";
import NavBar from "../NavBar";
import CartSheet from "../CartSheet";
import { Heart, User } from "lucide-react";
import { Separator } from "../ui/separator";

export default function Header() {
  return (
    <div className="max-w-screen block border-b">
      <div className="max-w-7xl mx-auto">
        <div className="mx-auto flex justify-center py-3 items-center relative">
          <Link href="/" className="font-semibold">
            TechX
          </Link>
          <div className="flex flex-row gap-3 absolute right-0">
            <User />
            <Heart />
            <CartSheet />
          </div>
        </div>
        <Separator />
        <div className="flex mx-auto max-w-7xl justify-between py-3">
          <NavBar />
        </div>
      </div>
    </div>
  );
}
