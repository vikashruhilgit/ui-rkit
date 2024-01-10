import { ColumnDef, FilterFn, SortingFn, sortingFns } from "@tanstack/react-table";
import IndeterminateCheckbox from "../component/InderterminateCheckbox";
import { RankingInfo, compareItems, rankItem } from "@tanstack/match-sorter-utils";
import { FilterValueType } from "../component/ConditionalFilter";

export const addIndeterminateCheckbox = <T,>(columns: ColumnDef<T>[], label: string = "select") => {
  return [
    {
      id: label,
      header: ({ table }) => (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <div>
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
    },
    ...columns
  ] as ColumnDef<T>[]
}

export const shuffle = <T,>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {

    // Generate random number 
    const j = Math.floor(Math.random() * (i + 1));

    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export const getConditionalFilterFn = <T,>(): FilterFn<T> => {
  return (
    row,
    columnId,
    value,
    // addMeta
  ) => {
    const { type, val } = value as FilterValueType;
    const search = new RegExp(val, "i");
    let result = false
    const columnVal = (row.getValue(columnId) as string);

    switch (type) {
      case "Contains":
        result = columnVal.search(search) >= 0 ? true : false;
        break;
      case "Does not contain":
        result = columnVal.search(search) < 0 ? true : false;
        break;
      case "Begins with":
        result = columnVal.toLowerCase().startsWith(val.toLowerCase()) ? true : false;
        break;
      case "Ends with":
        result = columnVal.toLowerCase().endsWith(val.toLowerCase()) ? true : false;
        break;
      case "Equals":
        result = columnVal == val ? true : false;
        break;
      case "Does not equal":
        result = columnVal != val ? true : false;
        break;
      case "Blank":
        result = columnVal === "" ? true : false;
        break;
      case "Not blank":
        result = columnVal !== "" ? true : false;
        break;
      case "Greater then":
        result = columnVal > val ? true : false;
        break;
      case "Greater then or equel to":
        result = columnVal >= val ? true : false;
        break;
      case "Less then":
        result = columnVal < val ? true : false;
        break;
      case "Less then or equel to":
        result = columnVal <= val ? true : false;
        break;
      default:
        result = true;
        break;
    }
    return result;
  }
}

export const getFilterFn = <T,>(): FilterFn<T> => {
  return (
    row,
    columnId,
    value,
    addMeta
  ) => {
    console.log("hey, i'm the custom conditional filters", value);
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the ranking info
    addMeta(itemRank)

    // Return if the item should be filtered in/out
    return itemRank.passed
  }
}

export const getSortingFn = <T,>(): SortingFn<T> => {
  return (rowA, rowB, columnId) => {
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
}