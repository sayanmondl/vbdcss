import React from "react";
import EventCard from "./EventCard";
import Button from "./Button";

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
    <div className="pagemargin mt-20 items-center" id="events">
      <div className="flex items-center">
        <a href="/#events">
          <div className="flex w-full items-center gap-2">
            <div className="w-4 h-12 bg-blue-dark"></div>
            <h1 className="font-teko text-3xl font-medium text-nowrap mt-2">
              LATEST EVENTS
            </h1>
          </div>
        </a>
        <div className="flex-1"></div>
        <Button text="View All Events" />
      </div>
      <div className="my-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.slice(0, 3).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Load3LatestEvents;
