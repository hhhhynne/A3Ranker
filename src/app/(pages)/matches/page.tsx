"use client";
//import { MatchDialog } from "@/components/createMatch/matchDialog";
import MatchesTable from "@/components/matches-table/matchesTable";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/authProvider";
import Link from "next/link";

const Matches = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
       <div className="flex items-center justify-end p-6 mr-20">
        {isAuthenticated && (
          <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "flex items-center justify-center gap-x-2 p-6"
          )}
          href="/matches/create"
        >
          <Icons.add className="h-8 w-8" />
          <span>New match</span>
        </Link>)}
        {/* <MatchDialog /> */}
      </div>
      <MatchesTable />
    </div>
  );
};

export default Matches;
