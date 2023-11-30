import FormPopover from "@/components/form-popover";
import Hint from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";
import React from "react";

const description =
  "Free Workspace are limited to 5 boards. Upgrade to a paid plan to create more boards.";

export default function BoardList() {
  return (
    <div className="space-y-4 ">
      <div className="flex gap-2 items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 aspect-square " />
        <span>Your boards</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover sideOffset={10} side="bottom">
          <div
            role="button"
            className="aspect-video relative  bg-[#7f7f7f1f] rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition-opacity"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint description={description} sideOffset={40}>
              <HelpCircle className="w-4  absolute right-2 bottom-2 aspect-square" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}
