import React from "react";
import SportEventCard from "./SportEventCard";

const sports = [
  {
    id: 1,
    date: new Date("2024-10-20"),
    name: "SIKSHA-BHAVANA FOOTBALL TOURNAMENT",
    imageUrl: "/footb.jpg",
},
{
    id: 2,
    date: new Date("2023-11-02"),
    name: "INTER-DEPARTMENT CRICKET TOURNAMENT",
    imageUrl: "/cric.jpg",
  },
];

const LoadLatestSportEvents = () => {
  return (
    <div className="pagemargin grid grid-cols-1 md:grid-cols-2 gap-10 my-16">
      {sports.slice(0, 3).map((sport) => (
        <SportEventCard
          key={sport.id}
          date={sport.date}
          name={sport.name}
          imageUrl={sport.imageUrl}
        />
      ))}
    </div>
  );
};

export default LoadLatestSportEvents;
