import { FilterFn, SortingFn, sortingFns } from '@tanstack/react-table'
import { Person } from './makeData'
import { RankingInfo, compareItems, rankItem } from '@tanstack/match-sorter-utils'

export type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void
}

export const fuzzyFilter: FilterFn<Person> = (
  row,
  columnId,
  value,
  addMeta
) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the ranking info
  addMeta(itemRank)

  // Return if the item should be filtered in/out
  return itemRank.passed
}

export const fuzzySort: SortingFn<Person> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]! as RankingInfo,
      rowB.columnFiltersMeta[columnId]! as RankingInfo
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

/* // Give our default column cell renderer editing superpowers!
export const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      (table.options.meta as TableMeta).updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <input
        value={value as string}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
      />
    )
  },
} */

export const getTableMeta = <T,>(
  setData: React.Dispatch<React.SetStateAction<T[]>>,
  skipAutoResetPageIndex: () => void
) =>
({
  updateData: (rowIndex, columnId, value) => {
    // Skip age index reset until after next rerender
    skipAutoResetPageIndex()
    setData(old =>
      old.map((row, index) => {
        if (index !== rowIndex) return row

        return {
          ...old[rowIndex]!,
          [columnId]: value,
        }
      })
    )
  },
} as TableMeta)
