import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect, notFound } from "next/navigation";
import React from "react";
import BoardNavbar from "./_components/navbar";

export default async function BoardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) {
  const { boardId } = params;
  const { orgId } = auth();
  if (!orgId) return redirect("/select-org");

  const board = await db.board.findUnique({ where: { id: boardId } });
  if (!board) return notFound();

  return (
    <div
      className=" relative h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${board.imageFullUrl})`,
      }}
    >
      <BoardNavbar board={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className=" relative h-full px-4 pt-16">{children}</main>
    </div>
  );
}
