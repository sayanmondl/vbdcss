import React from "react";

import type { Team } from "@/types";

interface TeamProp { 
  team: Team;
}

const TeamCard = ({ team }: TeamProp) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
    
      <div className="relative">
        <img
          src="/cricket.avif"
          alt={team.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
          <h2 className="text-white text-xl font-bold">{team.name}</h2>
          <div className="flex space-x-2 mt-1">
            <span className="bg-white text-black text-xs px-3 py-1 rounded-full">
              {team.sport}
            </span>
            <span className="bg-white text-black text-xs px-3 py-1 rounded-full">
              {team.year}
            </span>
          </div>
          <img
            src={team.logoUrl}
            alt={`${team.name} Logo`}
            className="absolute top-4 right-4 w-10"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <span className="font-medium">⚽ Team Captain</span>
          <div className="flex items-center space-x-3">
            {/* <img
              src={dummycaptain.image}
              alt={dummycaptain.name}
              className="w-8 h-8 rounded-full"
            /> */}
            {/* <span className="font-medium">{team.name}</span> */}
          </div>
        </div>

       
        <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700">
          View Full Team
        </button>

      
      </div>
    </div>
  );
};

export default TeamCard;