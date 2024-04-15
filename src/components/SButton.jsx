import { forwardRef } from "react";

const SButton = forwardRef(({ imgSrc, ...rest }, ref) => {
  return (
    <button {...rest} ref={ref}>
      <img src={imgSrc} alt="sbutton" className="hover:opacity-50" />
    </button>
  );
});

SButton.displayName = "SButton";
export default SButton;
