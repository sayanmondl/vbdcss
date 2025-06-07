import React from "react";

import type { Team } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCaptainInfo } from "@/lib/team";

interface TeamProp {
  team: Team;
}

const TeamCard = async ({ team }: TeamProp) => {
  const capId = team.captainId;
  const capInfo = await getCaptainInfo(capId);
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-sm font-barlow border overflow-hidden">
      <div className="relative">
        <img
          src="/team_placeholder.svg"
          alt={team.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
          <h2 className="text-white text-2xl font-bold">{team.name}</h2>
          <div className="flex space-x-2 mt-1">
            <span className="bg-white text-black text-xs px-3 font-medium py-1 rounded-full">
              {team.sport}
            </span>
            <span className="bg-white text-black text-xs px-3 font-medium py-1 rounded-full">
              {team.year}
            </span>
          </div>
          <Avatar className="absolute top-4 right-4 w-10">
            <AvatarImage
              src={team.logoUrl as string}
              alt={`${team.name} Logo`}
            />
            <AvatarFallback>
              {team.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <span className="font-medium">Team Captain</span>
          <div className="flex items-center space-x-3">
            <p>{capInfo.name}</p>
            <Avatar className="border bg-white">
              <AvatarImage src={capInfo.image || ""} alt="Captain" />
              <AvatarFallback>
                {capInfo.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <a href={`/sports/teams/${team.id}`}>
          <button className="w-full mt-4 bg-blue-dark text-white py-2 rounded-lg hover:bg-blue-medium">
            View Full Team
          </button>
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
