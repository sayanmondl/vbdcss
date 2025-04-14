import { Calendar, MapPin, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

const SportEventCard = ({
  name,
  date,
  imageUrl,
  location,
  participants,
}: {
  name: string;
  date: Date;
  imageUrl: string;
  location?: string;
  participants?: string;
}) => {
  return (
    <div className="bg-black h-72 rounded-lg overflow-hidden relative group shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-dark">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt="sport-event"
        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-center bg-white rounded-md px-3 py-1 w-fit">
          <Calendar size={16} className="text-blue-dark mr-2" />
          <span className="font-barlow text-lg font-medium text-blue-dark">
            {formatDate(date)}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="font-barlow text-2xl font-medium text-white group-hover:text-blue-background transition-colors duration-300">
            {name}
          </h1>

          {location && (
            <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <MapPin size={16} className="mr-2" />
              <span className="font-barlow">{location}</span>
            </div>
          )}

          {participants && (
            <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Users size={16} className="mr-2" />
              <span className="font-barlow">{participants}</span>
            </div>
          )}

          <div className="w-0 h-1 bg-blue-background group-hover:w-full transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default SportEventCard;
