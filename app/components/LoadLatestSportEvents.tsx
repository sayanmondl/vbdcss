import SportEventCard from "./SportEventCard";
import Button from "./Button";

const sports = [
  {
    id: 1,
    date: new Date("2024-10-20"),
    name: "SIKSHA-BHAVANA FOOTBALL TOURNAMENT",
    imageUrl: "/footb.jpg",
    location: "University Main Ground",
    participants: "8 teams",
  },
  {
    id: 2,
    date: new Date("2023-11-02"),
    name: "INTER-DEPARTMENT CRICKET TOURNAMENT",
    imageUrl: "/cric.jpg",
    location: "Cricket Stadium",
    participants: "12 teams",
  },
];

const LoadLatestSportEvents = () => {
  return (
    <div className="pagemargin mt-20" id="sports">
      <div className="flex items-center">
        <a href="/#sports">
          <div className="flex w-full items-center gap-2">
            <div className="w-4 h-12 bg-blue-dark"></div>
            <h1 className="font-teko text-3xl font-medium text-nowrap mt-2">
              SPORTS AND ATHLETICS
            </h1>
          </div>
        </a>
        <div className="flex-1"></div>
        <a href="/sports" className="hidden sm:block">
          <Button text="View All Tournaments" />
        </a>
      </div>

      <div className="mt-4 mb-8">
        <p className="text-blue-dark font-barlow">
          Stay updated with the latest sporting events and tournaments. Join us
          to celebrate athleticism and team spirit!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        {sports.map((sport) => (
          <SportEventCard
            key={sport.id}
            date={sport.date}
            name={sport.name}
            imageUrl={sport.imageUrl}
            location={sport.location}
            participants={sport.participants}
          />
        ))}
      </div>
      <a href="/sports" className="flex sm:hidden justify-center">
        <Button text="View All Tournaments" />
      </a>
    </div>
  );
};

export default LoadLatestSportEvents;
