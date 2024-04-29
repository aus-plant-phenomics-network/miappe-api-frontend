import { PresetTheme } from "@ailiyah-ui/utils";
import { ThemeProvider } from "@ailiyah-ui/context";
import { NavBar } from "./NavBar";
import React from "react";

const ActionFactory = (userEvent) => {
  return {
    clickExpandCollapseButton: async () => {
      await userEvent.click(document.querySelector(".NavBarTrigger > button")!);
    },

    clickAccordionItem: async (textContent: string) => {
      let component = Array.from(
        document.querySelectorAll(".NavBarAccordionTrigger")
      ).filter((item) => item.textContent === textContent)[0];
      await userEvent.click(component);
    },
  };
};

function NavBarStoryComponent({ themeValue }: { themeValue: PresetTheme }) {
  return (
    <ThemeProvider value={themeValue}>
      <NavBar useLink={false} />
    </ThemeProvider>
  );
}

export { ActionFactory, NavBarStoryComponent };
