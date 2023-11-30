"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { CreditCardIcon } from "lucide-react";

export default function Info() {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return Info.Skeleton();
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-14 aspect-square relative">
        <Image
          fill
          className="rounded-md object-cover"
          src={organization?.imageUrl || "/logo.svg"}
          alt={organization?.name || "Taskify Logo"}
        />
      </div>
      <div className="space-y-1 ">
        <p className="font-semibold text-xl">
          {organization?.name || "Taskify"}
        </p>
        <div className="flex items-center text-muted-foreground gap-2">
          <CreditCardIcon className="w-3 aspect-square" />
          <span className="text-xs">free</span>
        </div>
      </div>
    </div>
  );
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="flex items-center gap-x-4">
      <Skeleton className="w-14 aspect-square" />
      <div className="space-y-2 ">
        <Skeleton className="w-32 h-5" />
        <Skeleton className="w-10 h-3" />
      </div>
    </div>
  );
};
