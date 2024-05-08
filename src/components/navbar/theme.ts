import { PresetTheme } from "@ailiyah-ui/utils";

const navbarTheme: PresetTheme = {
  NavBarRoot: {
    twHeight: "h-screen",
    twWidth: "w-fit",
    twFlex: "flex",
    // Padding set to 0 when collapsed (inactive)
    twPadding:
      "pl-4 py-4 data-[state=inactive]:pl-0 data-[state=inactive]:py-0",
    twFlexDirection: "flex-row-reverse",
    twBackgroundColor: "bg-neutral-100 dark:bg-neutral-900",
    // Different text color for active/inactive and light/dark modes
    twTextColor:
      "text-neutral-700 data-[state=active]:text-neutral-500 dark:text-neutral-400 dark:data-[state=active]:text-neutral-300",
    twOverflow: "overflow-y-auto",
  },
  NavBarTrigger: {
    twHeight: "h-full",
    twWidth: "w-fit",
    twPadding: "px-1",
    twFlex: "flex",
    twAlignItems: "items-center",
  },
  NavBarContent: {
    twWidth: "w-[260px]",
    twHeight: "h-full",
    twOverflow: "overflow-auto",
    twFlex: "flex flex-col",
    twGap: "gap-y-5",
    twOther: "scrollbar-thin",
  },
  NavBarContentHeader: {
    twFlexShrink: "flex-shrink-0",
    twOrder: "order-1",
  },
  NavBarContentBody: {
    twFlexGrow: "flex-grow",
    twOrder: "order-2",
    twOverflow: "overflow-auto",
    twFlex: "flex flex-col",
    twGap: "gap-y-4",
  },
  NavBarContentFooter: {
    twFlexShrink: "flex-shrink-0",
    twOrder: "order-3",
  },
  NavBarIcons: {
    twWidth: "w-full",
    twHeight: "h-full",
    twOpacity: "opacity-100 hover:opacity-50",
    twStroke: "stroke-neutral-500 dark:stroke-neutral-100", // stroke color based on dark or light mode
  },
  NavBarButtons: {
    twWidth: "w-5/6",
    twHeight: "h-fit",
    twMargin: "mx-auto",
    twFlex: "flex",
    twPadding: "py-1",
    twAlignItems: "item-center",
    twJustifyContent: "justify-center",
    twBorderWidth: "border-2",
    twBorderRadius: "rounded-md",
    twBorderStyle: "border-solid",
    twBackgroundColor:
      "bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600",
  },
};

const navbarAccordionTheme: PresetTheme = {
  NavBarAccordionItem: {
    twPadding: "pr-1 pt-2",
    twFlex: "flex",
    twFlexDirection: "flex-col",
    twGap: "gap-y-2",
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
  NavBarAccordionContentContainer: {
    twFlex: "flex",
    twFlexDirection: "flex-col",
    twGap: "gap-y-4",
  },
  NavBarAccordionContent: {
    twPadding: "px-5",
  },
  NavBarAccordionContentLink: {
    // Different bg color for active/inactive and light/dark modes
    twBackgroundColor:
      "data-[state=active]:bg-neutral-300 dark:data-[state=active]:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-700",
    twBorderRadius: "rounded-md",
    twPadding: "px-2 py-1",
  },
};

const theme: PresetTheme = {
  ...navbarTheme,
  ...navbarAccordionTheme,
};

export { theme as navbarTheme };
