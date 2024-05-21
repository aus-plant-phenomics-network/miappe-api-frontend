import React from "react";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "../../assets/theme";
import { Meta, StoryObj } from "@storybook/react";
import { TestSelectComponent, fetchData } from "./select.helpers";

const meta: Meta<typeof TestSelectComponent> = {
  component: TestSelectComponent,
  tags: ["autodocs"],
  args: {
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

export const SingleWithDefaultDataWithExcludeId: Story = {
  args: {
    multiple: false,
    fetchedData: fetchData,
    defaultValue: fetchData![0].id as string,
    excludeId: fetchData![1].id as string,
  },
};

export const SingleWithDefaultDataWithExcludeIdSameAsDefault: Story = {
  args: {
    multiple: false,
    fetchedData: fetchData,
    defaultValue: fetchData![0].id as string,
    excludeId: fetchData![0].id as string,
  },
};

export const MultipleNoFetchedData: Story = {
  args: {
    multiple: true,
  },
};

export const MultipleNoDefaultData: Story = {
  args: {
    multiple: true,
    fetchedData: fetchData,
  },
};

export const MultipleWithOneDefaultData: Story = {
  args: {
    multiple: true,
    fetchedData: fetchData,
    defaultValue: fetchData![0].id as string,
  },
};

export const MultipleWithMultipleDefaultData: Story = {
  args: {
    multiple: true,
    fetchedData: fetchData,
    defaultValue: [fetchData![0].id as string, fetchData![1].id as string],
  },
};

export const MultipleWithMultipleDefaultDataExcludeKey: Story = {
  args: {
    multiple: true,
    fetchedData: fetchData,
    defaultValue: [fetchData![0].id as string, fetchData![1].id as string],
    excludeId: fetchData![1].id as string,
  },
};
