import { db } from "@/db";
import { users } from "@/db/schema";
import { checkIfAdmin } from "@/lib/userauth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const isAdmin = await checkIfAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const body = await request.json();
    const { email, name, role, year, active, about, links, goodIn, image } =
      body;

    await db.insert(users).values({
      email: email,
      name: name,
      role: role,
      year: year,
      active: active,
      about: about,
      links: links,
      goodIn: goodIn,
      image: image,
    });

    return NextResponse.json(
      { message: "User Created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
