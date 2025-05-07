"use server";
import { db } from "@/db";
import { tournaments } from "@/db/schema";

export async function getAllTournaments() {
  return await db.select().from(tournaments);
}
