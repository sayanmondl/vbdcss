import React from "react";
import EventCard from "./EventCard";
import Button from "./Button";
import { getLatestEvents } from "@/lib/event";

const Load3LatestEvents = async () => {
  const events = await getLatestEvents();

  return (
    <div className="pagemargin mt-14 md:mt-20" id="events">
      <a href="/#events">
        <div className="flex items-center gap-2">
          <div className="h-10 w-1 sm:h-12 bg-blue-dark" />
          <h1 className="font-teko text-2xl sm:text-3xl font-medium mt-1">
            LATEST EVENTS
          </h1>
        </div>
      </a>

      <div className="mt-10 md:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a href="/events">
          <Button text="View All Events" />
        </a>
      </div>
    </div>
  );
};

export default Load3LatestEvents;
