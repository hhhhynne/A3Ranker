import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const updatePlayerRecord = async (
  player1: string,
  player2: string,
  winner: string
) => {
  try {
    const player1Ref = doc(db, "players", player1);
    const player2Ref = doc(db, "players", player2);
    const winPlayerRef = doc(db, "players", winner);

    const player1Snap = await getDoc(player1Ref);
    const player2Snap = await getDoc(player2Ref);
    const winPlayerSnap = await getDoc(winPlayerRef);

    if (
      !player1Snap.exists() ||
      !player2Snap.exists() ||
      !winPlayerSnap.exists()
    ) {
      throw new Error("One or both players not found");
    }

    
      let player1wins = player1Snap.data().wins;
      let player1losses = player1Snap.data().losses;

      let player2wins = player2Snap.data().wins;
      let player2losses = player2Snap.data().losses;

    if (winner === player1) {
       player1wins = player1wins + 1;
       player2losses = player2losses + 1;
    } else {
       player1losses = player1losses + 1;
       player2wins = player2wins + 1;
    }

    await updateDoc(player1Ref, { wins: player1wins, losses: player1losses });
    await updateDoc(player2Ref, { wins: player2wins, losses: player2losses });

    console.log("Records updated successfully");
  } catch (error) {
    console.error("Error updating records:", error);
  }
};
