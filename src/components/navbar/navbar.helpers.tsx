import { NavBar } from "./navbar";
import React from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { userEvent } from "@storybook/test";

const TestPath = "investigation";

const ActionFactory = () => {
  return {
    clickExpandButton: async () => {
      await userEvent.click(
        document.querySelector(".NavBarTrigger > button")! as HTMLButtonElement,
      );
    },
    hoverAndClickCollapseButton: async () => {
      await userEvent.hover(
        document.querySelector(".NavBarTrigger > button")! as HTMLButtonElement,
      );
      await userEvent.click(
        document.querySelector(".NavBarTrigger > button")! as HTMLButtonElement,
      );
    },
  };
};

const router = createMemoryRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [{ path: `/${TestPath}`, element: <NavBar /> }],
  },
]);

function NavBarStory() {
  return <RouterProvider router={router} />;
}

export { ActionFactory, NavBarStory, TestPath };
