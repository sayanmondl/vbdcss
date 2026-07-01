import React from "react";
import Button from "./Button";
import TournamentCard from "./TournamentCard";
import { getLatestTournaments } from "@/lib/tournament";

const Load3LatestTournaments = async () => {
  const tournaments = await getLatestTournaments();

  return (
    <div>
      <div className="mt-10 md:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a href="/sports">
          <Button text="View All Tournaments" />
        </a>
      </div>
    </div>
  );
};

export default Load3LatestTournaments;
