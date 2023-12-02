"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { deleteListSchema } from "./schema";
import { revalidatePath } from "next/cache";

const handler = async (id: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };
  try {
    const list = await db.list.delete({ where: { id } });
    revalidatePath(`/board/${list.boardId}`);
    return { data: list };
  } catch (e) {
    console.log({ e });
    return { error: "Something went wrong!" };
  }
};

export const deleteList = createSafeAction(deleteListSchema, handler);
