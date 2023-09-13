import type { Meta, StoryObj } from "@storybook/react";
import Header from "app/header";

const meta = {
  title: "Base components/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    links: { control: "object" },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    header: [
      { name: "Dashboard", href: "/" },
      { name: "Workshop", href: "/workshop" },
    ],
  },
};
