import { forwardRef } from "react";
import SButton from "./SButton";

const ToggleButton = forwardRef(
  ({ state, onClickHandler, onImg, offImg, imgClassName, ...rest }, ref) => {
    return (
      <div {...rest}>
        {state ? (
          <SButton
            ref={ref}
            onClick={onClickHandler}
            className={imgClassName}
            imgSrc={onImg}
          />
        ) : (
          <SButton
            ref={ref}
            onClick={onClickHandler}
            className={imgClassName}
            imgSrc={offImg}
          />
        )}
      </div>
    );
  }
);

ToggleButton.displayName = "ToggleButton";
export default ToggleButton;
