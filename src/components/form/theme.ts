import { PresetTheme } from "@ailiyah-ui/utils";

const formTheme: PresetTheme = {
  FormRoot: {
    twMaxWidth: "max-w-[700px]",
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
  FormLabelGroupHidden: {
    twDisplay: "hidden",
  },
  FormLabel: {
    twFontWeight: "font-bold",
    twFlexGrow: "flex-1",
    twFlex: "flex",
    twJustifyContent: "justify-left",
    twAlignItems: "items-center",
  },
  FormInput: {
    twFlexGrow: "flex-1",
    twBorderWidth: "border-2",
    twBorderRadius: "rounded-md",
    twBorderColor: "border-inherit data-[valid=invalid]:border-red-500",
    twPadding: "p-3",
  },
  FormSelectContainer: {
    twFlex: "flex",
    twFlexGrow: "flex-1",
    twBorderWidth: "border-2",
    twBorderRadius: "rounded-md",
    twPadding: "p-3",
  },
  FormSelect: {
    twFlexGrow: "flex-1",
    twBackgroundColor: "bg-inherit",
  },
  FormSelectMultiple: {
    twDisplay: "hidden",
  },
  SelectMultipleContainer: {
    twFlex: "flex",
    twFlexDirection: "flex-col",
    twBorderRadius: "rounded-md",
    twBorderWidth: "border-2",
    twBackgroundColor: "bg-neutral-300",
  },
  SelectMultipleItem: {
    twFlex: "flex",
    twGap: "gap-x-2",

    twPadding: "p-2",
  },
  FormCreateButton: {
    twWidth: "w-full",
    twHeight: "h-full",
    twPadding: "p-2",
  },
};

const theme: PresetTheme = {
  ...formTheme,
};

export { theme as formTheme };
