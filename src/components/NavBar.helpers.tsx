import { PresetTheme } from "@ailiyah-ui/utils";
import { ThemeProvider } from "@ailiyah-ui/context";
import { NavBar } from "./NavBar";
import React from "react";
import { expect } from "vitest";
import { UserEvent as RTLUserEvent } from "@testing-library/user-event";
import { UserEvent as StoryUserEvent } from "@storybook/test";

const ActionFactory = (userEvent: RTLUserEvent | StoryUserEvent) => {
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

const Validate = {
  NavBarContent: {
    isRendered: async () => {
      expect(document.querySelector(".NavBarContent")).not.toBeNull();
      expect(document.querySelector(".NavBarContent")).toBeVisible();
    },
    isExpanded: async () => {
      expect(document.querySelector(".NavBarContent")).toHaveStyle("")
    },
    isCollapsed: async () => {
      expect(document.querySelector(".NavBarContent")).toHaveStyle("width: 0px")
    }
  },
  Accordion: {
    isRendered: async ()=>{
      expect(document.querySelector(".NavBarContent")).not.toBeNull();
      expect(document.querySelector(".NavBarContent")).toBeVisible();
    }
  }
};

export { ActionFactory, NavBarStoryComponent };
