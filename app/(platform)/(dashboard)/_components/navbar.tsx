import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import MobileSideBar from "./mobile-sidebar";

export default function NavBar() {
  return (
    <nav className="fixed flex items-center inset-x-0 h-14 justify-center bg-white shadow-sm top-0 ">
      <div className="max-w-screen-2xl  h-full px-4 w-full flex items-center mx-auto gap-x-4">
        <MobileSideBar />
        <Logo />
        <Button size="sm" className="flex gap-2" variant="primary">
          <span className="hidden md:inline">create </span>
          <Plus size={16} className="md:hidden" />
        </Button>
        <div className="flex gap-2 items-center ml-auto">
          <OrganizationSwitcher
            hidePersonal
            afterLeaveOrganizationUrl="/select-org"
            afterCreateOrganizationUrl="/organization/:id"
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              },
            }}
          />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
}
