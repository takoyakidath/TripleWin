import { useState } from "react";
import { CircleCheckIcon, ClipboardIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";

interface Props extends React.ComponentProps<"button"> {
  copyText?: string;
}

export const CopyButton = (props: Props) => {
  const { copyText = "", className, ...args } = props;
  const [isCopied, setCopied] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = async () => {
    setCopied(false);
    await global.navigator.clipboard.writeText(copyText);
    setTimeout(() => {
      setCopied(true);
    }, 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip defaultOpen={false} open={open}>
        <TooltipTrigger asChild>
          <button
            {...args}
            className={cn("size-6 flex justify-center items-center", className)}
            onClick={() => !isCopied && handleClick()}
            onMouseOver={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {isCopied ? (
              <CircleCheckIcon className={"size-full"} />
            ) : (
              <ClipboardIcon className={"size-full"} />
            )}
          </button>
        </TooltipTrigger>
        {open && (
          <TooltipContent>
            {isCopied ? "コピーしました" : "コピー"}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};