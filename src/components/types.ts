import React = require("react");
import { TailwindComponentProps } from "@ailiyah-ui/factory";

interface InputType {
  type: React.HTMLInputTypeAttribute;
  required: boolean;
  placeholder?: string;
}

interface InputArrayType {
  [name: string]: InputType;
}

interface NameRequiredInputProps
  extends Omit<TailwindComponentProps<"input">, "name"> {
  name: string;
}

export type { InputType, InputArrayType, NameRequiredInputProps };
