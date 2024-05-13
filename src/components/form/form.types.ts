import { TailwindComponentProps } from "@ailiyah-ui/factory";
import { TypeLiterals } from "../types";

interface InputSelectOwnProps {
  name: string;
  type: TypeLiterals;
  required: boolean;
  placeholder: string;
  hidden: boolean;
  defaultValue: string;
  fetcherKey: string;
  labelKey: string;
}

interface InputProps
  extends Omit<
      TailwindComponentProps<"input">,
      "name" | "hidden" | "required" | "type" | "placeholder" | "defaultValue"
    >,
    InputSelectOwnProps {}

interface SelectProps
  extends Omit<
      TailwindComponentProps<"select">,
      "name" | "hidden" | "required" | "type" | "placeholder" | "defaultValue"
    >,
    InputSelectOwnProps {}

export type { InputProps, SelectProps };
