import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
  flexRender,
  Header,
  HeaderGroup,
  Row,
  RowData,
  Table,
} from '@tanstack/react-table'
import { FunnelIcon } from '@heroicons/react/24/outline'

import { Pagination } from './Pagination'
import { ColumnFilters } from './ColumnFilters'
import { Button } from '../../Button'

// import TablePins from './TablePins'

type TableGroup = 'center' | 'left' | 'right'

function getTableHeaderGroups<T extends RowData>(
  table: Table<T>,
  tg?: TableGroup
): [HeaderGroup<T>[], HeaderGroup<T>[]] {
  if (tg === 'left') {
    return [table.getLeftHeaderGroups(), table.getLeftFooterGroups()]
  }

  if (tg === 'right') {
    return [table.getRightHeaderGroups(), table.getRightFooterGroups()]
  }

  if (tg === 'center') {
    return [table.getCenterHeaderGroups(), table.getCenterFooterGroups()]
  }

  return [table.getHeaderGroups(), table.getFooterGroups()]
}

function getRowGroup<T extends RowData>(row: Row<T>, tg?: TableGroup) {
  if (tg === 'left') return row.getLeftVisibleCells()
  if (tg === 'right') return row.getRightVisibleCells()
  if (tg === 'center') return row.getCenterVisibleCells()
  return row.getVisibleCells()
}

type Props<T extends RowData> = {
  table: Table<T>
  tableGroup?: TableGroup;
  enableResize?: boolean
}

export function CustomTable<T extends RowData>({
  table,
  tableGroup,
  enableResize
}: Props<T>) {
  const [headerGroups] = getTableHeaderGroups(table, tableGroup);
  const headerDepth = headerGroups.length;

  const checkNumberType = (columnId: string) => {
    return typeof table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(columnId) === "number"
  }

  const getHeaderClass = (depth: number, isNumber: boolean) => {
    if (headerDepth !== depth) return "justify-center";
    return isNumber ? "justify-end" : "justify-start";
  }

  const renderFiltersPopover = (header: Header<T, unknown>) => {
    return <>
      {header.column.getCanFilter() ? (
        <Popover className="relative inline">
          <Popover.Button
            className={`inline-flex border-none p-1 focus-visible:outline-none`}
          >
            <FunnelIcon className='ml-2 h-4 w-4' />
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
            <Popover.Panel className="absolute left-1/2 z-10 mt-1 max-w-12 min-w-[300px] -translate-x-1/2 transform px-4">
              <section className='bg-gray-100 shadow-sm rounded border border-gray-200'>
                <ColumnFilters<T> header={header} table={table} />
                <p className='p-2 text-right'>
                  <Button primary={false} onClick={() => header.column.setFilterValue("")}>Reset</Button>
                </p>
              </section>
            </Popover.Panel>
          </Transition>
        </Popover>
      ) : null
      }
    </>
  }

  const renderHeader = (header: Header<T, unknown>) => {
    const isNumber = checkNumberType(header.column.id);
    const headerClass = getHeaderClass(header.depth, isNumber);

    return (
      <section onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : () => null} className={`${header.column.getCanSort() ? 'cursor-pointer select-none'
        : ''} flex ${headerClass} whitespace-nowrap`}>
        {!isNumber &&
          flexRender(
            header.column.columnDef.header,
            header.getContext()
          )}
        <button className='w-3'>
          {{
            asc: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-5">
              <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
            </svg>,
            desc: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-5">
              <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
            </svg>,
          }[header.column.getIsSorted() as string] ?? ' '}
        </button>
        {isNumber &&
          flexRender(
            header.column.columnDef.header,
            header.getContext()
          )}
      </section>
    )
  }

  return (
    <section className='border border-slate-200 rounded-md'>
      <section className='max-w-full min-w-full'>
        <table className='border-none text-slate-800 text-sm w-full'>
          <thead className="divide-y divide-gray-200 bg-gray-100">
            {headerGroups.map(headerGroup => (
              <tr className='' key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    className="py-1.5 px-2.5 font-medium relative"
                    key={header.id}
                    style={{
                      width: header.getSize(),
                    }}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div className='flex justify-between'>
                          {/* {header.column.getCanGroup() ? (
                        // If the header can be grouped, let's add a toggle
                        <button
                          onClick={header.column.getToggleGroupingHandler()}
                          style={{
                            cursor: 'pointer',
                          }}
                        >
                          {header.column.getIsGrouped()
                            ? `🛑(${header.column.getGroupedIndex()})`
                            : `👊`}
                        </button>
                      ) : null}{' '} */}

                          {renderHeader(header)}
                          {renderFiltersPopover(header)}
                        </div>
                      </>
                    )}
                    {enableResize &&
                      <section
                        className="absolute right-0 top-0 h-full select-none touch-non cursor-ew-resize flex "
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                      >
                        <section className='bg-gray-300 w-0.5 hover:w-0.75 hover:bg-gray-500 h-2/5 self-center rounded-[100%]'></section>
                      </section>}
                    {/* {!header.isPlaceholder && header.column.getCanPin() && (
                  <TablePins
                    isPinned={header.column.getIsPinned()}
                    pin={header.column.pin}
                  />
                )} */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 min-h-20">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {getRowGroup(row, tableGroup).map(cell => (
                  <td
                    className={`py-1.5 px-2.5 font-normal truncate relative ${checkNumberType(cell.column.id) ? "text-right" : "text-left"}`}
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
        {footerGroup.map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot> */}
        </table>
      </section>
      <Pagination
        hasNextPage={table.getCanNextPage()}
        hasPreviousPage={table.getCanPreviousPage()}
        nextPage={table.nextPage}
        pageCount={table.getPageCount()}
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={table.getState().pagination.pageSize}
        previousPage={table.previousPage}
        setPageIndex={table.setPageIndex}
        setPageSize={table.setPageSize}
        totalRows={table.getPrePaginationRowModel().rows.length}
      />
    </section >
  )
}

export default CustomTable
