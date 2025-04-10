
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../ui/data-table/dataTableColumnsHeader";
import { Match } from "@/lib/types/matces";

export type PlayerColumn = Pick<Match, "player1" | "player2" | "winner" | "score" | "date">;

export const columns: ColumnDef<PlayerColumn>[] = [
    {
        accessorKey: "player1",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Player 1" />
        ),
    },
    {
        accessorKey: "player2",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Player 2" />
        ),
    },
    {
        accessorKey: "score",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Score" />
        ),
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),
    },
];