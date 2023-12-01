import FormPopover from "@/components/form-popover";
import Hint from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const description =
  "Free Workspace are limited to 5 boards. Upgrade to a paid plan to create more boards.";

export default async function BoardList() {
  const { orgId } = auth();
  if (!orgId) return redirect("/select-org");

  const boards = await db.board.findMany({
    where: { orgId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4 ">
      <div className="flex items-center gap-2 text-lg font-semibold text-neutral-700">
        <User2 className="aspect-square h-6 " />
        <span>Your boards</span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{
              backgroundImage: `url(${board.imageThumbUrl})`,
            }}
            className="group relative aspect-video overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center p-2 transition-opacity "
          >
            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
            <p className="z-1 relative font-semibold capitalize text-white">
              {board.title}
            </p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="bottom">
          <div
            role="button"
            className="relative flex  aspect-video flex-col items-center justify-center gap-y-1 rounded-sm bg-[#7f7f7f1f] transition-opacity hover:opacity-75"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint description={description} sideOffset={40}>
              <HelpCircle className="absolute  bottom-2 right-2 aspect-square w-4" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="space-y-4 ">
      <div className="flex items-center gap-2 text-lg font-semibold text-neutral-700">
        <User2 className="aspect-square h-6 " />
        <span>Your boards</span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="aspect-video" />
        ))}
      </div>
    </div>
  );
};
