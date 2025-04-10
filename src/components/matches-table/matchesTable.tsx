"use client";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useDebouncedValue } from "@mantine/hooks";
import { Input } from "../ui/input";
import { DataTable } from "../ui/data-table/dataTable";
import { columns } from "./columns";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

const MatchesTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 250); // Debounce input
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const fetchMatches = async (queryText: string = "") => {

    try {
      let q;
      if (queryText) {
        q = query(
          collection(db, "matches"),
          where("player1", ">=", queryText),
          where("player1", "<=", queryText + "\uf8ff")
        );
      } else {
        q = collection(db, "matches");
      }

      const querySnapshot = await getDocs(q);
      const matchesData = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const match = docSnap.data();
          const player1Ref = doc(db, "players", match.player1);
          const player2Ref = doc(db, "players", match.player2);

          const [player1Snap, player2Snap] = await Promise.all([
            getDoc(player1Ref),
            getDoc(player2Ref),
          ]);

          return {
            id: docSnap.id,
            player1: player1Snap.exists() ? player1Snap.data().name : "Unknown",
            player2: player2Snap.exists() ? player2Snap.data().name : "Unknown",
            score: match.score,
            date: match.date,
          };
        })
      );

      setMatches(matchesData);
    } catch (err) {
      setError("Failed to fetch matches.");
      console.error("Error fetching matches:", err);
    } finally {
      setLoading(false);
    }
  };

  const table = useReactTable({
    data: matches || [],
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
              placeholder="Search for matches"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        table={table}
        //getRowLink={(row) => `/matches/${row.id}`}
        alternateRowColor={true}
      />
    </div>
  );
};

export default MatchesTable;
