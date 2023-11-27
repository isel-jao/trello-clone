import React from "react";

export default function ClerkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full  grid place-content-center">{children}</div>
  );
}
