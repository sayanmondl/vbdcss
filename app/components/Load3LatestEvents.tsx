import React from "react";
import EventCard from "./EventCard";

const events = [
  {
    id: 1,
    cover: "/dummy.jpg",
    date: new Date("2025-1-12"),
    title: "Freshers Welcome Event",
    archive: "https://drive.google.com",
    description:
      "On 27th October, the freshers event was organized to welcome all the new students",
  },
  {
    id: 2,
    cover: "/dummy.jpg",
    date: new Date("2025-1-12"),
    title: "Freshers Welcome Event",
    archive: "https://drive.google.com",
    description:
      "On 27th October, the freshers event was organized to welcome all the new students",
  },
  {
    id: 3,
    cover: "/dummy2.jpg",
    date: new Date("2025-1-12"),
    title: "Freshers Welcome Event",
    archive: "https://drive.google.com",
    description:
      "On 27th October, the freshers event was organized to welcome all the new students",
  },
];

const Load3LatestEvents = () => {
  return (
    <div className="pagemargin my-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {events.slice(0, 3).map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Load3LatestEvents;
