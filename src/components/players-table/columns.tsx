import { Player } from "@/lib/types/players";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../ui/data-table/dataTableColumnsHeader";

export type PlayerColumn = Pick<
  Player,
  "id" | "name" | "ranking" | "wins" | "losses"
>;

export const columns: ColumnDef<PlayerColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "ranking",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ranking" />
    ),
  },
  {
    accessorKey: "wins",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wins" />
    ),
  },
  {
    accessorKey: "losses",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Losses" />
    ),
  },
];
