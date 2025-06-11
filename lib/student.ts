"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getStudents() {
  const students = db
    .select({
      id: users.id,
      name: users.name,
      year: users.year,
      semester: users.semester,
      image: users.image,
    })
    .from(users)
    .where(eq(users.role, "student"));

  return students;
}
