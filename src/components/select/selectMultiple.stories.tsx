import React from "react";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "../../assets/theme";
import { Meta, StoryObj } from "@storybook/react";
import { MultipleSelectTestComponent, fetchData } from "./select.helpers";

const meta: Meta<typeof MultipleSelectTestComponent> = {
  component: MultipleSelectTestComponent,
  args: {
    onSubmit: e => {
      e.preventDefault();
      alert("Submit Form");
    },
    name: "facility",
    required: true,
  },
  decorators: [
    Story => (
      <ThemeProvider value={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MultipleSelectTestComponent>;

export const NoFetchedData: Story = {};

export const NoDefaultData: Story = {
  args: {
    fetchedData: fetchData,
  },
};

export const WithDefaultData: Story = {
  args: {
    fetchedData: fetchData,
    defaultValue: [fetchData![0].id, fetchData![1].id] as string[],
  },
};
