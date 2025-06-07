"use server";
import { db } from "@/db";
import { tournaments } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getLatestTournaments() {
  const threeTournaments = await db
    .select()
    .from(tournaments)
    .orderBy(desc(tournaments.startDate))
    .limit(3);

  return threeTournaments;
}

export async function getAllTournaments() {
  return await db.select().from(tournaments);
}
