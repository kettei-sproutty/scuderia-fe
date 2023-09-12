import { Tabs } from "@components/tabs";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: { control: "text" },
    tabs: { control: "object" },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    defaultValue: "Tab1",
    tabs: [
      { name: "Tab1", content: "Content1" },
      { name: "Tab2", content: "Content2" },
    ],
  },
};
