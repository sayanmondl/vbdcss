import { db } from "@/db";
import { announcements, resources } from "@/db/schema";
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

    const resource = await db
      .select({ uploaderId: resources.uploaderId })
      .from(resources)
      .where(eq(announcements.id, id));

    const userId = session.user?.id as string;

    if (resource[0].uploaderId !== userId) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    await db.delete(resources).where(eq(resources.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}
