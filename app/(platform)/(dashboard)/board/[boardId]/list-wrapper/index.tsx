import React from "react";

export default function ListWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <li className="h- h-full w-64 shrink-0 select-none">{children}</li>;
}
