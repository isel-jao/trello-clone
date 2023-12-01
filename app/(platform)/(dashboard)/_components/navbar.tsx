import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import MobileSideBar from "./mobile-sidebar";
import FormPopover from "@/components/form-popover";

export default function NavBar() {
  return (
    <nav className="fixed inset-x-0 top-0 flex h-14 items-center justify-center bg-white shadow-sm ">
      <div className="mx-auto  flex h-full w-full max-w-screen-2xl items-center gap-x-4 px-4">
        <MobileSideBar />
        <Logo />
        <FormPopover sideOffset={10} align="start">
          <Button size="sm" className="flex gap-2" variant="primary">
            <span className="hidden md:inline">create </span>
            <Plus size={16} className="md:hidden" />
          </Button>
        </FormPopover>
        <div className="ml-auto flex items-center gap-2">
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
