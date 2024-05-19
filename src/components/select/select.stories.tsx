import React from "react";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "../../assets/theme";
import { Meta, StoryObj } from "@storybook/react";
import { TestSelectComponent, fetchData } from "./select.helpers";

const meta: Meta<typeof TestSelectComponent> = {
  component: TestSelectComponent,
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

type Story = StoryObj<typeof TestSelectComponent>;

export const SingleNoFetchedData: Story = {
  args: {
    multiple: false,
  },
};

export const SingleNoDefaultData: Story = {
  args: {
    multiple: false,
    fetchedData: fetchData,
  },
};

export const SingleWithDefaultData: Story = {
  args: {
    multiple: false,
    fetchedData: fetchData,
    defaultValue: fetchData![0].id as string,
  },
};
