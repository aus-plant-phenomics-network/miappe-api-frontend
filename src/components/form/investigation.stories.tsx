import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { theme } from "../../assets/theme";
import { ThemeProvider } from "@ailiyah-ui/context";
import { InvestigationForm } from "./investigation";

const meta: Meta<typeof InvestigationForm> = {
  component: InvestigationForm,
  title: "Investigation Form",
  decorators: [
    (Story) => (
      <ThemeProvider value={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InvestigationForm>;

export const Default: Story = {};
