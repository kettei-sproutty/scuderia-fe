import Spinner from "@components/spinner";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base components/Spinner",
  component: Spinner,
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
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
