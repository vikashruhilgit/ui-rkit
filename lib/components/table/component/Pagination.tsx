import { Select } from "../../Select"

type Props = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: () => void
  pageCount: number
  pageIndex: number
  pageSize: number
  previousPage: () => void
  setPageIndex: (index: number) => void
  setPageSize: (size: number) => void
  totalRows: number
}

export function Pagination({
  hasNextPage,
  hasPreviousPage,
  nextPage,
  pageCount,
  pageIndex,
  pageSize,
  previousPage,
  setPageIndex,
  setPageSize,
  totalRows,
}: Props) {
  return (
    <section className="flex items-center justify-between p-2 font-medium text-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-slate-100 rounded-full gap-1">
          <button
            className={`border p-1 px-2 border-none ${hasPreviousPage ? "hover:bg-white" : "text-gray-400"} flex-1 rounded-full`}
            onClick={() => setPageIndex(0)}
            disabled={!hasPreviousPage}
          >
            {'<<'}
          </button>
          <button
            className={`border p-1 px-2 border-none flex-1 rounded-full ${hasPreviousPage ? "hover:bg-white" : "text-gray-400"}`}
            onClick={() => previousPage()}
            disabled={!hasPreviousPage}
          >
            {'<'}
          </button>
          <button
            className={`border p-1 px-2 border-none ${hasNextPage ? "hover:bg-white" : "text-gray-400"} flex-1 rounded-full`}
            onClick={() => nextPage()}
            disabled={!hasNextPage}
          >
            {'>'}
          </button>
          <button
            className={`border p-1 px-2 border-none ${hasNextPage ? "hover:bg-white" : "text-gray-400"} flex-1 rounded-full`}
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={!hasNextPage}
          >
            {'>>'}
          </button>
        </div>
        <div className="flex justify-evenly gap-2">
          <div className="flex items-center gap-2">
            <div>Page</div>
            <strong>
              {pageIndex + 1} of {pageCount}
            </strong>
          </div>
          <div>|</div>
          <div className="flex items-center gap-1">
            Go to page:
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                setPageIndex(page)
              }}
              min={1}
              className="appearance-none focus:focus:ring-0 p-0 border-none w-12"
            />
          </div>
        </div>
        <Select
          selectedIndex={[10, 20, 30, 40, 50].indexOf(pageSize)}
          onChange={e => {
            setPageSize(Number(e.name))
          }}
          items={[10, 20, 30, 40, 50].map((item, i) => ({
            id: i,
            name: item.toString()
          }))}
        />
      </div>
      <div className="text-sm">Total Rows: {totalRows}</div>
    </section >
  )
}
