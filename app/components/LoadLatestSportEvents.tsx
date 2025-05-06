import { PaginationControls } from "./PaginationControls";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getAllTournaments } from "@/lib/tournament";
import TournamentCard from "./TournamentCard";

interface LoadTournamentProps {
  page: number;
  pageSize?: number;
}

async function TournamentsList() {
  const tournaments = await getAllTournaments();

  if (tournaments.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No tournaments found</h3>
        <p className="text-muted-foreground">
          There are currently no tournaments to display.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tournaments.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}

function TournamentLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LoadTournaments({}: LoadTournamentProps) {
  return (
    <div className="container">
      <div className="mb-4 flex">
        <h1 className="barlow-heading-thin mb-2">Events:</h1>
        <div className="flex-1"></div>
      </div>

      <Suspense fallback={<TournamentLoading />}>
        <TournamentsList />
      </Suspense>
    </div>
  );
}
