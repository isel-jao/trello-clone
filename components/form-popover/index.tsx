"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";

import { FormInput } from "@/components/form-input";
import { FormSubmit } from "@/components/form-submit";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { createBoardSchema } from "@/actions/create-board/schema";
import { toast } from "sonner";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export default function FormPopover({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: () => {
      console.log("success");
      toast.success("Board created");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error creating board");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    console.log({ title });
    execute({ title });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="absolute h-auto p-2 right-2 top-2 text-neutral-600"
          >
            <X className="w-4 h-4 " />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="flex flex-col gap-4">
          <div className="space-y-4">
            <FormInput
              errors={fieldErrors}
              autoFocus
              name="title"
              label="Title"
            />
          </div>
          <FormSubmit>submit</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
