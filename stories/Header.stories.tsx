import type { Meta, StoryObj } from "@storybook/react";
import Header from "app/header";

const meta = {
  title: "Base components/Header",
  component: Header,
  decorators: [
    (Story) => (
      <div style={{ width: "500px", height: "100px" }}>
        <Story />
      </div>
    ),
  ],
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
  decorators: [
    (Story) => (
      <div style={{ transform: "scale(1)", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};
