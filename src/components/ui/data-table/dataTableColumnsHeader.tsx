import type { Column } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import { Icons } from '@/components/ui/icons';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <Icons.chevronDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <Icons.chevronUp className="ml-2 h-4 w-4" />
            ) : (
              <Icons.chevronUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-background">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <Icons.chevronUp className="mr-2 h-3.5 w-3.5" />
            Stigende
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <Icons.chevronDown className="mr-2 h-3.5 w-3.5" />
            Synkende
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => column.clearSorting()}>
            <Icons.close className="mr-2 h-3.5 w-3.5" />
            Nullstill
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
