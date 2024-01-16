import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DebouncedInput } from "./DebouncedInput";

export interface MultiTextSearchItem {
  id: string;
  label: string;
  avatar?: string;
  isChecked?: boolean;
}

interface MultiTextSearchProps {
  items: MultiTextSearchItem[];
  onChange: (SelectItems: MultiTextSearchItem) => void;
  placeholder: string;
}

export const MultiTextSearch = ({
  items,
  onChange,
  placeholder
}: MultiTextSearchProps) => {

  const [query, setQuery] = useState('');

  const changeHandler = (val: string | number) => {
    setQuery(val as string)
  }

  const filteredItem =
    query === ''
      ? items
      : items.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })

  const checkboxHandler = (checked: boolean, selectedItem: MultiTextSearchItem) => {
    onChange({
      ...selectedItem,
      isChecked: checked
    })
  }

  return <section className="p-2">
    <DebouncedInput value={""} placeholder={placeholder} onChange={changeHandler} />
    <section className="h-40 overflow-y-scroll mt-2">{
      filteredItem.slice(0, 100).map((single, i) => <p className="flex items-center text-gray-700" key={i}><Checkbox id={single.id} onCheckedChange={(checked: boolean) => checkboxHandler(checked, single)} /><label className="ml-2" htmlFor={single.id}>{single.label}</label></p>)
    }
    </section>
  </section>
}