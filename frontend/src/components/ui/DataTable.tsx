"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Props pagination server-side (opsional)
interface PaginationProps {
  pageIndex: number           // halaman sekarang (0-based)
  pageSize: number            
  pageCount: number           // total halaman dari server
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  totalRows?: number          // total data dari server (untuk label)
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination?: PaginationProps   // opsional — kalau tidak diisi, tabel biasa
  toolbar?: React.ReactNode      // opsional — slot untuk filter/search dari luar
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  toolbar,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Matikan pagination internal — dikendalikan dari luar
    manualPagination: !!pagination,
    pageCount: pagination?.pageCount ?? -1,
  })

  const hasPagination = !!pagination

  const firstRow = pagination
    ? pagination.pageIndex * pagination.pageSize + 1
    : null
  const lastRow = pagination
    ? Math.min((pagination.pageIndex + 1) * pagination.pageSize, pagination.totalRows ?? 0)
    : null

  return (
    <div className="space-y-4">
      {/* Slot toolbar — filter, search, dll dari parent */}
      {toolbar && <div>{toolbar}</div>}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination — hanya render jika props pagination diberikan */}
      {hasPagination && (
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-muted-foreground">
            {pagination.totalRows
              ? `Showing ${firstRow}–${lastRow} of ${pagination.totalRows}`
              : `Page ${pagination.pageIndex + 1} of ${pagination.pageCount}`}
          </p>

          <div className="flex items-center gap-4">
            {pagination.onPageSizeChange && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rows per page</span>
                <Select
                  value={String(pagination.pageSize)}
                  onValueChange={(v) => {
                    pagination.onPageSizeChange!(Number(v))
                    pagination.onPageChange(0) // reset ke halaman pertama
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 20, 50].map((size) => (
                      <SelectItem key={size} value={String(size)}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Button
                variant="outline" size="icon" className="h-8 w-8"
                onClick={() => pagination.onPageChange(pagination.pageIndex - 1)}
                disabled={pagination.pageIndex === 0}
              >
                <ChevronLeft size={14} />
              </Button>

              {/* Page numbers dengan ellipsis */}
              {Array.from({ length: pagination.pageCount }, (_, i) => i)
                .filter((i) => {
                  const cur = pagination.pageIndex
                  return i === 0 || i === pagination.pageCount - 1 || Math.abs(i - cur) <= 1
                })
                .reduce<(number | "...")[]>((acc, i, idx, arr) => {
                  if (idx > 0 && (i as number) - (arr[idx - 1] as number) > 1) acc.push("...")
                  acc.push(i)
                  return acc
                }, [])
                .map((item, idx) =>
                  item === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-muted-foreground text-sm">…</span>
                  ) : (
                    <Button
                      key={item}
                      variant={item === pagination.pageIndex ? "default" : "outline"}
                      size="icon" className="h-8 w-8"
                      onClick={() => pagination.onPageChange(item as number)}
                    >
                      {(item as number) + 1}
                    </Button>
                  )
                )}

              <Button
                variant="outline" size="icon" className="h-8 w-8"
                onClick={() => pagination.onPageChange(pagination.pageIndex + 1)}
                disabled={pagination.pageIndex >= pagination.pageCount - 1}
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}