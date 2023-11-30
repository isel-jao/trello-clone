import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="hover:opacity-75 transition-opacity  gap-2 items-center font-[800] text-lg  hidden md:flex"
    >
      <Image src="/logo.svg" alt="Taskify Logo" width={30} height={30}></Image>
      <p>Taskify</p>
    </Link>
  );
}
