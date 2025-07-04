import { db } from "@/db";
import { events } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { checkIfAdmin } from "@/lib/userauth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const eventId = Number.parseInt(id);

    await db.delete(events).where(eq(events.id, eventId));

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
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const id = Number.parseInt((await params).id);
    const body = await request.json();
    const { title, description, location, date, coverUrl, archiveUrl } = body;

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    await db
      .update(events)
      .set({
        title: title,
        description: description,
        location: location,
        date: new Date(date),
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
