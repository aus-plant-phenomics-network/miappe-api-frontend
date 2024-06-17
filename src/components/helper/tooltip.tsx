import * as _Tooltip from "@radix-ui/react-tooltip";
import * as React from "react";

interface TooltipProps {
  tooltipContent: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, tooltipContent }) => {
  return (
    <_Tooltip.Provider>
      <_Tooltip.Root>
        <_Tooltip.Trigger asChild>{children}</_Tooltip.Trigger>
        <_Tooltip.Portal>
          <_Tooltip.Content
            className="TooltipContent PopoverContent"
            sideOffset={5}
            hideWhenDetached={true}
          >
            {tooltipContent}
            <_Tooltip.Arrow className="TooltipArrow" />
          </_Tooltip.Content>
        </_Tooltip.Portal>
      </_Tooltip.Root>
    </_Tooltip.Provider>
  );
};

export { Tooltip };
export type { TooltipProps };
