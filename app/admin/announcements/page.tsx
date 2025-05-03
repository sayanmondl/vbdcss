import { DataTable } from "@/app/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { announcementColumns } from "./AnnouncementColumns";
import { redirect } from "next/navigation";
import { checkIfAdmin } from "@/lib/userauth";

export default async function AnnouncementsPage() {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  const allAnnouncements = await db.select().from(announcements);

  return (
    <div className="space-y-6 font-barlow">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-teko text-blue-dark">Announcements</h1>
        <Link href="/admin/announcements/new">
          <Button className="bg-blue-dark">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Announcement
          </Button>
        </Link>
      </div>

      <DataTable
        columns={announcementColumns}
        data={allAnnouncements}
        filterColumn="title"
        filterPlaceholder="Filter by title..."
      />
    </div>
  );
}
