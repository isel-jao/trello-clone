import { z } from "zod";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { deleteBoard } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import FormButton from "@/components/form-button";
import { Form } from "./form";

export default async function Organization() {
  const { orgId } = auth();

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const boards = await db.board.findMany({
    orderBy: { title: "asc" },
  });

  return (
    <div className="flex flex-col  h-full p-6">
      <Card className="p-4">
        <Form />
      </Card>
      <div className="flex flex-col gap-4 py-6">
        {boards.map(({ id, title }) => {
          const deleteBoardWithId = deleteBoard.bind(null, id, orgId!);
          return (
            <form
              action={deleteBoardWithId}
              className="capitalize flex justify-between"
              key={id}
            >
              <span>{title}</span>
              <FormButton size="sm" variant="destructive">
                <X />
              </FormButton>
            </form>
          );
        })}
      </div>
    </div>
  );
}
