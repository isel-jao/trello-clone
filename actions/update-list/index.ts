"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { updateListSchema } from "./schema";

const handler = async ({ id, ...data }: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };
  try {
    console.log({ data });

    const list = await db.list.update({ where: { id }, data });
    return { data: list };
  } catch (e) {
    console.log({ e });
    return { error: "Something went wrong!" };
  }
};

export const updateList = createSafeAction(updateListSchema, handler);
