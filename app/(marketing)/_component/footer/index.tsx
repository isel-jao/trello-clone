import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <div className="fixed inset-x-0 bottom-0  h-24 border shadow-sm flex ">
      <div className="flex w-full max-w-screen-2xl mx-auto  items-center px-4 justify-between">
        <Logo />
        <div className="flex   w-full md:w-auto gap-4 justify-between">
          <Button variant="ghost" asChild>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/terms-of-service">Terms of Service</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
