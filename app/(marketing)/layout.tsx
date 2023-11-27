import React from "react";
import { NavBar } from "./_component/navbar";
import { Footer } from "./_component/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-slate-100">
      <NavBar />
      <main className="pt-40 pb-20">{children}</main>
      <Footer />
    </div>
  );
}
