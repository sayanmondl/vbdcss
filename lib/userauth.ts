"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function checkIfAdmin() {
  const session = await auth();

  if (!session) {
    return false;
  }
  const userId = session.user?.id as string;

  const userRole = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, userId));

  const role = userRole[0].role;

  if (role === "admin") {
    return true;
  } else {
    return false;
  }
}
