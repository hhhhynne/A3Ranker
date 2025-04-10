"use client";
import PlayersTable from "@/components/players-table/playersTable";
import { useAuth } from "@/providers/authProvider";
import { redirect } from "next/navigation";

const Players = () => {
  const user = useAuth();

  if (!user) {
    redirect("/sign-in");
  }
  return <PlayersTable />;
};

export default Players;
