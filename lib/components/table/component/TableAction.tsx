import { Fragment, useState } from "react"
import { Popover, Transition } from "@headlessui/react";
import { Table } from "@tanstack/react-table";
import { Bars3Icon } from "@heroicons/react/24/outline";

import DebouncedInput from "./DebouncedInput"
import { Checkbox } from "../../Checkbox";
import { TabItem, Tabs } from "../../Tabs";

import { shuffle } from "../util/util";

interface TableActionProps<T> {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  table: Table<T>;
}

const tabsData = [{
  name: "",
  current: true,
  icon: "ViewColumnsIcon"
},
{
  name: "",
  current: false,
  icon: "FunnelIcon"
}]

export const TableAction = <T,>({
  globalFilter,
  setGlobalFilter,
  table,
}: TableActionProps<T>) => {
  const [tabs, setTabs] = useState(tabsData);

  const tabHandler = (item: TabItem) => {
    const updatedList = tabs.map(single => ({
      ...single,
      current: single.icon === item.icon ? true : false
    }));
    setTabs(updatedList);
  }

  const randomizeColumns = () => {
    table.setColumnOrder(
      shuffle(table.getAllLeafColumns().map(d => d.id))
    )
  }

  const renderTabs = () => {
    return <>
      {tabs.map((single, i) => single.current ?
        <section className='' key={i}>
          {single.icon === "ViewColumnsIcon" &&
            <section className="px-5 py-2 shadow-sm">
              <Checkbox items={[{
                id: "ALL",
                label: "ALL",
              }]}
                checked={table.getIsAllColumnsVisible()}
                onChange={table.getToggleAllColumnsVisibilityHandler()}
                dense={true}
              />
              {table.getAllLeafColumns().map(column => {
                return (
                  <Checkbox key={column.id} items={[{
                    id: column.id,
                    label: column.id,
                  }]}
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    dense={true} />
                )
              })}
            </section>
          }
          {single.icon === "FunnelIcon" &&
            <>
              <ul className="divide-y text-gray-700">
                <li className="p-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-5" onClick={randomizeColumns}>Shuffle Columns</li>
              </ul>
              <p className="p-2 bg-gray-200 text-xs ">Reset Options</p>
              <ul className="divide-y text-gray-700">
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

          }
        </section>
        : null)}
    </>
  }

  return <div className="p-2 flex items-center gap-4 al">
    <DebouncedInput
      value={globalFilter ?? ''}
      onChange={value => setGlobalFilter(String(value))}
      className="shadow-sm border-gray-300 rounded-md text-sm p-1.5"
      placeholder="Search all columns..."
    />
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className={`
          group inline-flex items-center rounded-md  px-2.5 py-1 focus-visible:outline-none border border-gray-300`}
          >
            <Bars3Icon className="h-5 w-5 " aria-hidden="true" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            {/* <Popover.Panel className="absolute right-1/2 z-10 -mx-5 mt-3 w-screen max-w-sm -translate-x-0 transform px-4 sm:px-0 lg:max-w-3xl"> */}
            <Popover.Panel className="absolute right-1/2 z-10 -mx-5 mt-3 max-w-12 min-w-[300px] -translate-x-0 transform">
              <section className="bg-white rounded-md border border-gray-100">
                <Tabs
                  tabs={tabs}
                  fullWidth={true}
                  onChange={tabHandler}
                  justifyCenter={true}
                />
                {renderTabs()}
              </section>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
    {/* <div className="p-2">
    <div>
      <input
        type="checkbox"
        checked={isSplit}
        onChange={e => setIsSplit(e.target.checked)}
        className="mx-1"
      />
      Split Mode
    </div>
   
  </div> */}
  </div >
}