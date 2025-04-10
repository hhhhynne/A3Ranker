"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Player } from "@/lib/types/players";
import { useEffect, useState } from "react";


interface PickPlayerProps {
    selectedPlayer?: string;
    onSelect: (player: string) => void;
};
export function PickPlayer({ selectedPlayer, onSelect }: PickPlayerProps) {
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const loadPlayers = async () => {
      const data = await fetchPlayers();
      setPlayers(data);
    };

    loadPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "players")); // Get all docs
      const players = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return players;
    } catch (error) {
      console.error("Error fetching players:", error);
      return [];
    }
  };

  const handleSelect = (player: string) => {
    setOpen(false);
    onSelect(player === selectedPlayer ? "" : player);
    };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedPlayer
            ? players.find((player: Player) => player.id === selectedPlayer)?.name
            : "Select player..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search players..." />
          <CommandList>
            <CommandEmpty>No players found.</CommandEmpty>
            <CommandGroup>
              {players.map((player) => (
                <CommandItem
                  key={player.id}
                  value={player.name}
                  onSelect={(e) => handleSelect(player.id)}
                >
                  {player.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedPlayer === player.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
