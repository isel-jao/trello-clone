import React from "react";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/board-list";

export default function OrganizationLoading() {
  return (
    <div className="flex h-full  flex-col   px-6 py-12">
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList.Skeleton />
      </div>
    </div>
  );
}
