import { db } from "@/lib/db";
import React from "react";
import ListContainer from "./_components/list-container";

export default async function BoardPage({
  params,
}: {
  params: { boardId: string };
}) {
  const { boardId } = params;
  const lists = await db.list.findMany({
    where: { boardId },
    orderBy: { order: "asc" },
    include: { cards: { orderBy: { order: "asc" } } },
  });
  return (
    <div className=" h-full">
      <ListContainer lists={lists} boardId={boardId} />
    </div>
  );
}
