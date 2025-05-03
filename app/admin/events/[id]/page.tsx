import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import UpdateEventForm from "./UpdateEventForm";
import { redirect } from "next/navigation";
import { checkIfAdmin } from "@/lib/userauth";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  const id = Number.parseInt((await params).id);

  const eventResults = await db.select().from(events).where(eq(events.id, id));
  const event = eventResults[0];

  return (
    <div className="container font-barlow">
      <h1 className="mb-6 text-3xl font-teko font-medium">Edit Event</h1>
      <UpdateEventForm event={event} />
    </div>
  );
}
