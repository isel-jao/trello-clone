"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { deleteBoardSchema } from "./schema";

const handler = async (id: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };
  try {
    const board = await db.board.delete({ where: { id } });
    return { data: board };
  } catch (e) {
    console.log({ e });
    return { error: "Something went wrong!" };
  }
};

export const deleteBoard = createSafeAction(deleteBoardSchema, handler);
