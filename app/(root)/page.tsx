import Button, { ButtonWhite } from "../components/Button";
import Footer from "../components/Footer";
import Load3LatestAnnouncements from "../components/Load3LatestAnnouncements";
import Load3LatestEvents from "../components/Load3LatestEvents";
import Load3LatestTournaments from "../components/Load3LatestTournamnets";

export default async function Home() {
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
            Welcome to The Official website of Department of Computer and System
            Sciences.
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row mt-10 gap-3 sm:gap-20 justify-center items-center">
          <a href="/events">
            <Button text="View All Events" />
          </a>
          <a href="/announcements">
            <ButtonWhite text="View Announcements" />
          </a>
        </div>
      </div>
      <Load3LatestEvents />
      <Load3LatestAnnouncements />
      <Load3LatestTournaments />
      <div className="h-36"></div>
      <Footer />
    </main>
  );
}
