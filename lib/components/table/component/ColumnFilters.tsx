import { useMemo } from 'react';
import { Header, RowData, Table } from '@tanstack/react-table';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuickFilter } from './QuickFilter';
import { MultiTextFilter } from './MultiTextFilter';
import { ConditionalFilter } from './ConditionalFilter';

type Props<T extends RowData> = {
  header: Header<T, unknown>
  table: Table<T>
}

export function ColumnFilters<T extends RowData>({ header, table }: Props<T>) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(header.column.id)

  const uniqueValues = header.column.getFacetedUniqueValues();

  const sortedUniqueValues = useMemo(
    () =>
      Array.from(uniqueValues.keys()).sort(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uniqueValues]
  )

  const isNumber = typeof firstValue === 'number' ? true : false;

  return <Tabs defaultValue="quick" /* className="w-[400px]" */>
    <TabsList className='flex'>
      <TabsTrigger className='flex-1' value="quick">Quick</TabsTrigger>
      {!isNumber && <TabsTrigger className='flex-1' value="multi">Multi</TabsTrigger>}
      <TabsTrigger className='flex-1' value="condition">Condition</TabsTrigger>
    </TabsList>
    <TabsContent value="quick">
      <QuickFilter
        column={header.column}
        table={table}
        sortedUniqueValues={sortedUniqueValues}
      />
    </TabsContent>
    <TabsContent value="multi">
      <MultiTextFilter<T>
        column={header.column}
        table={table}
        sortedUniqueValues={sortedUniqueValues}
      /></TabsContent>
    <TabsContent value="condition">
      <ConditionalFilter<T>
        column={header.column}
        table={table}
      />
    </TabsContent>
  </Tabs>
}
