"use client";

import React, { ElementRef, useRef } from "react";
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
import { toast } from "sonner";
import { FormPicker } from "../form-picker";
import { useRouter } from "next/navigation";

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
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log("success");
      toast.success("Board created");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error creating board");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string | undefined;

    if (!image)
      return toast.error("Please select an image to use as your board cover");
    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] =
      image?.split("|");

    execute({
      title,
      imageFullUrl,
      imageId,
      imageLinkHtml,
      imageThumbUrl,
      imageUserName,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3 "
        side={side}
        sideOffset={sideOffset}
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Create board
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            variant="ghost"
            className="absolute right-2 top-2 h-auto p-2 text-neutral-600"
          >
            <X className="h-4 w-4 " />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="flex flex-col gap-6">
          <FormPicker name="image" errors={fieldErrors} />
          <FormInput
            errors={fieldErrors}
            autoFocus
            name="title"
            label="Title"
          />

          <FormSubmit variant="primary">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
