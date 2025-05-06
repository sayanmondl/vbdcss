import React from "react";
import EventCard from "./EventCard";
import Button from "./Button";
import { getLatestEvents } from "@/lib/event";

const Load3LatestEvents = async () => {
  const events = await getLatestEvents();
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
        <a href="/events">
          <Button text="View All Events" />
        </a>
      </div>
      <div className="my-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Load3LatestEvents;
