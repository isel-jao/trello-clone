"use client";

import Image from "next/image";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import { AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { AccordionContent, AccordionItem } from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface Props {
  isActive: boolean;
  isExpanded: boolean;
  onExpand: (is: string) => void;
  organization: Organization;
}
const NavItem = ({ isActive, isExpanded, onExpand, organization }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10  text-start hover:no-underline",
          {
            "bg-sky-500/10 text-sky-700": isActive && !isExpanded,
          }
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 aspect-square relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="org"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700 transition">
        {routes.map(({ label, href, icon }) => (
          <Button
            onClick={() => onClick(href)}
            key={href}
            size="sm"
            variant="ghost"
            className={cn("w-full flex justify-start pl-10 mb-1", {
              "bg-sky-500/10 text-sky-700 ": pathname === href,
            })}
          >
            {icon}
            {label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavItem;

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="w-full flex flex-col ">
      <div className="flex justify-between mb-2">
        <Skeleton className="h-10 w-1/2 " />
        <Skeleton className="h-10 w-10 " />
      </div>
    </div>
  );
};
