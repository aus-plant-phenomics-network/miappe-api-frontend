import { StoryObj, Meta } from "@storybook/react";
import { TestComponent, schema, FixtureData } from "./form.helper";

const meta: Meta<typeof TestComponent> = {
  component: TestComponent,
  title: "Form",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TestComponent>;

export const POSTForm: Story = {
  args: { schema: schema, data: null },
};

export const PUTForm: Story = {
  args: { schema: schema, data: FixtureData.test },
};
