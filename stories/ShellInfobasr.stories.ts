import ShellInfoBar from "@components/fake-shell/shell-info-bar";
import type { Meta, StoryObj } from "@storybook/react";
import { getOS } from "@utils/operating-system";
import { get } from "http";

const meta = {
  title: "Base components/ShellInfoBar",
  component: ShellInfoBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    secondSegment: { control: "text" },
    thirdSegment: { control: "text" },
  },
} satisfies Meta<typeof ShellInfoBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    secondSegment: "scuderia-fe",
    thirdSegment: "master",
  },
};
