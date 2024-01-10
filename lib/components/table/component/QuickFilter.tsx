/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Column, RowData, Table } from '@tanstack/react-table'

import { DebouncedInput } from './DebouncedInput'
import { ComboBox, ComboBoxItem } from '../../ComboBox'

type NumberInputProps = {
  columnFilterValue: [number, number]
  getFacetedMinMaxValues: () => [number, number] | undefined
  setFilterValue: (updater: any) => void
}

const NumberInput: React.FC<NumberInputProps> = ({
  columnFilterValue,
  getFacetedMinMaxValues,
  setFilterValue,
}) => {
  const minOpt = getFacetedMinMaxValues()?.[0]
  const min = Number(minOpt ?? '')

  const maxOpt = getFacetedMinMaxValues()?.[1]
  const max = Number(maxOpt)

  return (
    <div className='text-left p-2'>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={min}
          max={max}
          value={columnFilterValue?.[0] ?? ''}
          onChange={value =>
            setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${minOpt ? `(${min})` : ''}`}
        />
        <DebouncedInput
          type="number"
          min={min}
          max={max}
          value={columnFilterValue?.[1] ?? ''}
          onChange={value =>
            setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${maxOpt ? `(${max})` : ''}`}
        />
      </div>
      <div className="h-1" />
    </div>
  )
}

type TextInputProps<T> = {
  column: Column<T, unknown>
  columnSize: number
  columnFilterValue: string
  sortedUniqueValues: any[]
}

const TextInput = <T,>({
  column,
  columnFilterValue,
  columnSize,
  sortedUniqueValues,
}: TextInputProps<T>) => {
  // const dataListId = columnId + 'list'

  const changeHandler = (val: ComboBoxItem) => {
    column.columnDef.filterFn = "includesString"
    column.setFilterValue(val.id)
  }

  return (
    <div className='text-left w-full p-2'>
      <ComboBox
        selectedIndex={sortedUniqueValues.indexOf(columnFilterValue)}
        placeholder={`Search... (${columnSize})`}
        items={sortedUniqueValues.map(single => ({ id: single, name: single }))}
        onChange={changeHandler}
      />
      <div className="h-1" />
    </div>
  )
}

type Props<T extends RowData> = {
  column: Column<T, unknown>
  table: Table<T>
  sortedUniqueValues: any[]
}

export function QuickFilter<T extends RowData>({ column, table, sortedUniqueValues }: Props<T>) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)
  const columnFilterValue = column.getFilterValue();
  const uniqueValues = column.getFacetedUniqueValues();

  return typeof firstValue === 'number' ? (
    <NumberInput
      columnFilterValue={columnFilterValue as [number, number]}
      getFacetedMinMaxValues={column.getFacetedMinMaxValues}
      setFilterValue={column.setFilterValue}
    />
  ) : (
    <TextInput<T>
      column={column}
      columnFilterValue={columnFilterValue as string}
      columnSize={uniqueValues.size}
      sortedUniqueValues={sortedUniqueValues}
    />
  )
}
