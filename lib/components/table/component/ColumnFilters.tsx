/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Header, RowData, Table } from '@tanstack/react-table'

import { MultiTextFilter } from './MultiTextFilter'
import { TabItem, Tabs } from '../../Tabs'
import { QuickFilter } from './QuickFilter'
import { ConditionalFilter } from './ConditionalFilter'

type Props<T extends RowData> = {
  header: Header<T, unknown>
  table: Table<T>
}

const tabsData = [{
  name: "Quick",
  current: true
},
{
  name: "Multi",
  current: false
},
{
  name: "Condition",
  current: false
}]

export function ColumnFilters<T extends RowData>({ header, table }: Props<T>) {
  const [tabs, setTabs] = useState(tabsData);

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(header.column.id)

  const uniqueValues = header.column.getFacetedUniqueValues();

  const sortedUniqueValues = React.useMemo(
    () =>
      Array.from(uniqueValues.keys()).sort(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uniqueValues]
  )

  const tabHandler = (item: TabItem) => {
    const updatedList = tabs.map(single => ({
      ...single,
      current: single.name === item.name ? true : false
    }));
    setTabs(updatedList);
  }

  const isNumber = typeof firstValue === 'number' ? true : false
  const typeTabs = isNumber ? tabs.filter(single => single.name !== "Multi") : tabs

  const renderTabs = () => {
    return <>
      {typeTabs.map((single, i) => single.current ?
        <section className='' key={i}>
          {single.name === "Quick" &&
            <QuickFilter
              column={header.column}
              table={table}
              sortedUniqueValues={sortedUniqueValues}
            />}
          {single.name === "Multi" &&
            <MultiTextFilter<T>
              column={header.column}
              table={table}
              sortedUniqueValues={sortedUniqueValues}
            />}
          {single.name === "Condition" &&
            <ConditionalFilter<T>
              column={header.column}
              table={table}
            />}
        </section>
        : null)}
    </>
  }

  return <>
    <Tabs tabs={typeTabs}
      fullWidth={true}
      onChange={tabHandler}
      justifyCenter={true}
    />
    {renderTabs()}
    {/* <section className='flex justify-between items-center hover:bg-gray-50'>
      <p className='p-2'>{isNumber ? "Number" : "Text"} Filter</p>
      <ChevronRightIcon
        className={`ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-gray-300/80`}
        aria-hidden="true"
      />
    </section> */}
  </>
}
