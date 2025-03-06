import AnnouncementCard from "../components/AnnouncementCard";
import Button, { ButtonWhite } from "../components/Button";
import EventCard from "../components/EventCard";
import Load3LatestAnnouncements from "../components/Load3LatestAnnouncements";
import Load3LatestEvents from "../components/Load3LatestEvents";
import SportEventCard from "../components/SportEventCard";

export default function Home() {
  return (
    <main>
      <div>
        <div className="flex items-center justify-center">
          <img
            src="/banner.png"
            alt="home-banner"
            className="w-full h-[450px] object-cover"
          />
          <h1 className="font-teko absolute text-8xl text-white w-1/2 text-center">
            Innovating the Future, One Line of Code at a Time
          </h1>
        </div>
        <div className="flex mt-10 gap-20 justify-center">
          <Button text="Explore Clubs" />
          <ButtonWhite text="View Announcements" />
        </div>
      </div>
      <div className="mt-20 flex flex-col items-center">
        <h1 className="font-teko text-3xl font-medium">LATEST EVENTS</h1>
        <div className="h-0.5 bg-blue-dark w-3/4 mt-4"></div>
        <Load3LatestEvents />
        <Button text="View All Events" />
      </div>
      <div className="mt-20 flex flex-col items-center">
        <h1 className="font-teko text-3xl font-medium">LATEST ANNOUNCEMENTS</h1>
        <div className="h-0.5 bg-blue-dark w-3/4 mt-4"></div>
        <Load3LatestAnnouncements />
        <Button text="View All Announcements" />
      </div>
      <div className="mt-20 flex flex-col items-center">
        <h1 className="font-teko text-3xl font-medium">LATEST SPORTS EVENTS</h1>
        <div className="h-0.5 bg-blue-dark w-3/4 mt-4"></div>
        <div className="flex gap-10 my-16">
          <SportEventCard />
          <SportEventCard />
        </div>
        <Button text="View All Sports Events" />
      </div>
      <div className="h-96"></div>
    </main>
  );
}
