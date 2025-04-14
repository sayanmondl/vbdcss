import { auth } from "@/auth";
import AnnouncementCard from "./AnnouncementCard";
import Button from "./Button";

const announcements = [
  {
    id: 1,
    date: new Date("2024-10-20"),
    title: "Seminar about Quantum Computing",
    info: "The Department of Computer and System Sciences is pleased to announce an upcoming seminar on Quantum Computing. This event will feature distinguished speakers from leading research institutions who will discuss the latest advancements in quantum algorithms, quantum cryptography, and potential applications in various fields.",
  },
  {
    id: 2,
    date: new Date("2024-09-15"),
    title: "New Research Lab Opening Ceremony",
    info: "We are excited to announce the grand opening of our new Advanced AI Research Laboratory. The state-of-the-art facility will support cutting-edge research in artificial intelligence, machine learning, and data science. Faculty and students are invited to attend the ribbon-cutting ceremony followed by demonstrations of ongoing research projects.",
  },
  {
    id: 3,
    date: new Date("2024-08-05"),
    title: "Call for Papers: International Conference on Computer Science",
    info: "The department is hosting the International Conference on Computer Science and Information Technology (ICCSIT) next semester. We invite submissions from researchers, faculty members, and graduate students on topics including but not limited to artificial intelligence, cybersecurity, distributed systems, and computational theory.",
  },
];

const Load3LatestAnnouncements = async () => {
  const session = await auth();
  return (
    <div className="pagemargin mt-10" id="announcements">
      <div className="flex items-center">
        <a href="/#announcements">
          <div className="flex w-full items-center gap-2">
            <div className="w-4 h-12 bg-blue-dark"></div>
            <h1 className="font-teko text-3xl font-medium text-nowrap mt-2">
              LATEST ANNOUNCEMENTS
            </h1>
          </div>
        </a>
        <div className="flex-1"></div>
        {session ? (
          <a href="/announcements" className="hidden sm:block">
            <Button text="View All Announcements" />
          </a>
        ) : (
          <a href="/auth/signin" className="hidden sm:block">
            <Button text="Log in" />
          </a>
        )}
      </div>

      <div className="mt-4 mb-8">
        {session ? (
          <p className="text-blue-dark font-barlow">
            Stay informed about the latest news, events, and opportunities from
            the Department of Computer and System Sciences.
          </p>
        ) : (
          <div className="flex justify-center">
            <p className="text-blue-dark font-barlow">
              Log in to see all annoncements.
            </p>
          </div>
        )}
      </div>

      {session ? (
        <div>
          <div className="space-y-6">
            {announcements.slice(0, 3).map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))}
          </div>
          <a
            href="/announcements"
            className="flex sm:hidden justify-center mt-10"
          >
            <Button text="View All Announcements" />
          </a>
        </div>
      ) : (
        <a href="/auth/signin" className="flex sm:hidden justify-center mt-10">
          <Button text="Log In" />
        </a>
      )}
    </div>
  );
};

export default Load3LatestAnnouncements;
