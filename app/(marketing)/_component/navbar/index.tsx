import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";

export function NavBar() {
  return (
    <div className="fixed inset-x-0 top-0  h-16 border shadow-sm flex bg-white">
      <div className="flex w-full max-w-screen-2xl mx-auto  items-center px-4 justify-between">
        <Logo />
        <div className="flex   w-full md:w-auto gap-4 justify-between">
          <Button variant="outline" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
