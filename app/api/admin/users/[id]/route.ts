import { db } from "@/db";
import { users } from "@/db/schema";
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
    const id = params.id;

    await db.delete(users).where(eq(users.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
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
    const id = (await params).id;
    const body = await request.json();
    const { email, name, role, year, active, about, links, goodIn, image } =
      body;

    await db
      .update(users)
      .set({
        email: email,
        name: name,
        role: role,
        year: year,
        active: active,
        about: about,
        links: links,
        goodIn: goodIn,
        image: image,
      })
      .where(eq(users.id, id));

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
