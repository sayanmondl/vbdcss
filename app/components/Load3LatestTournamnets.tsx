import React from "react";
import Button from "./Button";
import TournamentCard from "./TournamentCard";
import { getLatestTournaments } from "@/lib/tournament";

const Load3LatestTournaments = async () => {
  const tournaments = await getLatestTournaments();
  return (
    <div className="pagemargin mt-20 items-center" id="tournaments">
      <div className="flex items-center">
        <a href="/#tournaments">
          <div className="flex w-full items-center gap-2">
            <div className="w-4 h-12 bg-blue-dark"></div>
            <h1 className="font-teko text-3xl font-medium text-nowrap mt-2">
              SPORTS & ATHLETICS
            </h1>
          </div>
        </a>
        <div className="flex-1"></div>
        <a href="/sports">
          <Button text="View All Tournaments" />
        </a>
      </div>
      <div className="my-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
};

export default Load3LatestTournaments;
