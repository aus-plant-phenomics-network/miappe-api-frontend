import { NavBar } from "./navbar";
import React from "react";
import { screen } from "@testing-library/react";
import { UserEvent as RTLUserEvent } from "@testing-library/user-event";
import { UserEvent as StoryUserEvent } from "@storybook/test";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { NavDefinition } from "./navbar";
const TestPath = "investigation";

const ActionFactory = (userEvent: RTLUserEvent | StoryUserEvent) => {
  return {
    clickExpandCollapseButton: async () => {
      await userEvent.click(document.querySelector(".NavBarTrigger > button")!);
    },

    clickAccordionItem: async (textContent: string) => {
      const component = Array.from(
        document.querySelectorAll(".NavBarAccordionTrigger"),
      ).filter(item => item.textContent === textContent)[0];
      await userEvent.click(component);
    },

    clickOnLink: async () => {
      const component = Array.from(document.querySelectorAll("a")).filter(
        item => item.href.endsWith(TestPath),
      )[0];
      await userEvent.click(component);
    },

    hoverOnLink: async () => {
      const component = screen.getByText(
        TestPath[0].toUpperCase() + TestPath.slice(1),
      );
      await userEvent.hover(component);
    },

    unhoverOnLink: async () => {
      const component = screen.getByText(
        TestPath[0].toUpperCase() + TestPath.slice(1),
      );
      await userEvent.unhover(component);
    },
  };
};

function NavBarStoryComponent({
  parsedData,
}: {
  parsedData?: NavDefinition | null;
}) {
  return <NavBar useLink={false} parsedData={parsedData} />;
}

const router = createMemoryRouter([
  {
    path: "/",
    element: <NavBar useLink={true} />,
    children: [{ path: `/${TestPath}`, element: <NavBar useLink={true} /> }],
  },
]);

function NavBarWithRouter() {
  return <RouterProvider router={router} />;
}

export { ActionFactory, NavBarStoryComponent, NavBarWithRouter, TestPath };
