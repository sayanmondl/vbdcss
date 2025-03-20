import React from "react";
import AnnouncementCard from "./AnnouncementCard";

const announcements = [
  {
    id: 1,
    date: new Date("2024-10-20"),
    title: "Seminar about Quantum Computing",
    info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
  },
  {
    id: 2,
    date: new Date("2024-10-20"),
    title: "Seminar about Quantum Computing",
    info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
  },
  {
    id: 3,
    date: new Date("2024-10-20"),
    title: "Seminar about Quantum Computing",
    info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
  },
];

const Load3LatestAnnouncements = () => {
  return (
    <div className="my-16 w-3/4 space-y-7">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
};

export default Load3LatestAnnouncements;
