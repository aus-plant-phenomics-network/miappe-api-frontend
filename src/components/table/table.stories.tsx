import { Meta, StoryObj } from "@storybook/react";
import {
  excludedKeys,
  schema,
  Components,
  fetchDataSuccess,
  fetchDataFailure,
} from "./table.helpers";
import React from "react";

const Table = Components.Table;

const meta: Meta<typeof Table> = {
  component: Table,
  decorators: [
    Story => (
      <div style={{ width: "100%", height: "500px", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const FetchedSuccess: Story = {
  args: {
    fields: Object.keys(schema),
    fieldData: fetchDataSuccess,
    schema: schema,
  },
};

export const FetchedSuccessOmitDescription: Story = {
  args: {
    fields: Object.keys(schema).filter(item => !excludedKeys.includes(item)),
    fieldData: fetchDataSuccess,
    schema: schema,
  },
};

export const FetchFailure: Story = {
  args: {
    fields: Object.keys(schema),
    fieldData: fetchDataFailure,
    schema: schema,
  },
};
