/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, Table } from "@tanstack/react-table";

import { MultiTextSearch } from "./MultiTextSearch";

export interface MultiTextFilterItem {
  id: string;
  label: string;
  avatar?: string;
  isChecked?: boolean
}

interface MultiTextFilterProps<T> {
  column: Column<T, unknown>;
  table?: Table<T>;
  sortedUniqueValues: any[]
}

export const MultiTextFilter = <T,>({
  column,
  sortedUniqueValues
}: MultiTextFilterProps<T>) => {

  const columnFilterValue = column.getFilterValue();

  const items = sortedUniqueValues.map(value => ({
    id: value,
    label: value,
    isChecked: (columnFilterValue && (columnFilterValue as string[]).includes(value)) ? true : false
  }))

  const handleSelection = (item: MultiTextFilterItem) => {
    column.columnDef.filterFn = "arrIncludesSome";
    let existingFilter = columnFilterValue as string[] || [];
    if (!Array.isArray(columnFilterValue)) {
      existingFilter = columnFilterValue ? [columnFilterValue as string] : []
    }

    if (item.isChecked) {
      column.setFilterValue([...existingFilter as string[], item.label]);
    } else {
      existingFilter = existingFilter && existingFilter.filter((single: string) => single !== item.label);
      column.setFilterValue([...existingFilter]);
    }
  }

  return <MultiTextSearch items={items} onChange={handleSelection} placeholder={`Search (${sortedUniqueValues.length})`} />
}