"use client";

import { createBoard } from "@/actions/create-board";
import FormButton from "@/components/form-button";
import { FormInput } from "@/components/form-input";
import { useAction } from "@/hooks/use-action";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const action = (formData: FormData) => {
    const title = formData.get("title") as string;

    console.log({ title });

    execute({ title });
  };
  return (
    <form action={action} className="flex flex-col gap-4">
      <FormInput label="Board title" name="title" errors={fieldErrors} />
      <FormButton type="submit">Submit</FormButton>
    </form>
  );
};
