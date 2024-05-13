import { Meta, StoryObj } from "@storybook/react";
import { excludedKeys, schema, Components } from "./table.helpers";
import React from "react";
import { ThemeProvider } from "@ailiyah-ui/context";
import { tableTheme } from "./theme";

const TableHeader = Components.Header;

const meta: Meta<typeof TableHeader> = {
  title: "Table Header",
  component: TableHeader,
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
type Story = StoryObj<typeof TableHeader>;

export const Default: Story = {
  args: {
    fields: Object.keys(schema),
  },
};

export const ExcludeDescription: Story = {
  args: {
    fields: Object.keys(schema).filter(item => !excludedKeys.includes(item)),
  },
};
