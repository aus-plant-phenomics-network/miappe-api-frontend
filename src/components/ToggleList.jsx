import { forwardRef, useState } from "react";
import ToggleListTitle from "./ToggleListTitle";
import ToggleListItemGroup from "./ToggleListItemGroup";

const ToggleList = forwardRef(({ titleString, listData, ...rest }, ref) => {
  const [isVisible, setVisible] = useState(true);

  return (
    <div
      {...rest}
      ref={ref}
      className={
        rest.className ? "c-toggle-list " + rest.className : "c-toggle-list"
      }
    >
      <ToggleListTitle
        isVisible={isVisible}
        setVisible={setVisible}
        titleString={titleString}
      />
      <ToggleListItemGroup isVisible={isVisible} data={listData} />
    </div>
  );
});

ToggleList.displayName = "ToggleList";
export default ToggleList;
