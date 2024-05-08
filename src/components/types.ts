import React = require("react");
import { TailwindComponentProps } from "@ailiyah-ui/factory";

interface NameRequiredInputProps
  extends Omit<TailwindComponentProps<"input">, "name"> {
  name: string;
}

export type { NameRequiredInputProps };
