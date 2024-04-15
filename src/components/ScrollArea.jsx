import { forwardRef } from "react";

const ScrollArea = forwardRef(({ children, ...rest }, ref) => {
  return (
    <div {...rest} ref={ref}>
      <div className="h-full w-full overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
});

ScrollArea.displayName = "ScrollArea";
export default ScrollArea;
