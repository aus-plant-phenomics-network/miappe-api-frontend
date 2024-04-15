import { forwardRef } from "react";

const ToggleButton = forwardRef(
  ({ state, onButton, offButton, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref}>
        {state ? onButton : offButton}
      </div>
    );
  }
);

ToggleButton.displayName = "ToggleButton";
export default ToggleButton;
