import React from "react";
import NavBar from "./_components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full  bg-slate-100">
      <NavBar />
      {children}
    </div>
  );
}
