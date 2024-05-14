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
    twBackgroundColor: "bg-neutral-100",
  },
  WidgetCheckBoxItem: {
    twFlex: "flex",
    twFlexDirection: "flex-row",
    twGap: "gap-x-2",
    twPadding: "p-2",
  },
  WidgetCheckBoxInput: {
    twAccentColor: "accent-lime-400",
  },
  WidgetCheckBoxLabel: {
    twTextColor: "text-neutral-500",
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
    twTextColor: "text-neutral-700",
    twFontWeight: "font-medium",
  },
};

const theme: PresetTheme = {
  ...pageTheme,
  ...widgetTheme,
};

export { theme as pageTheme };
