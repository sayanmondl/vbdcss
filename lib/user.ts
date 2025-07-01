"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

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

export async function getResearchScholars() {
  const students = db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      year: users.year,
      image: users.image,
    })
    .from(users)
    .where(eq(users.role, "scholar"));

  return students;
}

export async function getProfessors() {
  const students = db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      year: users.year,
      image: users.image,
    })
    .from(users)
    .where(eq(users.role, "prof"));

  return students;
}

export async function updateSemester(semester: string) {
  switch (semester) {
    case "I":
      db.update(users)
        .set({ semester: "II" })
        .where(eq(users.semester, semester));
      break;

    case "II":
      db.update(users)
        .set({ semester: "III" })
        .where(eq(users.semester, semester));
      break;

    case "III":
      db.update(users)
        .set({ semester: "IV" })
        .where(eq(users.semester, semester));
      break;

    case "IV":
      db.update(users)
        .set({ semester: "V" })
        .where(and(eq(users.semester, semester), eq(users.course, "B.Sc.")));

      db.update(users)
        .set({ semester: "_", active: false, course: "_" })
        .where(and(eq(users.semester, semester), eq(users.course, "M.Sc.")));
      break;

    case "V":
      db.update(users)
        .set({ semester: "VI" })
        .where(eq(users.semester, semester));
      break;

    case "VI":
      db.update(users)
        .set({ semester: "VII" })
        .where(eq(users.semester, semester));
      break;

    case "VII":
      db.update(users)
        .set({ semester: "VIII" })
        .where(eq(users.semester, semester));
      break;

    case "VIII":
      db.update(users)
        .set({ semester: "_", active: false, course: "_" })
        .where(eq(users.semester, semester));
      break;

    default:
      break;
  }
}
