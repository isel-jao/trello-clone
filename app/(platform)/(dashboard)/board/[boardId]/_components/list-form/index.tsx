"use client";
import { Button } from "@/components/ui/button";
import ListWrapper from "../../list-wrapper";
import { Plus, X } from "lucide-react";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form-input";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";
import { ListWithCards } from "@/types";
import { FormSubmit } from "@/components/form-submit";

export default function ListForm() {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute } = useAction(createList, {
    onSuccess: () => {
      disableEditing();
      toast.success("List created");
    },
    onError: () => {
      toast.error("Error creating list");
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const boardId = params.boardId as string;
    const title = formData.get("title") as string;
    execute({ boardId, title });
  };

  return (
    <ListWrapper>
      <div className="flex  rounded-md  bg-white/50 px-2 py-2 shadow-sm backdrop-blur-sm">
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormInput
              ref={inputRef}
              name="title"
              className=" [&>input]:font-sm   [&>input]:pr-6 [&>input]:!ring-0 "
              placeholder="Enter list title..."
            />

            <input
              type="text"
              className="hidden"
              name="boardId "
              value={params.boardId}
            />
            <div className="flex gap-4">
              <Button onClick={disableEditing} size="sm" variant="outline">
                cancel
              </Button>
              <FormSubmit size="sm" variant="primary">
                Add list
              </FormSubmit>
            </div>
          </form>
        ) : (
          <Button
            className="flex w-full justify-start"
            variant="ghost"
            onClick={enableEditing}
          >
            <Plus className="mr-2" size={16} />
            <span>Add list</span>
          </Button>
        )}
      </div>
    </ListWrapper>
  );
}
