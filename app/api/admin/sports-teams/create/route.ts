import { auth } from "@/auth";
import { db } from "@/db";
import { sportsTeams, teamMembers } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const body = await request.json();
    const { name, sport, year, captainId, logoUrl, tournamentPlayed, members } =
      body;

    const teamId = await db
      .insert(sportsTeams)
      .values({
        name: name,
        sport: sport,
        year: year,
        captainId: captainId,
        logoUrl: logoUrl,
        tournamentPlayed: tournamentPlayed,
      })
      .returning({ id: sportsTeams.id });

    const valuesToInsert = members.map((userId: string) => ({
      teamId: teamId[0].id,
      userId,
    }));

    await db.insert(teamMembers).values(valuesToInsert);

    return NextResponse.json(
      { message: "Team Created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to create team:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
