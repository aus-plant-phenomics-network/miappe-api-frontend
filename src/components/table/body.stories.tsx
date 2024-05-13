import { Meta, StoryObj } from "@storybook/react";
import {
  excludedKeys,
  schema,
  Components,
  fetchDataSuccess,
  fetchDataFailure,
} from "./table.helpers";
import React from "react";
import { ThemeProvider } from "@ailiyah-ui/context";
import { tableTheme } from "./theme";

const TableBody = Components.Body;

const meta: Meta<typeof TableBody> = {
  title: "Table Body",
  component: TableBody,
  decorators: [
    Story => (
      <div className="w-full h-[500px] p-4">
        <ThemeProvider value={tableTheme}>
          <Story />
        </ThemeProvider>
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TableBody>;

export const FetchedSuccess: Story = {
  args: {
    fields: Object.keys(schema),
    fieldData: fetchDataSuccess,
  },
};

export const FetchedSuccessOmitDescription: Story = {
  args: {
    fields: Object.keys(schema).filter(item => !excludedKeys.includes(item)),
    fieldData: fetchDataSuccess,
  },
};

export const FetchFailure: Story = {
  args: {
    fields: Object.keys(schema),
    fieldData: fetchDataFailure,
  },
};
