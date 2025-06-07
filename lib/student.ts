"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, or } from "drizzle-orm";

export async function getStudents() {
  const students = db
    .select({
      id: users.id,
      name: users.name,
      year: users.year,
      image: users.image,
    })
    .from(users)
    .where(eq(users.role, "student"));

  return students;
}
