import TeamCard from "@/app/components/TeamCard";
import { getTeams } from "@/lib/team";
import React from "react";

const page = async () => {
  const teams = await getTeams();
  return (
    <div className="pagemargin grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
};

export default page;
