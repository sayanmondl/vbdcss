"use server";
import { db } from "@/db";
import { sportsTeams } from "@/db/schema";

export async function getTeams() {
  return await db.select().from(sportsTeams);
}
