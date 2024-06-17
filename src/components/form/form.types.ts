import { TypeLiterals } from "../types";
import { SelectProps as PrimitiveSelectProps } from "../select";
import React from "react";

interface InputSelectOwnProps extends PrimitiveSelectProps {
  type: TypeLiterals;
  fetcherKey: string;
  labelKey: string;
  titleKey: string;
}

interface InputProps
  extends Omit<
      React.ComponentPropsWithoutRef<"input">,
      | "name"
      | "required"
      | "type"
      | "placeholder"
      | "defaultValue"
      | "autoComplete"
    >,
    InputSelectOwnProps {}

interface SelectProps
  extends Omit<
      React.ComponentPropsWithoutRef<"select">,
      | "name"
      | "required"
      | "type"
      | "placeholder"
      | "defaultValue"
      | "autoComplete"
    >,
    InputSelectOwnProps {}

export type { InputProps, SelectProps };
