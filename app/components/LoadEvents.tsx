import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { PaginationControls } from "./PaginationControls";
import { getPaginatedEvents } from "@/lib/event";
import EventCard from "./EventCard";

interface LoadEventsProps {
  page: number;
}

async function EventsList({ page }: LoadEventsProps) {
  const { data: events, pagination } = await getPaginatedEvents(page);

  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No events found</h3>
        <p className="text-muted-foreground">
          There are currently no events to display.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <PaginationControls
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        baseUrl="/events"
      />
    </div>
  );
}

function EventsLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LoadEvents({ page = 1 }: LoadEventsProps) {
  return (
    <div className="container">
      <div className="mb-4 flex">
        <h1 className="barlow-heading-thin mb-2">Events:</h1>
        <div className="flex-1"></div>
      </div>

      <Suspense fallback={<EventsLoading />}>
        <EventsList page={page} />
      </Suspense>
    </div>
  );
}
