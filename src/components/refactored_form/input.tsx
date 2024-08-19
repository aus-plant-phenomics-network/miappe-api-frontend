import React from "react";

/**
 * Input component that is automatically highlighted if validation fails.
 *
 * Accepts [regular input](https://react.dev/reference/react-dom/components/input) props
 */
const Input = React.memo(
  React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
    (props, ref) => {
      const [valid, setValid] = React.useState(true);
      const { onChange, ...rest } = props;
      return (
        <input
          {...rest}
          ref={ref}
          onChange={e => {
            onChange && onChange(e);
            setValid(true);
          }}
          data-valid={valid ? "valid" : "invalid"}
          onInvalid={e => {
            e.preventDefault();
            setValid(false);
          }}
        />
      );
    },
  ),
);

export { Input };
