import React from "react";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";

const Table = React.memo(
  React.forwardRef<HTMLDivElement, TailwindComponentProps<"div">>(
    (props, ref) => {
      const { children, ...rest } = props;
      return (
        <styled.div themeName="TableRoot" {...rest} ref={ref}>
          <styled.table themeName="Table">{children}</styled.table>
        </styled.div>
      );
    }
  )
);

export { Table };
