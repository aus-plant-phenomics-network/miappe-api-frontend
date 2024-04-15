import { forwardRef, useRef } from "react";
import upIcon from "../assets/up.svg";
import downIcon from "../assets/down.svg";
import ToggleButton from "./ToggleButton";

const ToggleListTitle = forwardRef(
  ({ isVisible, setVisible, titleString, className, ...rest }, ref) => {
    const onClickHandler = () => setVisible(!isVisible);
    const title = isVisible ? "Collapse" : "Expand";
    let buttonRef = useRef(null);

    const ExpandCollapseButton = (
      <ToggleButton
        ref={buttonRef}
        state={isVisible}
        onClickHandler={onClickHandler}
        onImg={upIcon}
        offImg={downIcon}
        imgClassName="w-5 h-5"
        title={title}
        className="c-toggle-list-button"
      />
    );

    return (
      <div
        className={
          className
            ? "c-toggle-list-title " + className
            : "c-toggle-list-title flex items-center justify-between"
        }
        ref={ref}
        {...rest}
      >
        <p
          className="text-xl font-medium"
          onClick={() => buttonRef.current?.click()}
          style={{ cursor: "pointer" }}
        >
          {titleString}{" "}
        </p>
        {ExpandCollapseButton}
      </div>
    );
  }
);

ToggleListTitle.displayName = "ToggleListTitle";
export default ToggleListTitle;
