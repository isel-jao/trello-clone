import React from "react";
import NavBar from "./_components/navbar";
import SideBar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full bg-slate-100  pt-14   ">
      <NavBar />
      {children}
    </div>
  );
}
