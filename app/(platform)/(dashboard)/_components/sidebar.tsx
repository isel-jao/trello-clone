"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import NavItem, { Organization } from "./navitem";

interface SideBarProps {
  storageKey?: string;
}

export default function SideBar({
  storageKey = "t-sidebar-state",
}: SideBarProps) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    []
  );
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: { infinite: true },
  });
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) acc.push(key);
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !expanded[id] }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading || 3 > 2)
    return (
      <div className="w-full flex flex-col ">
        <div className="flex justify-between mb-2">
          <Skeleton className="h-10 w-1/2 " />
          <Skeleton className="h-10 w-10 " />
        </div>
        <Skeleton className="w-full h-10" />
        <div className="flex flex-col gap-2 pl-10 py-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="pl-4 h-10" />
          ))}
        </div>
      </div>
    );
  return (
    <div className="w-full flex flex-col ">
      <div className="font-medium text-xs flex items-center mb-1  shrink-0">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus size={16} />
          </Link>
        </Button>
      </div>
      <Accordion type="multiple" className="space-y-2 ">
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </div>
  );
}
