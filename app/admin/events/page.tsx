import { DataTable } from "@/app/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { events } from "@/db/schema";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { eventColumns } from "./EventColumns";

export default async function EventsPage() {
  const allEvents = await db.select().from(events);

  return (
    <div className="space-y-6 font-barlow">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-teko text-blue-dark">Events</h1>
        <Link href="/admin/events/new">
          <Button className="bg-blue-dark">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      <DataTable
        columns={eventColumns}
        data={allEvents}
        filterColumn="title"
        filterPlaceholder="Filter by title..."
      />
    </div>
  );
}
