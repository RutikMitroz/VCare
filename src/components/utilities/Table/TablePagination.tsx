import { ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft } from "lucide-react";

import Button from "../Button";
import Select from "../Select";
import { useEffect, useMemo } from "react";

export interface TablePaginationProps {
  page: number;
  pageSize: string;
  pageSizeOptions: string[];
  totalCount: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (pageSize: string) => void;
}

const TablePagination = ({ page, pageSize, totalCount, pageSizeOptions, onPageChange, onRowsPerPageChange }: TablePaginationProps) => {
  const lastPage = useMemo(() => Math.ceil(totalCount / parseInt(pageSize)), [totalCount, pageSize]);

  useEffect(() => {
    onPageChange?.(1);
  }, [pageSize]);

  return (
    <div className="h-[60px] border-0 border-t border-solid border-border flex items-center justify-end p-2">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="text-base">Rows per page</span>
          <Select
            value={pageSize}
            menuItems={pageSizeOptions.map((pageSize, idx) => ({ id: idx, value: pageSize, title: pageSize }))}
            handleChange={(value) => onRowsPerPageChange?.(value)}
          />
        </div>

        <div className="text-base">
          Page {page} of {lastPage}
        </div>

        <div className="flex items-center gap-1">
          <Button tooltipTitle="Go to first page" variant="outline" size="icon" onClick={() => onPageChange?.(1)}>
            <ChevronsLeft />
          </Button>

          <Button
            tooltipTitle="Go to previous page"
            variant="outline"
            size="icon"
            onClick={() => {
              if (page - 1 < 1) return;
              onPageChange?.(page - 1);
            }}
          >
            <ChevronLeft />
          </Button>

          <Button
            tooltipTitle="Go to next page"
            variant="outline"
            size="icon"
            onClick={() => {
              if (page > lastPage - 1) return;
              onPageChange?.(page + 1);
            }}
          >
            <ChevronRight />
          </Button>

          <Button tooltipTitle="Go to last page" variant="outline" size="icon" onClick={() => onPageChange?.(lastPage)}>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
