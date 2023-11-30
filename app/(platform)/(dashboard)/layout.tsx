import React from "react";
import NavBar from "./_components/navbar";
import SideBar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full pt-14 debug` bg-slate-100   ">
      <NavBar />
      <div className="flex  h-full max-w-screen-2xl mx-auto">
        <div className="w-64 shrink-0 hidden md:block p-4">
          <SideBar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
