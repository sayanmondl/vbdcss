import React from "react";
import { SmallButton } from "./Button";
import type { Event } from "@/lib/event";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="w-full border-gray-100 border shadow-sm rounded-lg overflow-hidden hover:shadow-md mx-auto sm:mx-0 group duration-300">
      <div className="w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden relative border-[#474964] border-b-[0.5px]">
        <img
          src={event.cover}
          alt="event-cover"
          className="w-full h-full object-cover group-hover:scale-110 duration-200"
        />
        <div className="bg-black absolute z-10 w-full h-full left-0 top-0 opacity-55"></div>
        <div className="flex absolute z-20 top-0 left-0 text-white font-barlow font-medium items-center gap-2 p-4">
          <Calendar size={20} />
          <p className="text-lg">15th May, 2025</p>
        </div>
        <div className="flex absolute z-20 bottom-0 left-0 text-white font-barlow font-medium items-center gap-2 p-4">
          <MapPin size={20} />
          <p className="text-lg">Room 2, Department of Computer & System Sciences</p>
        </div>
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
