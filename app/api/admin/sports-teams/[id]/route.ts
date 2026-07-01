import { db } from "@/db";
import { sportsTeams, teamMembers } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { checkIfAdmin } from "@/lib/userauth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const teamId = Number.parseInt(id);

    await db.delete(sportsTeams).where(eq(sportsTeams.id, teamId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json(
      { error: "Failed to delete team" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const teamId = Number.parseInt((await params).id);
    const body = await request.json();
    const { name, sport, year, logoUrl, tournamentPlayed, members } = body;

    await db
      .update(sportsTeams)
      .set({
        name,
        sport,
        year,
        logoUrl,
        tournamentPlayed,
      })
      .where(eq(sportsTeams.id, teamId));

    if (members && Array.isArray(members)) {
      await db.delete(teamMembers).where(eq(teamMembers.teamId, teamId));

      if (members.length > 0) {
        await db.insert(teamMembers).values(
          members.map((userId: string) => ({
            teamId,
            userId,
          })),
        );
      }
    }

    return Response.json({ success: true, id: teamId });
  } catch (error) {
    console.error("Error updating team:", error);
    return Response.json({ error: "Failed to update team" }, { status: 500 });
  }
}
