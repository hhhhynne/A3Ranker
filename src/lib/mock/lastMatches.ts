import { Game } from "../types/games";

const lastMatches: Game[] = [
    {
        id: 1,
        date: new Date(),
        players: [
            {
                name: "Hanzo",
                points: 100,
                wins: 10,
                losses: 5
            },
            {
                name: "Herm",
                points: 90,
                wins: 9,
                losses: 6
            },
        ],
        winner: {
            name: "Hanzo",
            points: 100,
            wins: 10,
            losses: 5
        },
        score: "10-5"
    },
    {
        id: 2,
        date: new Date(),
        players: [
            {
                name: "Hanzo",
                points: 100,
                wins: 10,
                losses: 5
            },
            {
                name: "Bennie",
                points: 80,
                wins: 8,
                losses: 7
            },
        ],
        winner: {
            name: "Hanzo",
            points: 100,
            wins: 10,
            losses: 5
        },
        score: "10-7"
    },
    {
        id: 3,
        date: new Date(),
        players: [
            {
                name: "Herm",
                points: 90,
                wins: 9,
                losses: 6
            },
            {
                name: "Bennie",
                points: 80,
                wins: 8,
                losses: 7
            },
        ],
        winner: {
            name: "Herm",
            points: 90,
            wins: 9,
            losses: 6
        },
        score: "10-6"
    },
    {
        id: 4,
        date: new Date(),
        players: [
            {
                name: "Hanzo",
                points: 100,
                wins: 10,
                losses: 5
            },
            {
                name: "Herm",
                points: 90,
                wins: 9,
                losses: 6
            },
        ],
        winner: {
            name: "Hanzo",
            points: 100,
            wins: 10,
            losses: 5
        },
        score: "10-6"
    },


];

export default lastMatches;