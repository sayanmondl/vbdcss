import React from "react";
import Button from "./Button";
import { getThreeTeams } from "@/lib/team";
import TeamCard from "./TeamCard";

const Load3Teams = async () => {
  const teams = await getThreeTeams();

  return (
    <div>
      <div className="mt-10 md:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a href="/sports/teams">
          <Button text="View All Teams" />
        </a>
      </div>
    </div>
  );
};

export default Load3Teams;
