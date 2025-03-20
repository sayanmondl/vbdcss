import React from "react";
import { SmallButton } from "./Button";
import type { Event } from "@/lib/event";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="w-full bg-blue-background rounded-lg overflow-hidden shadow-lg mx-auto sm:mx-0">
      <div className="w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden">
        <img
          src={event.cover}
          alt="event-cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-5 text-blue-dark">
        <h1 className="font-barlow text-xl sm:text-2xl font-medium mb-3 sm:mb-4">
          {event.title}
        </h1>
        <p className="font-barlow text-sm sm:text-base mb-4 sm:mb-6">
          {event.description}
        </p>
        <div className="flex flex-row-reverse">
          <Link href={`/events/${event.id}`}>
            <SmallButton text="Learn More" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
