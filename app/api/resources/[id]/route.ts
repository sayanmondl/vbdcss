import { db } from "@/db";
import { resources } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const resourceId = Number.parseInt(id);

    const resource = await db
      .select({ uploaderId: resources.uploaderId })
      .from(resources)
      .where(eq(resources.id, resourceId));

    const userId = session.user?.id as string;

    if (resource[0].uploaderId !== userId) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    await db.delete(resources).where(eq(resources.id, resourceId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}
