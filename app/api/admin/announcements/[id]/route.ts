import { db } from "@/db";
import { announcements } from "@/db/schema";
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
    const id = Number.parseInt((await params).id);

    await db.delete(announcements).where(eq(announcements.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json(
      { error: "Failed to delete announcement" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const id = Number.parseInt((await params).id);
    const body = await request.json();
    const { title, info, isImportant, fileUrl } = body;

    await db
      .update(announcements)
      .set({
        title: title,
        info: info,
        isImportant: isImportant,
        attachment: fileUrl,
      })
      .where(eq(announcements.id, id));

    return NextResponse.json(
      { message: "Annoucement updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update announcement:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
