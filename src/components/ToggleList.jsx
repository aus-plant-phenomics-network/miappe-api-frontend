import { forwardRef, useState } from "react";
import ToggleListTitle from "./ToggleListTitle";
import ToggleListItemGroup from "./ToggleListItemGroup";

const ToggleList = forwardRef(
  (
    {
      titleValue,
      listValue,
      className = "",
      toggleListTitleProps,
      toggleListItemProps,
      ...rest
    },
    ref
  ) => {
    const [isVisible, setVisible] = useState(true);

    return (
      <div {...rest} ref={ref} className={"c-toggle-list " + className}>
        <ToggleListTitle
          isVisible={isVisible}
          setVisible={setVisible}
          data={titleValue}
          {...toggleListTitleProps}
        />
        <ToggleListItemGroup
          isVisible={isVisible}
          data={listValue}
          {...toggleListItemProps}
        />
      </div>
    );
  }
);

ToggleList.displayName = "ToggleList";
export default ToggleList;
