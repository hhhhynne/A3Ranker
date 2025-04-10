"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useDebouncedValue } from "@mantine/hooks"; // Ensure this is installed
import { Input } from "../ui/input";
import { DataTable } from "../ui/data-table/dataTable";
import { columns, PlayerColumn } from "./columns";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Player } from "@/lib/types/players";

const PlayersTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 250); // Debounce input
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlayers(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const fetchPlayers = async (queryText: string = "") => {
    setIsLoading(true);
    setFetchError(null);

    try {
      let q;
      if (queryText) {
        q = query(
          collection(db, "players"),
          where("name", ">=", queryText),
          where("name", "<=", queryText + "\uf8ff")
        );
      } else {
        q = collection(db, "players");
      }

      const querySnapshot = await getDocs(q);
      const playersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Player[];

      setPlayers(playersData);
    } catch (err) {
      setFetchError("Failed to fetch players.");
      console.error("Error fetching players:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const table = useReactTable({
    data: players || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: false,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-4/5 flex flex-col mx-auto items-center">
      <div className="flex items-center py-4">
        <div className="flex w-full flex-col items-center gap-x-4 gap-y-2 md:justify-between lg:flex-row">
          <div className="flex justify-end">
            <Input
              placeholder="Search for players"
              value={searchQuery} // Bind search query state
              onChange={(e) => setSearchQuery(e.target.value)} // Handle search input change
              className="w-64"
            />
          </div>
        </div>
      </div>
      {fetchError && <p className="text-red-500 mb-4">{fetchError}</p>}
      {isLoading ? (
        <p>Loading players...</p>
      ) : (
        <DataTable
          columns={columns}
          table={table}
          getRowLink={(row: PlayerColumn) => `/players/${row.id}`}
          alternateRowColor={true}
        />
      )}
    </div>
  );
};

export default PlayersTable;
