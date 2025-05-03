import { db } from "@/db";
import { sportsTeams } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { checkIfAdmin } from "@/lib/userauth";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const id = Number.parseInt(params.id);

    await db.delete(sportsTeams).where(eq(sportsTeams.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json(
      { error: "Failed to delete team" },
      { status: 500 }
    );
  }
}
