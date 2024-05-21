import { PresetTheme } from "@ailiyah-ui/utils";

const theme: PresetTheme = {
  SelectRoot: {
    twDisplay: "hidden",
  },
  SelectTrigger: {
    twWidth: "w-full",
    twBorderWidth: "border-2",
    twBorderColor: "border-inherit data-[valid=invalid]:border-red-500",
    twFlex: "flex",
    twJustifyContent: "justify-between",
    twAlignItems: "items-center",
    twPadding: "p-2",
    twBorderRadius: "rounded-md",
  },
  SelectValue: {
    twFlexGrow: "grow",
    twFlex: "flex",
    twFlexWrap: "flex-wrap",
  },
  SelectValueItem: {
    twFlex: "flex",
    twGap: "gap-x-1",
    twJustifyContent: "justify-center",
    twAlignItems: "items-center",
    twBorderWidth: "border-2",
    twBorderRadius: "rounded-lg",
    twPadding: "p-1",
    twBackgroundColor:
      "bg-neutral-700 dark:bg-neutral-50 hover:bg-neutral-800 hover:dark:bg-white",
    twTextColor:
      "text-neutral-50 hover:text-white dark:text-neutral-800 dark:hover:text-neutral-900",
  },
  SelectContent: {
    twFlex: "flex",
    twFlexDirection: "flex-col",
    twPadding: "p-2",
    twBorderColor: "border-inherit",
    twBorderWidth: "border-2",
    twBorderRadius: "rounded-md",
    twBackgroundColor: "bg-white",
    twGap: "gap-y-1",
  },
  SelectItem: {
    twBackgroundColor: "bg-white hover:bg-neutral-200",
    twBorderRadius: "rounded-md",
    twPadding: "px-2 py-1",
    twFlex: "flex",
    twGap: "gap-x-2",
  },
  SelectItemHidden: {
    twDisplay: "hidden",
  },
  SelectSearch: {
    twPadding: "px-2 py-1",
    twBorderWidth: "border-2",
    twBorderRadius: "rounded-md",
    twOutlineStyle: "outline-none",
  },
};

export { theme as selectTheme };
