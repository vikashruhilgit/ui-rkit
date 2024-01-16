import { useState } from "react";
import { Column, Table } from "@tanstack/react-table";

import { DebouncedInput } from "./DebouncedInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getConditionalFilterFn } from "../util/util";

export interface ConditionalFilterItem {
  id: string;
  label: string;
  avatar?: string;
  isChecked?: boolean;
}

interface ConditionalFilterProps<T> {
  column: Column<T, unknown>;
  table: Table<T>;
}

enum selectTextItems {
  "Contains",
  "Does not contain",
  "Equals",
  "Does not equal",
  "Begins with",
  "Ends with",
  "Blank",
  "Not blank"
}

enum selectNumberItems {
  "Equals",
  "Does not equal",
  "Greater then",
  "Greater then or equel to",
  "Less then",
  "Less then or equel to",
  "Blank",
  "Not blank"
}

type FilterType = keyof typeof selectTextItems | keyof typeof selectNumberItems;

export type FilterValueType = {
  val: string
  type: FilterType;
}

export const ConditionalFilter = <T,>({
  column,
  table
}: ConditionalFilterProps<T>) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue();
  const items = Object.values(typeof firstValue === 'number' ? selectNumberItems : selectTextItems).filter(val => isNaN(val as number))

  const [condition, setcondition] = useState((columnFilterValue as FilterValueType)?.type || "");

  const makeFilterCall = (val: string | number, type: FilterType) => {
    if (val) {
      column.columnDef.filterFn = getConditionalFilterFn<T>();
      column.setFilterValue({
        val: val,
        type: type
      });
    }
  }

  const changeHandler = (val: string | number) => {
    makeFilterCall(val, condition);
  }

  const selectChangeHandler = (val: string) => {
    setcondition(val as keyof typeof selectTextItems);
    if ((columnFilterValue as FilterValueType)?.val) {
      makeFilterCall((columnFilterValue as FilterValueType)?.val, val as FilterType);
    }
  }

  return <section className="p-2">
    <Select onValueChange={selectChangeHandler} defaultValue={columnFilterValue as string}>
      <SelectTrigger className="mb-2">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {items.map((single, i) => <SelectItem key={i} value={single}>{single}</SelectItem>)}
      </SelectContent>
    </Select>
    <DebouncedInput disabled={condition ? false : true} placeholder="Filter" value={(columnFilterValue as FilterValueType)?.val ? (columnFilterValue as FilterValueType)?.val : ""} onChange={changeHandler} />
  </section>
}