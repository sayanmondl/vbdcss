import React from "react";
import type { Tournament } from "@/types";

interface TournamentProp {
  tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentProp) => {
  return (
    <div className="w-full max-w-md bg-white font-barlow rounded-lg border shadow-sm overflow-hidden">
      <div className="relative">
        <img
          src="/tournament_placeholder.svg"
          alt={tournament.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
          <h2 className="text-white  font-medium text-2xl">
            {tournament.name}
          </h2>
          <div className="flex space-x-2 mt-1">
            <span className="bg-white text-black text-xs px-3 py-1 rounded-full">
              {tournament.sport}
            </span>
            <span className="flex-1"></span>
            <span className="text-white text-sm px-3 py-1">
              {tournament.location}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <a href={`/sports/${tournament.id}`}>
          <button className="w-full mt-4 bg-gray-900 font-barlow text-white py-2 rounded-lg hover:bg-gray-700">
            View Tournament Details
          </button>
        </a>
      </div>
    </div>
  );
};

export default TournamentCard;
