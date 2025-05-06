"use server";

import { db } from "@/db";
import { announcements } from "@/db/schema";

export async function getPaginatedAnnouncements(page = 1, pageSize = 10) {
  const allAnnouncements = await db.select().from(announcements);
  const totalItems = allAnnouncements.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const validPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (validPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    data: allAnnouncements.slice(startIndex, endIndex),
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
