"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { createBoardSchema } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };
  try {
    console.log({ data });

    const board = await db.board.create({ data: { ...data, orgId } });
    return { data: board };
  } catch (e) {
    console.log({ e });
    return { error: "Something went wrong!" };
  }
};

export const createBoard = createSafeAction(createBoardSchema, handler);
