import { forwardRef } from "react";
import { Table as UnstyledTable, TableBody, TableHeader, TableHead, TableRow, TableCell } from "../unstyled/Table";
import { cn } from "../../lib/utils";
import TablePagination, { TablePaginationProps } from "./TablePagination";

export type ColumnType = {
  id: string;
  title: string;
  accessorKey: string;
  align?: "left" | "center" | "right";
  Component?: React.ReactNode;
};

export type RowDataType = {
  id: string;
  handleRowClick?: (rowData: RowDataType) => void;
  columns: {
    [column: string]: {
      title?: string;
      Component?: React.ReactNode;
      align?: "left" | "center" | "right";
    };
  };
};

export interface TableProps {
  columns: ColumnType[];
  rowsData: RowDataType[];
  tableHeight?: string;
  paginationOptions?: TablePaginationProps;
  classes?: { headerContainer?: string };
}

const Table = forwardRef<HTMLTableElement, TableProps>(({ columns, rowsData, tableHeight, paginationOptions, classes }, ref) => {
  const accessorKeys = columns.map((column) => column.accessorKey);

  return (
    <div className="rounded-md overflow-hidden border border-solid border-border bg-white">
      <div className="relative w-full overflow-auto" style={{ ...(tableHeight && { height: tableHeight }) }}>
        <UnstyledTable className="border-collapse">
          <TableHeader className={cn(classes?.headerContainer)}>
            <TableRow className="h-[50px]">
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={cn(
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    "sticky top-0 left-0 font-semibold",
                    "border-0 border-b border-solid border-border min-w-[140px]"
                  )}
                >
                  {column.Component ?? column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rowsData.map((rowData, index) => (
              <TableRow
                key={rowData.id}
                onClick={() => rowData.handleRowClick && rowData.handleRowClick(rowData)}
                className={cn("hover:bg-gray-100 cursor-pointer", !tableHeight && rowsData.length - 1 === index && "!border-b-0")}
              >
                {accessorKeys.map((accessorKey) => (
                  <TableCell
                    key={accessorKey}
                    className={cn(
                      "font-medium",
                      rowData.columns[accessorKey]?.align === "center" && "text-center",
                      rowData.columns[accessorKey]?.align === "right" && "text-right"
                    )}
                  >
                    {rowData.columns[accessorKey]?.Component ?? rowData.columns[accessorKey]?.title ?? "---"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </UnstyledTable>
      </div>

      {paginationOptions ? (
        <TablePagination
          page={paginationOptions.page}
          pageSize={paginationOptions.pageSize}
          pageSizeOptions={paginationOptions.pageSizeOptions}
          totalCount={paginationOptions.totalCount}
          onPageChange={paginationOptions.onPageChange}
          onRowsPerPageChange={paginationOptions.onRowsPerPageChange}
        />
      ) : null}
    </div>
  );
});

Table.displayName = "Table";

export default Table;
