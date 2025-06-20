import { db } from "@/db";
import { tournaments } from "@/db/schema";
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
    const tournamentId = Number.parseInt(id);

    await db.delete(tournaments).where(eq(tournaments.id, tournamentId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tournament:", error);
    return NextResponse.json(
      { error: "Failed to delete tournament" },
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
    const { name, sport, description, startDate, endDate, location } = body;

    await db
      .update(tournaments)
      .set({
        name: name,
        sport: sport,
        description: description,
        startDate: startDate,
        endDate: endDate,
        location: location,
      })
      .where(eq(tournaments.id, id));

    return NextResponse.json(
      { message: "Tournament updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update tournament:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
