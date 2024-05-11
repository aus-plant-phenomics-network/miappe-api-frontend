import { TailwindComponentProps } from "@ailiyah-ui/factory";
import React from "react";

interface FormComponentOwnProp {
  children: React.ReactNode;
}

interface InputSelectOwnProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  required: boolean;
  hidden: boolean;
}

interface InputProps
  extends Omit<
      TailwindComponentProps<"input">,
      "name" | "hidden" | "required" | "type"
    >,
    InputSelectOwnProps {}

interface SelectProps
  extends Omit<
      TailwindComponentProps<"select">,
      "name" | "hidden" | "required" | "children" | "type"
    >,
    InputSelectOwnProps {}

export type { FormComponentOwnProp, InputProps, SelectProps };
