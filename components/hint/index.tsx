import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  children: React.ReactNode;
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

export default function Hint({
  children,
  description,
  side = "bottom",
  sideOffset = 0,
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className="text-xs max-w-[14rem] break-words"
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
