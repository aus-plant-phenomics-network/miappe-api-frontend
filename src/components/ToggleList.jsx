import { forwardRef, useState } from "react";
import upIcon from "../assets/up.svg";
import downIcon from "../assets/down.svg";
import ToggleButton from "./ToggleButton";

const ToggleList = forwardRef(({ listTitle, listItems, ...rest }, ref) => {
  const [isVisible, setVisible] = useState(true);
  const onClickHandler = () => setVisible(!isVisible);
  const title = isVisible ? "Collapse" : "Expand";

  const ExpandCollapseButton = (
    <ToggleButton
      state={isVisible}
      onClickHandler={onClickHandler}
      onImg={upIcon}
      offImg={downIcon}
      imgClassName="w-5 h-5"
      title={title}
    />
  );

  return (
    <div {...rest} ref={ref}>
      <div className="flex items-center justify-between">
        {listTitle}
        {ExpandCollapseButton}
      </div>
      {isVisible && listItems ? listItems : <></>}
    </div>
  );
});

ToggleList.displayName = "ToggleList";

export default ToggleList;
