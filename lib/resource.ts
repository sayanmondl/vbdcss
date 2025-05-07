"use server";
import { db } from "@/db";
import { resources } from "@/db/schema";

export async function getResources() {
  return await db.select().from(resources);
}
