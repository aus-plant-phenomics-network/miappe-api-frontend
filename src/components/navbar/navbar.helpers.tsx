import { PresetTheme } from "@ailiyah-ui/utils";
import { ThemeProvider } from "@ailiyah-ui/context";
import { NavBar } from "./navbar";
import React from "react";
import { UserEvent as RTLUserEvent } from "@testing-library/user-event";
import { UserEvent as StoryUserEvent } from "@storybook/test";
import { NavDefinition } from "./navbar.types.";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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

function NavBarStoryComponent({
  themeValue,
  parsedData,
}: {
  themeValue: PresetTheme;
  parsedData?: NavDefinition | null;
}) {
  return (
    <ThemeProvider value={themeValue}>
      <NavBar useLink={false} parsedData={parsedData} />
    </ThemeProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar useLink={true} />,
    children: [{ path: "/institution", element: <NavBar useLink={true} /> }],
  },
]);

function NavBarWithRouter() {
  return <RouterProvider router={router} />;
}

export { ActionFactory, NavBarStoryComponent, NavBarWithRouter };
