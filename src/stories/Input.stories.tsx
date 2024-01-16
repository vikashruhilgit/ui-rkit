import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/react";

import "@/main.css";
import { Button } from "@/main";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: "Email",
    type: "email",
    className: `w-60`
  }
};

export const File: Story = {
  args: {
    type: "file",
    id: "picture"
  },
  render: (args) => <div className="grid w-full max-w-sm items-center gap-1.5">
    <label htmlFor="picture">Title</label>
    <Input {...args} />
  </div>,
};

export const Disabled: Story = {
  args: {
    placeholder: "Email",
    type: "email",
    className: `w-60`,
    disabled: true
  }
};

export const WithLabel: Story = {
  args: {
    type: "email",
    id: "email",
    placeholder: "Email",
    className: `w-60`,
  },
  render: (args) => <div className="grid w-full max-w-sm items-center gap-1.5">
    <label htmlFor="email">Email</label>
    <Input {...args} />
  </div>,
};

export const WithButtom: Story = {
  args: {
    type: "email",
    id: "email",
    placeholder: "Email",
    className: `w-60`,
  },
  render: (args) => <div className="flex w-full max-w-sm items-center space-x-2">
    <Input {...args} />
    <Button type="submit">Subscribe</Button>
  </div>,
};



