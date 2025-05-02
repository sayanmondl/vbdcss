import { auth } from "@/auth";
import { db } from "@/db";
import { announcements } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const body = await request.json();
    const { title, info, isImportant, fileUrl } = body;

    await db.insert(announcements).values({
      title: title,
      info: info,
      isImportant: isImportant,
      attachment: fileUrl,
    });

    return NextResponse.json(
      { message: "Annoucement Created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to create announcement:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
