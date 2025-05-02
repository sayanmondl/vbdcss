import { db } from "@/db";
import { announcements } from "@/db/schema";
import { eq } from "drizzle-orm";
import UpdateAnnouncementForm from "./UpdateAnnouncementForm";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number.parseInt((await params).id);

  const oldAnnoncements = await db
    .select()
    .from(announcements)
    .where(eq(announcements.id, id));
  const oldAnnoncement = oldAnnoncements[0];

  return (
    <div className="container font-barlow">
      <h1 className="mb-6 text-3xl font-teko font-medium">Edit Announcement</h1>
      <UpdateAnnouncementForm announcement={oldAnnoncement} />
    </div>
  );
}
