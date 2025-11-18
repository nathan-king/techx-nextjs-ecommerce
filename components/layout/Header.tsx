import React from "react";
import NavBar from "../NavBar";
import CartSheet from "../CartSheet";

export default function Header() {
  return (
    <div className="w-screen flex justify-between px-10">
      <NavBar />
      <CartSheet />
    </div>
  );
}
