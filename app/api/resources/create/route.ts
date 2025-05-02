import { auth } from "@/auth";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const body = await request.json();
    const { fileName, description, resourceType, userId, subject, fileUrl } =
      body;

    await db.insert(resources).values({
      name: fileName,
      description: description,
      type: resourceType,
      uploaderId: userId,
      subject: subject,
      fileUrl: fileUrl,
    });

    return NextResponse.json(
      { message: "Resource Uploaded SUccessfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to upload resource:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
