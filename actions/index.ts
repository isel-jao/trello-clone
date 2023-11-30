"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  title: z.string().min(1, "Please enter a title"),
});
export async function createBoard(formData: FormData) {
  const data = formSchema.parse(Object.fromEntries(formData));
  console.log({ data });
  await db.board.create({ data });
  revalidatePath(`/organization/`);
}

export async function deleteBoard(id: string, orgId: string) {
  await db.board.delete({ where: { id } });
  revalidatePath(`/organization/${orgId}`);
}
