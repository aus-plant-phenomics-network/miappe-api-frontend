import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const ToggleListItem = forwardRef(({ linkName, to, ...rest }, ref) => {
  return (
    <NavLink to={to} {...rest} ref={ref}>
      {linkName}
    </NavLink>
  );
});

ToggleListItem.displayName = "ToggleListItem";
export default ToggleListItem;
