import { db } from "@/firebase";
import { EloStatus } from "@/lib/types/ELO";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const K = 32;

const delta = (score: number, opponent: number, status: EloStatus) => {
  const probability = 1 / (1 + Math.pow(10, (opponent - score) / 400));
  return Math.round(K * (status - probability));
};

const eloSystem = (score: number, opponent: number, status: EloStatus) => {
  return score + delta(score, opponent, status);
};

export const updateEloRankings = async (player1Id: string, player2Id: string, winnerId: string) => {
    try {
      const player1Ref = doc(db, "players", player1Id);
      const player2Ref = doc(db, "players", player2Id);
      const winPlayerRef = doc(db, "players", winnerId);

      const player1Snap = await getDoc(player1Ref);
      const player2Snap = await getDoc(player2Ref);
      const winPlayerSnap = await getDoc(winPlayerRef);

      if (!player1Snap.exists() || !player2Snap.exists() || !winPlayerSnap.exists()) {
        throw new Error("One or both players not found");
      }

      const player1Elo = player1Snap.data().ranking;
      const player2Elo = player2Snap.data().ranking;

      let player1NewElo, player2NewElo;

      if (winnerId === player1Id) {
        player1NewElo = eloSystem(player1Elo, player2Elo, EloStatus.WIN);
        player2NewElo = eloSystem(player2Elo, player1Elo, EloStatus.LOOSE);
      } else {
        player1NewElo = eloSystem(player1Elo, player2Elo, EloStatus.LOOSE);
        player2NewElo = eloSystem(player2Elo, player1Elo, EloStatus.WIN);
      }; 


      await updateDoc(player1Ref, { ranking: player1NewElo });
      await updateDoc(player2Ref, { ranking: player2NewElo });

      console.log("Elo ratings updated successfully");
    } catch (error) {
      console.error("Error updating Elo ratings:", error);
    }
  };