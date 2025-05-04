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
    .where(or(eq(users.role, "student"), eq(users.role, "admin")));

  return students;
}
