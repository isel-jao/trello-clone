"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";

export default function ClientUserPage() {
  const { userId } = useAuth();
  const { user } = useUser();
  return (
    <div className="bg-slate-100 h-full">
      <div className="flex p-2 shadow bg-white items-center">
        {userId}
        <div className="flex ml-auto gap-4 items-center bg-slate-200 rounded p-2 w-fit">
          <span>{`${user?.firstName || ""} ${user?.lastName || ""}`}</span>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
