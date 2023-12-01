import React from "react";
import OrgControl from "./_components/org-control";
import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";
import NavBar from "../../_components/navbar";
import SideBar from "../../_components/sidebar";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "Organization"),
  };
}

export default function organizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrgControl />
      <div className="h-full w-full bg-slate-100    ">
        <div className="mx-auto  flex h-full max-w-screen-2xl">
          <div className="hidden w-64 shrink-0 p-4 md:block">
            <SideBar />
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
