"use client";

import { CalenderDateSingle } from "@/components/ui/app-calenderDateSingle";
import { DataTableViewOptions } from "@/components/ui/columntoggel";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/paging";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { date: Date }>({
  columns,
  data,
}: DataTableProps<TData, any>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [date, setDate] = React.useState<Date | undefined>();
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Filter data based on the selected date
  const filteredData = React.useMemo(() => {
    if (!date) return data;
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toDateString() === date.toDateString();
    });
  }, [data, date]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      {/* Filters/search */}
      <div className="flex items-center py-4 gap-3 flex-wrap">
        <Input
          placeholder="Filter By Person..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <CalenderDateSingle date={date} setDate={setDate} />

        {/* visibility */}
        <DataTableViewOptions table={table} />
      </div>

      {/* Table - Mobile View */}
      {isMobile ? (
        <ScrollArea className="h-[calc(100vh-250px)] rounded-md border">
          <div className="space-y-2 p-2">
            {table.getRowModel().rows.map((row) => (
              <div key={row.id} className="border rounded-lg p-4 shadow-sm">
                <div className="space-y-2">
                  {row.getVisibleCells().map((cell) => {
                    const headerContext = table
                      .getHeaderGroups()[0]
                      ?.headers.find(
                        (header) => header.column.id === cell.column.id
                      );
                    return (
                      <div
                        key={cell.id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {headerContext &&
                            flexRender(
                              headerContext.column.columnDef.header,
                              headerContext.getContext()
                            )}
                        </span>
                        <span className="text-right">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        // Desktop View
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="uppercase">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
} 