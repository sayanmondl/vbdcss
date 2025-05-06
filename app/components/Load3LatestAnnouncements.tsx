import { auth } from "@/auth";
import AnnouncementCard from "./AnnouncementCard";
import Button from "./Button";
import { getLatestAnnouncements } from "@/lib/announcement";

const Load3LatestAnnouncements = async () => {
  const session = await auth();

  const announcements = await getLatestAnnouncements();
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
            {announcements.map((announcement) => (
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
