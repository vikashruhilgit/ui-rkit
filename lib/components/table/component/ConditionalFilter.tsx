/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Column, Table } from "@tanstack/react-table";

import { DebouncedInput } from "./DebouncedInput";
import { Select, SelectItem } from "../../Select";
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

  const selectedIndex = (columnFilterValue as FilterValueType)?.type ? items.indexOf((columnFilterValue as FilterValueType).type) : -1;
  const [condition, setcondition] = useState((columnFilterValue as FilterValueType)?.type || "");
  //typeof firstValue === 'number';


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

  const selectChangeHandler = (val: SelectItem) => {
    setcondition(val.name as keyof typeof selectTextItems);
    if ((columnFilterValue as FilterValueType)?.val) {
      makeFilterCall((columnFilterValue as FilterValueType)?.val, val.name as FilterType);
    }
  }

  return <section className="p-2">
    <Select
      items={items.map((single, i) => ({
        id: i,
        name: single as string
      }))}
      selectedIndex={selectedIndex}
      onChange={selectChangeHandler}
      placeholder="Select"
    />
    <DebouncedInput disabled={condition ? false : true} placeholder="Filter" value={(columnFilterValue as FilterValueType)?.val ? (columnFilterValue as FilterValueType)?.val : ""} onChange={changeHandler} />
  </section>
}