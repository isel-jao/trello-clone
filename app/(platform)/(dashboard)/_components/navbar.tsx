import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <nav className=" h-14 justify-center bg-white shadow ">
      <div className="max-w-screen-2xl  h-full px-4 w-full flex items-center mx-auto gap-x-4">
        <Logo />
        <Button>create</Button>
      </div>
    </nav>
  );
}
