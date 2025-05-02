import { auth } from "@/auth";
import { db } from "@/db";
import { tournaments } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, sport, description, startDate, endDate, location } = body;

    await db.insert(tournaments).values({
      name: name,
      sport: sport,
      description: description,
      startDate: startDate,
      endDate: endDate,
      location: location,
    });

    return NextResponse.json(
      { message: "Tournament Created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to create tournament:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
