import Button from "@/app/components/Button";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { formatDate } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({
  params,
}: {
  params: Promise<{ announcementId: string }>;
}) => {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }
  const announcementId = Number.parseInt((await params).announcementId);

  const selectedAnnouncements = await db
    .select()
    .from(announcements)
    .where(eq(announcements.id, announcementId));

  const announcement = selectedAnnouncements[0];

  return (
    <div className="pagemargin mt-4">
      <div className="flex space-x-10 items-center">
        <h1 className="teko-heading-big">{announcement.title}</h1>
        <Badge className="bg-blue-dark">
          {announcement.isImportant && <div>Important</div>}
        </Badge>
      </div>
      <h2 className="text-xl md:text-2xl font-medium font-barlow text-blue-dark mb-8">
        {formatDate(announcement.publish)}
      </h2>
      <div className="h-[1px] bg-blue-dark mb-10"></div>
      <p className="font-barlow text-base mb-6">{announcement.info}</p>
      <div className="flex">
        {announcement.attachment && (
          <a href={announcement.attachment}>
            <Button text="View details" />
          </a>
        )}
      </div>
    </div>
  );
};

export default Page;
