"use client";
import StatCard from "@/components/playerStats/statCard";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Player = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchStats(id as string);
    }
  }, [id]);

  const fetchStats = async (playerId: string) => {
    const q = doc(db, "players", playerId);
    const docSnap = await getDoc(q);
    setStats(docSnap.data());
    console.log(docSnap.data());
  };
  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold ml-16">Stats {stats?.name}</h1>
      <div className="flex justify-between w-1/2 mx-auto mt-16">
        <StatCard
          title="Ranking"
          stat={stats?.ranking}
          description="Ranking in ELO-system"
        />
        <StatCard title="Wins" stat={stats?.wins} description="Total wins" />
        <StatCard
          title="Losses"
          stat={stats?.losses}
          description="Total losses"
        />
      </div>
    </div>
  );
};

export default Player;
