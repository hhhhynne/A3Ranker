import { z } from "zod";

export const matchSchema = z.object({
    player1: z.string(),
    player2: z.string(),
    winner: z.string(),
    score: z.string(),
    date: z.coerce.date(),
    });

export type Match = z.infer<typeof matchSchema>;