import { useEffect, useReducer, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GroupingState,
  RowModel,
  useReactTable,
} from '@tanstack/react-table';

import { CustomTable } from "./component/CustomTable";
import { TableAction } from "./component/TableAction";
import { ActionButtons } from "./component/ActionButtons";

import { getTableMeta } from "./util/tableModels";

import { useSkipper } from "./hook/useSkipper";

import "../../main.css";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  testMode?: boolean;
  enableResize?: boolean;
  serverSideFilter?: boolean;
  onColumnFilterChange?: (i: ColumnFiltersState) => void;
  onGlobalFilterChange?: (i: string) => void;
  onSelectionChange?: (i: RowModel<T>) => void;
  className?: string
}

export const Table = <T,>({
  columns,
  data,
  testMode,
  enableResize,
  serverSideFilter,
  onColumnFilterChange,
  onSelectionChange,
  onGlobalFilterChange,
  className
}: TableProps<T>) => {

  const rerender = useReducer(() => ({}), {})[1]

  // const [data, setData] = useState(makeData(1000));
  // const refreshData = () => setTableData(makeData(1000));
  const [tableData, setTableData] = useState(data);
  const refreshData = () => setTableData(data);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [grouping, setGrouping] = useState<GroupingState>([]);
  // const [isSplit, setIsSplit] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [columnPinning, setColumnPinning] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  useEffect(() => {
    if (serverSideFilter)
      onColumnFilterChange && onColumnFilterChange(columnFilters);
  }, [columnFilters, onColumnFilterChange, serverSideFilter])

  useEffect(() => {
    if (serverSideFilter)
      onGlobalFilterChange && onGlobalFilterChange(globalFilter);
  }, [globalFilter, onGlobalFilterChange, serverSideFilter])

  useEffect(() => {
    onSelectionChange && onSelectionChange(table.getSelectedRowModel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection, onSelectionChange])

  const table = useReactTable({
    data: tableData,
    columns,
    // defaultColumn: defaultColumn(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "auto",
    autoResetPageIndex,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onColumnVisibilityChange: setColumnVisibility,
    onGroupingChange: setGrouping,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
    // Provide our updateData function to our table meta
    meta: getTableMeta<T>(setTableData, skipAutoResetPageIndex),
    state: {
      grouping,
      columnFilters,
      globalFilter,
      columnVisibility,
      columnPinning,
      rowSelection,
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    manualFiltering: serverSideFilter
  })

  /* useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
        table.setColumnFilters
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters[0]?.id]) */

  return (
    <>
      <TableAction table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <>
        {/* <div className={`flex justify-center ${isSplit ? 'gap-4' : ''}`}>
        {isSplit ? <CustomTable table={table} tableGroup="left" /> : null} 
        <CustomTable
          table={table}
          tableGroup={isSplit ? 'center' : undefined}
        /> */}
        <CustomTable
          className={className}
          table={table}
          enableResize={enableResize}
        />
        {/* {isSplit ? <CustomTable table={table} tableGroup="right" /> : null} */}
      </>
      {testMode &&
        <>
          <div className="p-2" />
          <ActionButtons
            getSelectedRowModel={table.getSelectedRowModel}
            refreshData={refreshData}
            rerender={rerender}
            rowSelection={rowSelection}
          />
          <div className="p-2" />
          <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
        </>
      }
    </>
  )
}