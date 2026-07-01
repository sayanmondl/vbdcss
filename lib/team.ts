"use server";

import { db } from "@/db";
import { sportsTeams, users } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function getTeams() {
  return await db.select().from(sportsTeams);
}

export async function getCaptainInfo(capId: string) {
  const capInfo = await db
    .select({ name: users.name, image: users.image })
    .from(users)
    .where(eq(users.id, capId));

  return capInfo[0];
}

export async function getThreeTeams() {
  const threeTeams = await db
    .select()
    .from(sportsTeams)
    .where(inArray(sportsTeams.sport, ["Football", "Cricket", "Badminton"]))
    .limit(3);

  return threeTeams;
}
