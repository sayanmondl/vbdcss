import { db } from "@/db";
import { users } from "@/db/schema";
import { checkIfAdmin } from "@/lib/userauth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    let query = db
      .select({
        id: users.id,
        name: users.name,
        image: users.image,
        semester: users.semester,
        course: users.course,
      })
      .from(users);

    if (search) {
      const allUsers = await query;
      const filtered = allUsers.filter((user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()),
      );
      return Response.json(filtered);
    }

    const allUsers = await query;
    return Response.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
