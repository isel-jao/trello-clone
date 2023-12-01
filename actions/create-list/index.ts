"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { createListSchema } from "./schema";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };
  try {
    console.log({ data });

    const board = await db.board.findUnique({
      where: { id: data.boardId },
      select: {
        lists: {
          take: 1,
          select: { order: true },
          orderBy: { order: "desc" },
        },
      },
    });

    if (!board) return { error: "Board not found" };
    const order = (board.lists[0]?.order || 0) + 1;

    const list = await db.list.create({ data: { ...data, order } });
    revalidatePath(`/board/${data.boardId}`);
    return { data: list };
  } catch (e) {
    console.log({ e });
    return { error: "Something went wrong!" };
  }
};

export const createList = createSafeAction(createListSchema, handler);
