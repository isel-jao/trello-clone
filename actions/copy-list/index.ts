"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { copyListSchema } from "./schema";
import { revalidatePath } from "next/cache";

const handler = async (id: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };
  try {
    const list = await db.list.findUnique({
      where: { id },
      include: {
        cards: true,
        board: {
          include: {
            lists: {
              take: 1,
              orderBy: { order: "desc" },
            },
          },
        },
      },
    });
    if (!list) return { error: "List not found" };
    const order = list.board.lists[0].order + 1;
    const copyList = await db.list.create({
      data: {
        title: `${list.title} (copy)`,
        order,
        boardId: list.boardId,
        cards: {
          createMany: {
            data: list.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
    });
    revalidatePath(`/board/${list.boardId}`);
    return { data: copyList };
  } catch (e) {
    console.log({ e });
    return { error: "Something went wrong!" };
  }
};

export const copyList = createSafeAction(copyListSchema, handler);
