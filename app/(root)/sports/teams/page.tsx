import TeamCard from "@/app/components/TeamCard";
import { getTeams } from "@/lib/team";
import React from "react";

const page = async () => {
  const teams = await getTeams();
  return (
    <div className="pagemargin">
      <h1 className="barlow-heading-thin mb-6">Teams:</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default page;
