import { NavBar } from "./NavBar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NavBar> = {
    title: "Navigation Bar",
    component: NavBar
}

export default meta 

type Story = StoryObj<typeof NavBar>

export const Default: Story = {}