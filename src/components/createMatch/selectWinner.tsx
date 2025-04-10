"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PickPlayerProps {
  selectedPlayer1: string;
  selectedPlayer2: string;
  winner?: string;
  selectPlayer: (player: string) => void;
}

export function SelectWinner({
  selectedPlayer1,
  selectedPlayer2,
  selectPlayer,
  winner,
}: PickPlayerProps) {
  return (
    <Select value={winner} onValueChange={selectPlayer}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select the winner" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectedPlayer1 && (<SelectItem  value={selectedPlayer1}>
            Player 1
          </SelectItem>)}
          {selectedPlayer2 && <SelectItem  value={selectedPlayer2}>
            Player 2
          </SelectItem>}
          
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
