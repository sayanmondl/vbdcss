import { getPaginatedAnnouncements } from "@/lib/announcement";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import AnnouncementCard from "./AnnouncementCard";
import { PaginationControls } from "./PaginationControls";

interface LoadAnnouncementsProps {
  page: number;
}

async function AnnouncementsList({ page }: LoadAnnouncementsProps) {
  const { data: announcements, pagination } =
    await getPaginatedAnnouncements(page);

  if (announcements.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No announcements found</h3>
        <p className="text-muted-foreground">
          There are currently no announcements to display.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-7">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>

      <PaginationControls
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        baseUrl="/announcements"
      />
    </div>
  );
}

function AnnouncementsLoading() {
  return (
    <div className="space-y-7">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[60px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
} 

export default function LoadAnnouncements({
  page = 1,
}: LoadAnnouncementsProps) {
  return (
    <div className="container">
      <div className="mb-4 flex">
        <h1 className="barlow-heading-thin mb-2">Announcements:</h1>
        <div className="flex-1"></div>
        <p className="text-muted-foreground font-barlow text-sm md:text-lg">
          Latest news and events
        </p>
      </div>

      <Suspense fallback={<AnnouncementsLoading />}>
        <AnnouncementsList page={page} />
      </Suspense>
    </div>
  );
}
