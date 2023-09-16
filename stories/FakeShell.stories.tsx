import FakeShell from "@components/fake-shell/fake-shell";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base components/FakeShell",
  component: FakeShell,
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
    messages: { control: "object" },
  },
} satisfies Meta<typeof FakeShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    messages: [
      {
        content: "Welcome to Scuderia-FE",
        time: new Date().toLocaleTimeString(),
      },
    ],
  },
};
