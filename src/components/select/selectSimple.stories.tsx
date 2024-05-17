import React from "react";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "../../assets/theme";
import { Meta, StoryObj } from "@storybook/react";
import { SimpleSelectTestComponent, fetchData } from "./select.helpers";

const meta: Meta<typeof SimpleSelectTestComponent> = {
  component: SimpleSelectTestComponent,
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

type Story = StoryObj<typeof SimpleSelectTestComponent>;

export const NoFetchedData: Story = {};

export const NoDefaultData: Story = {
  args: {
    fetchedData: fetchData,
  },
};

export const WithDefaultData: Story = {
  args: {
    fetchedData: fetchData,
    defaultValue: fetchData![0].id as string,
  },
};
