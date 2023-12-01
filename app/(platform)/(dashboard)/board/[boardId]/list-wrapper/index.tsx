import React from "react";

export default function ListWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <li className="h- h-full  shrink-0 select-none">{children}</li>;
}
