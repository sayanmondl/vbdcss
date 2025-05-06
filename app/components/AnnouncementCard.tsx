import { formatDate } from "@/lib/utils";
import { Announcement } from "@/types";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  return (
    <Link href={`/announcements/${announcement.id}`} className="block">
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
        <div className="flex flex-col md:flex-row">
          <div className="bg-blue-background p-4 md:p-6 flex flex-row md:flex-col items-center justify-center md:w-1/5">
            <div className="flex items-center md:flex-col md:text-center">
              <Calendar className="h-4 w-4 text-blue-dark mr-2 md:mr-0 md:mb-1 md:h-5 md:w-5" />
              <time
                dateTime={announcement.publish.toISOString()}
                className="font-barlow text-sm md:text-base font-medium text-blue-dark"
              >
                {formatDate(announcement.publish)}
              </time>
            </div>
          </div>

          <div className="p-4 md:p-6 flex-1 border-t md:border-t-0 md:border-l border-gray-100">
            <div className="flex justify-between items-start">
              <h2 className="font-teko text-xl md:text-2xl font-medium text-blue-dark group-hover:text-blue-middark transition-colors mb-2">
                {announcement.title}
              </h2>
              <span className="text-blue-dark opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="h-5 w-5" />
              </span>
            </div>

            {announcement.isImportant && (
              <div className="bg-purple-400">Important</div>
            )}

            <p className="font-barlow text-gray-600 line-clamp-3 mb-3">
              {announcement.info}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnnouncementCard;
