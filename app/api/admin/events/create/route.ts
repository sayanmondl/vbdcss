import { db } from "@/db";
import { events } from "@/db/schema";
import { checkIfAdmin } from "@/lib/userauth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, location, date, coverUrl, archive } = body;

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    await db.insert(events).values({
      title: title,
      description: description,
      location: location,
      date: new Date(date),
      coverUrl: coverUrl,
      archive: archive,
    });

    return NextResponse.json(
      { message: "Event Created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
