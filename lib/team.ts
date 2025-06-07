"use server";

import { db } from "@/db";
import { sportsTeams, users } from "@/db/schema";
import { eq } from "drizzle-orm";

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
