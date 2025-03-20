import Link from "next/link";
import Button, { ButtonWhite } from "../components/Button";
import Load3LatestAnnouncements from "../components/Load3LatestAnnouncements";
import Load3LatestEvents from "../components/Load3LatestEvents";
import LoadLatestSportEvents from "../components/LoadLatestSportEvents";

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
          <h1 className="font-teko absolute px-4 text-2xl xxs:text-4xl lg:text-6xl xl:text-7xl text-white xs:w-[350px] md:w-[500px] sm:w-[400px] lg:w-[600px] xl:w-[700px] xll:w-[900px] text-center">
            Welcome to The Official website of Department of Computer and System Sciences.
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row mt-10 gap-3 sm:gap-20 justify-center items-center">
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
        <Link href="/announcements">
          <Button text="View All Announcements" />
        </Link>
      </div>
      <div className="mt-20 flex flex-col items-center">
        <h1 className="font-teko text-3xl font-medium">LATEST SPORTS EVENTS</h1>
        <div className="h-0.5 bg-blue-dark w-3/4 mt-4"></div>
        <LoadLatestSportEvents />
        <Button text="View All Sports Events" />
      </div>
      <div className="h-96"></div>
    </main>
  );
}
