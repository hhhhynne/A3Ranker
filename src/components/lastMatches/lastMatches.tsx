"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/firebase";

import { collection, doc, getDoc, getDocs, limit, orderBy, query, } from "firebase/firestore";
import { useEffect, useState } from "react";

const LastMatches = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMatches();
      }, []);
    
    const fetchMatches = async () => {
      setLoading(true);
      try {
        
        const q = query(
          collection(db, "matches"),
          orderBy("date", "desc"), 
          limit(5));
  
        const querySnapshot = await getDocs(q);
        const matchesData = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const match = docSnap.data();
            const player1Ref = doc(db, "players", match.player1);
            const player2Ref = doc(db, "players", match.player2);
            const winPlayer = doc(db, "players", match.winner);
  
            const [player1Snap, player2Snap, ] = await Promise.all([
              getDoc(player1Ref),
              getDoc(player2Ref),
            ]);

            const winPlayerSnap = await getDoc(winPlayer);
  
            return {
              id: docSnap.id,
              player1: player1Snap.exists() ? player1Snap.data().name : "Unknown",
              player2: player2Snap.exists() ? player2Snap.data().name : "Unknown",
              winner: winPlayerSnap.exists() ? winPlayerSnap.data().name : "Unknown",
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
  return (
    <Carousel className="w-60">
      <CarouselContent>
        {matches.map((match, index) => (
            <CarouselItem key={index}>
                <div className="flex flex-col items-center p-4 border-2 border-primary rounded-xl shadow-md w-auto
                ">
                    <h3 className="text-xl font-bold">Date: {new Date(match.date).toLocaleDateString()}</h3>
                    <div className="text-lg">
                        <p>{match.player1} vs {match.player2}</p>
                        <p>Winner: {match.winner}</p>
                        <p>Score: {match.score}</p>
                    </div>
                </div>
            </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default LastMatches;
