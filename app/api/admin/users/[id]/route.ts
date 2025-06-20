import { db } from "@/db";
import { users } from "@/db/schema";
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
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const id = (await params).id;
    const body = await request.json();
    const {
      email,
      name,
      role,
      isAdmin,
      year,
      semester,
      active,
      about,
      links,
      goodIn,
      image,
    } = body;

    await db
      .update(users)
      .set({
        email: email,
        name: name,
        role: role,
        isAdmin: isAdmin,
        year: year,
        semester: semester,
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
