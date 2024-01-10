import { RowData, RowModel } from '@tanstack/react-table'

type Props<T extends RowData> = {
  getSelectedRowModel: () => RowModel<T>
  refreshData?: () => void
  rerender?: () => void
  rowSelection: unknown
}

export function ActionButtons<T extends RowData>({
  getSelectedRowModel,
  refreshData,
  rerender,
  rowSelection,
}: Props<T>) {
  return (
    <div className="flex items-center gap-2">
      <div>
        <button className="border p-1 rounded" onClick={rerender}>
          Force Rerender
        </button>
      </div>
      <div>
        <button className="border p-1 rounded" onClick={refreshData}>
          Refresh Data
        </button>
      </div>
      <div>
        <button
          className="border rounded p-2 mb-2"
          onClick={() => console.info('rowSelection', rowSelection)}
        >
          Log `rowSelection` state
        </button>
      </div>
      <div>
        <button
          className="border rounded p-2 mb-2"
          onClick={() =>
            console.info(
              'table.getSelectedFlatRows()',
              getSelectedRowModel().flatRows
            )
          }
        >
          Log table.getSelectedFlatRows()
        </button>
      </div>
    </div>
  )
}

export default ActionButtons
