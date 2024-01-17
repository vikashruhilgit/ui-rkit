import { Table } from "@tanstack/react-table";
import { Menu, Columns4, Filter } from 'lucide-react';

import { DebouncedInput } from "./DebouncedInput"
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import { shuffle } from "../util/util";

interface TableActionProps<T> {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  table: Table<T>;
}

export const TableAction = <T,>({
  globalFilter,
  setGlobalFilter,
  table,
}: TableActionProps<T>) => {

  const randomizeColumns = () => {
    table.setColumnOrder(
      shuffle(table.getAllLeafColumns().map(d => d.id))
    )
  }

  const resetAll = () => {
    table.resetSorting()
    table.resetRowSelection()
    table.resetColumnOrder()
    table.resetColumnSizing()
    table.resetColumnFilters()
    table.resetGlobalFilter()
  }

  return <div className="py-2 flex items-center gap-4 justify-between">
    <DebouncedInput
      value={globalFilter ?? ''}
      onChange={value => setGlobalFilter(String(value))}
      className="shadow-sm border-gray-300 rounded-md text-sm p-1.5 w-[250px]"
      placeholder="Search all columns..."
    />
    <div className="px-2 flex">
      <Popover>
        <PopoverTrigger asChild>
          <Menu className="h-5 w-5 cursor-pointer" aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent>
          <section className="bg-white rounded-md border border-gray-100">
            <Tabs defaultValue="columns4" className="">
              <TabsList className="flex">
                <TabsTrigger className="flex-1" value="columns4"><Columns4 className="h-5 w-5 " aria-hidden="true" /></TabsTrigger>
                <TabsTrigger className="flex-1" value="filter"><Filter className="h-5 w-5 " aria-hidden="true" /></TabsTrigger>
              </TabsList>
              <TabsContent value="columns4">
                <section className="px-5 py-2 shadow-sm">
                  <p className="flex items-center">
                    <Checkbox id="all"
                      checked={table.getIsAllColumnsVisible()}
                      onCheckedChange={() => table.toggleAllColumnsVisible()}
                    />
                    <label className="ml-2 text-sm" htmlFor="all">ALL</label>
                  </p>
                  {table.getAllLeafColumns().map(
                    (column, i) =>
                      <p className="flex items-center" key={i}>
                        <Checkbox id={column.id} checked={column.getIsVisible()} onCheckedChange={() => column.toggleVisibility()} />
                        <label className="ml-2 text-sm capitalize" htmlFor={column.id}>{column.id}</label>
                      </p>)}
                </section>
              </TabsContent>
              <TabsContent value="filter">
                <>
                  <ul className="divide-y text-gray-700">
                    <li className="p-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-5" onClick={randomizeColumns}>Shuffle Columns</li>
                  </ul>
                  <p className="p-2 bg-gray-200 text-xs ">Reset</p>
                  <ul className="divide-y text-gray-700">
                    <li className="p-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-5" onClick={resetAll}>All</li>
                    <li className="p-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-5" onClick={() => table.resetSorting()}>Sorting</li>
                    <li className="p-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-5" onClick={() => table.resetRowSelection()}>Row Selection</li>
                    <li className="p-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-5" onClick={() => table.resetColumnOrder()}>Columns Order</li>
                    <li className="p-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-5" onClick={() => table.resetColumnSizing()}>Column sizing</li>
                    <li className="p-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-5" onClick={() => table.resetColumnFilters()}>Column Filters</li>
                    <li className="p-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-5" onClick={() => table.resetGlobalFilter()}>Global Filters</li>
                  </ul>
                  <p className="p-2 bg-gray-200 text-xs ">Additional Options</p>
                  <p className="p-2">...</p>
                </>
              </TabsContent>
            </Tabs>
          </section>
        </PopoverContent>
      </Popover>
    </div>
  </div >
}