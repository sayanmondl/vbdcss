import type { Announcement } from "@/lib/announcement";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface AnnouncementCardProps {
  announcement: Announcement;
}
const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  return (
    <div>
      <Link href={`/announcements/${announcement.id}`}>
        <div className="bg-blue-background px-6 py-3 rounded-lg group hover:bg-blue-middark duration-100">
          <h1 className="font-barlow text-2xl font-medium text-blue-dark group-hover:text-white">
            {formatDate(announcement.date)} - {" "}
            {announcement.title}
          </h1>
          <p className="mt-2 font-barlow text-blue-dark group-hover:text-white">
            {announcement.info}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default AnnouncementCard;
