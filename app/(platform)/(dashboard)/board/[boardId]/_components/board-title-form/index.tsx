"use client";
import { updateBoard } from "@/actions/update-board";
import { FormSubmit } from "@/components/form-submit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { Edit2, Save, X } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardFormProps {
  board: Board;
}

export default function BoardTitleForm({ board }: BoardFormProps) {
  const [title, setTitle] = useState(board.title);
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      console.log("success");
      toast.success("Board updated");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error updating board");
      setTitle(board.title);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      formRef.current?.focus();
      inputRef.current?.select();
    }, 100);
  };
  const disableEditing = () => {
    formRef.current?.reset();
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const newTitle = formData.get("title") as string;
    setTitle(newTitle);
    execute({ id: board.id, title: newTitle });
    disableEditing();
  };

  if (!isEditing)
    return (
      <div className="  group flex  items-center gap-2 ">
        <span className="whitespace-nowrap px-3 text-lg font-bold">
          {title}
        </span>
        <Button
          variant="ghost"
          className="h-auto w-auto  p-2 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={enableEditing}
        >
          <Edit2 size={16} />
        </Button>
      </div>
    );
  else
    return (
      <form action={onSubmit} className="flex items-center gap-2" ref={formRef}>
        <Input
          ref={inputRef}
          type="text"
          name="title"
          disabled={!isEditing}
          defaultValue={title}
          className=" inline-block w-32  !border-none bg-transparent text-lg font-bold !outline-none !ring-0 focus:border-none"
        />
        <Button
          variant="ghost"
          className=" h-auto  w-auto p-2 "
          onClick={disableEditing}
        >
          <X size={16} />
        </Button>
        <FormSubmit
          name="title"
          variant="ghost"
          className=" h-auto w-auto p-2"
          onClick={enableEditing}
        >
          <Save size={16} />
        </FormSubmit>
      </form>
    );
}
