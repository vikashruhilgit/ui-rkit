import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/main";
import type { Meta, StoryObj } from "@storybook/react";

import "@/main.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Select",
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
  },
  render: (args) => <Select {...args}>
    <SelectTrigger className="w-[380px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
};

export const Scrollable: Story = {
  args: {
  },
  render: (args) => <Select {...args}>
    <SelectTrigger className="w-[280px]">
      <SelectValue placeholder="Select a timezone" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>North America</SelectLabel>
        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
        <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>Europe & Africa</SelectLabel>
        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
        <SelectItem value="cet">Central European Time (CET)</SelectItem>
        <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
        <SelectItem value="west">
          Western European Summer Time (WEST)
        </SelectItem>
        <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
        <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>Asia</SelectLabel>
        <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
        <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
        <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
        <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
        <SelectItem value="ist_indonesia">
          Indonesia Central Standard Time (WITA)
        </SelectItem>
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>Australia & Pacific</SelectLabel>
        <SelectItem value="awst">
          Australian Western Standard Time (AWST)
        </SelectItem>
        <SelectItem value="acst">
          Australian Central Standard Time (ACST)
        </SelectItem>
        <SelectItem value="aest">
          Australian Eastern Standard Time (AEST)
        </SelectItem>
        <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
        <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>South America</SelectLabel>
        <SelectItem value="art">Argentina Time (ART)</SelectItem>
        <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
        <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
        <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
};


