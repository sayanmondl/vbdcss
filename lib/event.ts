import { db } from "@/db";
import { events } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getLatestEvents() {
  const threeEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.date))
    .limit(3);

  return threeEvents;
}

export async function getPaginatedEvents(page = 1, pageSize = 10) {
  const allEvents = await db.select().from(events);
  const totalItems = allEvents.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const validPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (validPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    data: allEvents.slice(startIndex, endIndex),
    pagination: {
      currentPage: validPage,
      totalPages,
      pageSize,
      totalItems,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1,
    },
  };
}
