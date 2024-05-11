import { TailwindComponentProps } from "@ailiyah-ui/factory";

interface FormComponentOwnProp {
  children: React.ReactNode;
}

interface InputProps
  extends Omit<
    TailwindComponentProps<"input">,
    "name" | "hidden" | "required"
  > {
  name: string;
  required: boolean;
  hidden: boolean;
}

interface SelectProps extends TailwindComponentProps<"select"> {
  url: string;
}

export type { FormComponentOwnProp, InputProps, SelectProps };
