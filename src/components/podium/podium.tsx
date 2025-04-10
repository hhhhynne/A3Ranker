"use client";
import { db } from "@/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useInView } from "framer-motion";
import {  useEffect, useRef, useState } from "react";

const Podium = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [TopPlayers, setTopPlayers] = useState<any[]>([]);


  useEffect(() => {
    fetchTopPlayers();
  }, []);

  const fetchTopPlayers = async () => {
    try {
      const playersQuery = query(
        collection(db, "players"),
        orderBy("ranking", "desc"), 
        limit(3) 
      );

      const querySnapshot = await getDocs(playersQuery);

      
      const topPlayers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("querySnapshot", topPlayers);

      setTopPlayers(topPlayers);
    } catch (err) {
      console.error("Error fetching top players:", err);
      throw new Error("Failed to fetch top players");
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-6">Top 3 Players right now</h2>
      <div
        className="relative flex justify-center gap-8"
        ref={ref}
        style={{
          transition: "all 2s ease-in-out",
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(100)",
        }}
      >
        <div className="flex flex-col items-center w-40 p-4 border-2 border-primary rounded-xl shadow-md mt-8">
          <span className="text-4xl font-bold">2</span>
          <span className="text-lg font-semibold mt-2">
            {TopPlayers[1]?.name}
          </span>
          <span className="text-md  mt-1">
            Ranking: {TopPlayers[1]?.ranking}
          </span>
          <span className="text-md mt-1">
            Record: {TopPlayers[1]?.wins} / {TopPlayers[1]?.losses}
          </span>
        </div>

        <div className="flex flex-col items-center w-40 p-4 border-2 border-primary rounded-xl shadow-md">
          <span className="text-5xl font-bold ">1</span>
          <span className="text-lg font-semibold mt-2">
            {TopPlayers[0]?.name}
          </span>
          <span className="text-md  mt-1">
            Ranking: {TopPlayers[0]?.ranking}
          </span>
          <span className="text-md  mt-1">
            Record: {TopPlayers[0]?.wins} / {TopPlayers[0]?.losses}
          </span>
        </div>

        <div className="flex flex-col items-center w-40 p-4 border-2 border-primary rounded-xl shadow-md mt-10">
          <span className="text-4xl font-bold ">3</span>
          <span className="text-lg font-semibold mt-2">
            {TopPlayers[2]?.name}
          </span>
          <span className="text-md  mt-1">
            Ranking: {TopPlayers[2]?.ranking}
          </span>
          <span className="text-md  mt-1">
            Record: {TopPlayers[2]?.wins} / {TopPlayers[2]?.losses}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Podium;
