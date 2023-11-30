import React from "react";

export default function OrganizationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className=" h-full w-full">{children}</main>;
}
