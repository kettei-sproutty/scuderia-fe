import Input from "@components/input";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Base components/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: "text" },
    required: { control: "boolean" },
    suffix: { control: "text" },
    error: { control: "text" },
    size: { options: ["sm", "md", "lg"], control: { type: "select" } },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = {
  args: {
    label: "Field",
    id: "field",
  },
};

export const Required: Story = {
  args: {
    label: "Field",
    required: true,
    id: "field",
  },
};

export const Suffix: Story = {
  args: {
    label: "Mail",
    suffix: "@gmail.com",
    id: "mail",
  },
};

export const Error: Story = {
  args: {
    label: "Field",
    id: "field",
    error: "Error message",
  },
};
