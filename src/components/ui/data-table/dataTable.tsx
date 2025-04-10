import {
    type ColumnDef,
    flexRender,
    type Table as ITable,
  } from '@tanstack/react-table';
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import Link from 'next/link';
  import { cn } from '@/lib/utils';
  
  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    table: ITable<TData>;
    getRowLink?: (row: TData) => string;
    nonLinkableColumns?: string[];
    alternateRowColor?: boolean;
    cellBorder?: boolean;
  }
  
  export function DataTable<TData, TValue>({
    columns,
    table,
    getRowLink,
    nonLinkableColumns = [],
    alternateRowColor = false,
    cellBorder = false,
  }: DataTableProps<TData, TValue>) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 align-middle">
        <div className="w-full rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          header.column.columnDef.meta?.headerClassName,
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className={cn(
                      alternateRowColor && 'odd:bg-secondary/30 even:bg-none',
                    )}
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isLinkable =
                        getRowLink &&
                        !nonLinkableColumns.includes(cell.column.id);
                      const cellContent = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      );
  
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            cellBorder && 'border-r',
                            cell.column.columnDef.meta?.className,
                          )}
                        >
                          {isLinkable ? (
                            <Link href={getRowLink(row.original)}>
                              {cellContent}
                            </Link>
                          ) : (
                            cellContent
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Ingen resultater
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  