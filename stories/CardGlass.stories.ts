import CardGlass from "@components/card-glass";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base components/CardGlass",
  component: CardGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    children: { control: "object" },
  },
} satisfies Meta<typeof CardGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    title: "Card title",
    children: "Card content",
  },
};
