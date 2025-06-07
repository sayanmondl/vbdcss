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

  const role = await db
    .select({ isAdmin: users.isAdmin })
    .from(users)
    .where(eq(users.id, userId));

  const isAdmin = role[0].isAdmin;

  return isAdmin;
}
