import { PresetTheme } from "@ailiyah-ui/utils";

const formTheme: PresetTheme = {
  FormRoot: {
    twMaxWidth: "max-w-[600px]",
    twFlex: "flex",
    twFlexDirection: "flex-col",
    twGap: "gap-y-4",
  },
  FormContent: {
    twFlex: "flex",
    twFlexDirection: "flex-col",
    twGap: "gap-y-3",
  },
  FormComponent: {
    twFlex: "flex",
    twJustifyContent: "justify-end",
  },
  FormSubmitButton: {
    twBackgroundColor: "bg-neutral-400 hover:bg-neutral-300",
    twPadding: "py-2 px-3",
    twBorderWidth: "border-2",
    twBorderRadius: "rounded-lg",
    twWidth: "w-[120px]",
    twTextColor: "text-neutral-700",
    twFontWeight: "font-medium",
  },
  FormLabelGroup: {
    twFlex: "flex",
    twGap: "gap-x-4",
  },
  FormLabel: {
    twFontWeight: "font-bold",
    twFlexGrow: "flex-1",
  },
  FormInput: {
    twFlexGrow: "flex-1",
    twBorderWidth: "border-2",
    twBorderRadius: "rounded-md",
    twPadding: "p-1",
  },
};

const theme: PresetTheme = {
  ...formTheme,
};

export { theme as formTheme };
