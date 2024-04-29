import { PresetTheme } from "@ailiyah-ui/utils";
import { defaultTheme } from "@ailiyah-ui/utils";

export const theme: PresetTheme = {
  ...defaultTheme,
  NavBarRoot: {
    ...defaultTheme.NavBarRoot,
    twOverflow: "overflow-y-auto",
  },
  NavBarAccordionTrigger: {
    twFontWeight: "font-bold",
    twWidth: "w-full",
    twHeight: "h-fit",
    twFlex: "flex",
    twJustifyContent: "justify-between",
    twAlignItems: "items-center",
    twPadding: "pt-3",
  },
  NavBarAccordionItem: {
    twPadding: "pr-1 pt-2",
    twFlex: "flex",
    twFlexDirection: "flex-col",
    twGap: "gap-y-2",
  },
  NavBarAccordionContent: {
    twPadding: "px-5",
  },
  NavBarAccordionContentContainer: {
    twFlex: "flex",
    twFlexDirection: "flex-col",
    twGap: "gap-y-4",
  },
  NavBarAccordionContentLink: {
    // Different bg color for active/inactive and light/dark modes
    twBackgroundColor:
      "data-[state=active]:bg-neutral-300 dark:data-[state=active]:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-700",
    twBorderRadius: "rounded-md",
    twPadding: "px-2 py-1",
  },
  Icons: {
    ...defaultTheme.Icons,
    twWidth: "",
  },
};
