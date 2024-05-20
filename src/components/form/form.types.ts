import { TailwindComponentProps } from "@ailiyah-ui/factory";
import { TypeLiterals } from "../types";
import { SelectProps as PrivimitiveSelectProps } from "../select";

interface InputSelectOwnProps extends PrivimitiveSelectProps {
  type: TypeLiterals;
  fetcherKey: string;
  labelKey: string;
}

interface InputProps
  extends Omit<
      TailwindComponentProps<"input">,
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
      TailwindComponentProps<"select">,
      | "name"
      | "required"
      | "type"
      | "placeholder"
      | "defaultValue"
      | "autoComplete"
    >,
    InputSelectOwnProps {}

export type { InputProps, SelectProps };
