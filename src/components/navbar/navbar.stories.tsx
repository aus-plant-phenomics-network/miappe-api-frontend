import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { NavBarStoryComponent } from "./navbar.helpers";
import { theme } from "../../assets/theme";
import { userEvent } from "@storybook/test";
import { ActionFactory } from "./navbar.helpers";
import { defaultData } from "./navbar";

const Actions = ActionFactory(userEvent);

const meta: Meta<typeof NavBarStoryComponent> = {
  title: "Navigation Bar",
  component: NavBarStoryComponent,
  args: {
    themeValue: theme,
    parsedData: defaultData,
  },
  decorators: [
    (Story) => (
      <div className="w-[500px] h-[500px]">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NavBarStoryComponent>;

export const Default: Story = {};

export const CollapsedNavBar: Story = {
  play: async (context) => {
    Actions.clickExpandCollapseButton();
  },
};

export const ExpandedCollapsedNavBar: Story = {
  play: async (context) => {
    Actions.clickExpandCollapseButton();
    Actions.clickExpandCollapseButton();
  },
};

export const ExpandStudyDefinition: Story = {
  play: async (context) => {
    Actions.clickAccordionItem("Study Definition");
  },
};

export const UnexpandStudyDefinition: Story = {
  play: async (context) => {
    Actions.clickAccordionItem("Study Definition");
    Actions.clickAccordionItem("Study Definition");
  },
};

export const ExpandStudyDefinitionOntology: Story = {
  play: async (context) => {
    ExpandStudyDefinition.play && (await ExpandStudyDefinition.play(context));
    Actions.clickAccordionItem("Ontology");
  },
};

export const CollapseStudyDefinitionWithOntology: Story = {
  play: async (context) => {
    ExpandStudyDefinitionOntology.play &&
      (await ExpandStudyDefinitionOntology.play(context));
    Actions.clickAccordionItem("Study Definition");
  },
};
