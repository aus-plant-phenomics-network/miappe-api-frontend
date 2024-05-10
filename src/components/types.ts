import { TailwindComponentProps } from "@ailiyah-ui/factory";

interface InputProps
  extends Omit<
    TailwindComponentProps<"input">,
    "name" | "hidden" | "required"
  > {
  name: string;
  required: boolean;
  hidden: boolean;
}

export type { InputProps };
