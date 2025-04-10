import { Player } from "./players";

export interface Game {
    id: number;
    date: Date;
    players: Player[];
    winner: Player | null;
    score: string;
}