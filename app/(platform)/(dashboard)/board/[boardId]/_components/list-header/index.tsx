import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form-input";
import { FormSubmit } from "@/components/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { update } from "lodash";
import { Edit2, Save, X } from "lucide-react";
import React, { useEffect, ElementRef, useRef } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

export default function ListHeader({ list }: { list: List }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const submitRef = useRef<ElementRef<"button">>(null);

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      setTitle(data.title);
      toast.success("List updated");
    },
    onError: (error) => {
      toast.error("Error updating list");
      setTitle(list.title);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") disableEditing();
    if (e.key === "Enter") formRef.current?.requestSubmit();
  });

  const onSubmit = (formData: FormData) => {
    console.log("submitting");

    const newTitle = formData.get("title") as string;
    setTitle(newTitle);
    execute({
      id: list.id,
      title: newTitle,
    });
    disableEditing();
  };

  const onblur = () => {
    submitRef.current?.click();
  };

  useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  return (
    <div className=" flex h-10 w-full flex-col capitalize">
      {isEditing ? (
        <form action={onSubmit} ref={formRef} className="space-y-2">
          <FormInput
            onBlur={onblur}
            ref={inputRef}
            defaultValue={title}
            name="title"
            className=" [&>input]:font-sm   [&>input]:pr-6 [&>input]:!ring-0 "
            placeholder="Enter list title..."
          />
          <button className="hidden" type="submit" ref={submitRef}></button>
        </form>
      ) : (
        <Button
          className="flex w-full justify-start"
          variant="ghost"
          onClick={enableEditing}
        >
          {title}
        </Button>
      )}
    </div>
  );
}
