import React from "react";

const SportEventCard = ({
  name,
  date,
  imageUrl,
}: {
  name: string;
  date: Date;
  imageUrl: string;
}) => {
  return (
    <div className="bg-black h-60 xm:h-80 rounded-lg overflow-hidden relative hover:blue-border duration-200 cursor-pointer">
      <img
        src={imageUrl}
        alt="sport-event"
        className="w-full h-full object-cover opacity-60"
      />
      <h1 className="absolute z-10 bottom-4 px-4 font-barlow text-2xl xm:text-3xl font-medium text-white">
        {name}
      </h1>
      <h3 className="absolute z-10 top-2 left-4 font-barlow text-xl xm:text-2xl font-base text-white">
        {date.toLocaleDateString()}
      </h3>
    </div>
  );
};

export default SportEventCard;
