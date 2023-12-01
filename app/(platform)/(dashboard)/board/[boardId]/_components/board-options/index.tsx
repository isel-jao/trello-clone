"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";

import { Board } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function BoardOptions({ board }: { board: Board }) {
  const router = useRouter();
  const { execute, loading } = useAction(deleteBoard, {
    onSuccess: () => {
      router.push(`/organization/${board.orgId}`);
      toast.success("Board deleted");
    },
    onError: () => {
      toast.error("Failed to delete board");
    },
  });

  const handleDeleteBoard = () => {
    execute(board.id);
  };
  return (
    <Popover>
      <PopoverTrigger className="ml-auto" asChild>
        <Button variant="ghost" className="h-auto w-auto p-2">
          <MoreHorizontal className="aspect-square h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="selection: relative flex flex-col gap-4 px-3 py-3"
      >
        <div className="text-center text-sm font-medium">Board actions</div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="absolute right-1 top-2 aspect-square h-auto w-auto rounded-full p-0 hover:bg-black/5"
          >
            <X className="aspect-square h-4 text-neutral-600" />
          </Button>
        </PopoverClose>
        <Button
          disabled={loading}
          size="sm"
          variant="ghost"
          className="text-red-500 hover:bg-red-500/10"
          onClick={handleDeleteBoard}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
}
