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
  PageSearchForm: {
    twFlex: "flex",
    twJustifyContent: "justify-center",
    twAlignItems: "item-center",
    twBorderWidth: "border-2",
    twBorderColor: "border-neutral-300",
    twBorderRadius: "rounded-md",
    twPadding: "px-2",
  },
  PageSearchInput: {
    twPadding: "pl-2 py-1",
    twOutlineStyle: "outline-none",
  },
  PageSearchButton: {
    twPadding: "py-1",
  },
  PageNewButton: {
    twBorderWidth: "border-2",
    twBorderRadius: "rounded-md",
    twPadding: "px-2 py-1",
    twBackgroundColor: "bg-neutral-400 hover:bg-neutral-300",
    twTextColor: "text-neutral-700",
    twFontWeight: "font-medium",
  },
};

export { pageTheme };
