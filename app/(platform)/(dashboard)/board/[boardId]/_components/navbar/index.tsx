import { auth } from "@clerk/nextjs";
import { Board } from "@prisma/client";
import React from "react";
import BoardTitleForm from "../board-title-form";
import BoardOptions from "../board-options";

interface BoardNavbarProps {
  board: Board;
}

export default function BoardNavbar({ board }: BoardNavbarProps) {
  const { orgId } = auth();
  return (
    <div className="absolute inset-x-2 top-2 z-10 flex h-12 items-center gap-x-4 rounded-sm bg-black/50 px-4  text-white shadow">
      <BoardTitleForm board={board} />
      <BoardOptions board={board} />
    </div>
  );
}
