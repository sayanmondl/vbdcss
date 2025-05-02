import { auth } from "@/auth";
import { db } from "@/db";
import { tournaments } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }
  try {
    const allTournaments = await db
      .select({
        id: tournaments.id,
        name: tournaments.name,
        sport: tournaments.sport,
      })
      .from(tournaments);

    return NextResponse.json(allTournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return NextResponse.json(
      { error: "Failed to fetch tournamnets" },
      { status: 500 }
    );
  }
}
