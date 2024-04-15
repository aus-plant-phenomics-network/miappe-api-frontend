import { forwardRef } from "react";
import ToggleListItem from "./ToggleListItem";

const ToggleListItemGroup = forwardRef(({ data, isVisible, ...rest }, ref) => {
  const renderedGroup = (
    <div
      className={
        rest.className
          ? "c-toggle-list-group " + rest.className
          : "c-toggle-list-group pl-3 flex flex-col my-3"
      }
      {...rest}
      ref={ref}
    >
      {data ? (
        Object.entries(data).map(([linkName, to]) => (
          <ToggleListItem key={to} linkName={linkName} to={to} />
        ))
      ) : (
        <></>
      )}
    </div>
  );

  return isVisible ? renderedGroup : <></>;
});

ToggleListItemGroup.displayName = "ToggleListItemGroup";
export default ToggleListItemGroup;
