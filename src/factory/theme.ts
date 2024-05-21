import { PresetTheme } from "@ailiyah-ui/utils";

const pageTheme: PresetTheme = {
  PageRoot: {
    twFlex: "flex",
    twFlexDirection: "flex-col",
    twGap: "gap-y-6",
  },
  PageTitle: {
    twFontSize: "text-2xl",
    twTextTransform: "capitalize",
    twFontWeight: "font-semibold",
  },
  PageComponent: {
    twWidth: "w-full",
    twFlex: "flex",
    twJustifyContent: "justify-center",
    twAlignItems: "item-center",
    twMinHeight: "min-h-9",
    twGap: "gap-x-3",
  },
};

const widgetTheme: PresetTheme = {
  WidgetCheckBox: {
    twBackgroundColor: "bg-neutral-400",
    twBorderRadius: "rounded-md",
  },
  Icons: {
    twWidth: "w-5",
    twHeight: "h-5",
  },
  WidgetPopoverContent: {
    twBorderRadius: "rounded-md",
  },
  WidgetCheckBoxItem: {
    twFlex: "flex",
    twFlexDirection: "flex-row",
    twGap: "gap-x-3",
    twPadding: "p-2",
    twBackgroundColor: "hover:bg-neutral-500",
  },
  WidgetCheckBoxInput: {
    twAccentColor: "accent-lime-400",
  },
  WidgetCheckBoxLabel: {
    twTextColor: "text-neutral-100",
  },
  WidgetSearchForm: {
    twFlex: "flex",
    twJustifyContent: "justify-center",
    twAlignItems: "item-center",
    twBorderWidth: "border-2",
    twBorderColor: "border-neutral-300",
    twBorderRadius: "rounded-md",
    twPadding: "px-2",
  },
  WidgetSearchInput: {
    twPadding: "pl-2 py-1",
    twOutlineStyle: "outline-none",
  },
  WidgetSearchButton: {
    twPadding: "py-1",
  },
  WidgetNewButton: {
    twBorderWidth: "border-2",
    twBorderRadius: "rounded-md",
    twPadding: "px-2 py-1",
    twBackgroundColor: "bg-neutral-400 hover:bg-neutral-300",
    twTextColor: "text-neutral-100",
    twFontWeight: "font-medium",
    twFlex: "flex",
    twJustifyContent: "justify-center",
    twAlignItems: "items-center",
    twGap: "gap-x-1",
  },
};

const theme: PresetTheme = {
  ...pageTheme,
  ...widgetTheme,
};

export { theme as pageTheme };
