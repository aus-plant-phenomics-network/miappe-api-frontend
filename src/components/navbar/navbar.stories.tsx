import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { NavBarStory } from "./navbar.helpers";
import { ActionFactory } from "./navbar.helpers";

const Actions = ActionFactory();

const meta: Meta<typeof NavBarStory> = {
  title: "Navigation Bar",
  component: NavBarStory,
  decorators: [
    Story => (
      <div className="h-[500px] w-[500px]">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NavBarStory>;

export const Default: Story = {};

export const CollapsedNavBar: Story = {
  play: async () => {
    await Actions.hoverAndClickCollapseButton();
  },
};

export const ExpandedCollapsedNavBar: Story = {
  play: async () => {
    await Actions.hoverAndClickCollapseButton();
    await Actions.clickExpandButton();
  },
};
