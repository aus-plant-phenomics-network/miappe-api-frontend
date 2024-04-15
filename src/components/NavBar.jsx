import { forwardRef, useState } from "react";
import expandIcon from "../assets/expand.svg";
import collapseIcon from "../assets/collapse.svg";
import ToggleButton from "./ToggleButton";

const NavBar = forwardRef(({ children, ...rest }, ref) => {
  const [isVisible, setIsVisibe] = useState(true);
  const [width, setWidth] = useState("260px");
  const title = isVisible ? "Collapse" : "Expand";

  const onClickHandler = () => {
    isVisible ? setWidth("0px") : setWidth("260px");
    setIsVisibe(!isVisible);
  };

  // Expand and Collapse Button
  const ExpandCollapseButton = (
    <ToggleButton
      className="w-fit h-fit absolute left-0 top-1/2"
      state={isVisible}
      imgClassName="w-4 h-4"
      onClickHandler={onClickHandler}
      onImg={collapseIcon}
      offImg={expandIcon}
      title={title}
    />
  );

  return (
    <div {...rest} ref={ref}>
      <div
        className="h-full overflow-auto bg-gray-200"
        style={{ width: width }}
      >
        {children}
      </div>
      <div className="h-full w-5 relative bg-gray-100 rounded-r-md">
        {ExpandCollapseButton}
      </div>
    </div>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;
