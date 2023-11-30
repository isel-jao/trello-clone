"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { createBoardSchema } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId } = auth();

  if (!userId) return { error: "Unauthorized" };
  console.log(`handler: userId ${userId}`);

  try {
    const board = await db.board.create({ data });
    revalidatePath(`/board/${board.id}`);
    return { data: board };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong" };
  }
};

export const createBoard = createSafeAction(createBoardSchema, handler);
