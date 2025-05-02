import { db } from "@/db";
import { events } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const id = Number.parseInt(params.id);

    await db.delete(events).where(eq(events.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const id = Number.parseInt((await params).id);
    const body = await request.json();
    const { title, description, location, date, coverUrl, archiveUrl } = body;

    await db
      .update(events)
      .set({
        title: title,
        description: description,
        location: location,
        date: date,
        coverUrl: coverUrl,
        archive: archiveUrl,
      })
      .where(eq(events.id, id));

    return NextResponse.json(
      { message: "Event updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update event:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
