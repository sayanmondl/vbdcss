"use server"

import { db } from "@/db";
import { announcements } from "@/db/schema";
import { desc } from "drizzle-orm";

export interface Announcement {
  id: number;
  date: Date;
  title: string;
  info: string;
}

export async function getAnnouncements() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return [
    {
      id: 1,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 2,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 3,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 4,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 5,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 6,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 7,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 8,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 9,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 10,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 11,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 12,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 13,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 14,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 15,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 16,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 17,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 18,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 19,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 20,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 21,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 22,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 23,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 24,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 25,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 26,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 27,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 28,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 29,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 30,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
    {
      id: 31,
      date: new Date("2024-10-20"),
      title: "Seminar about Quantum Computing",
      info: "The sun dipped below the horizon, casting a warm orange glow across the quiet countryside. A gentle breeze rustled through the tall grass, carrying the scent of earth and wildflowers. In the distance, a small farmhouse stood with its windows glowing softly, a sign of life in the fading light.",
    },
  ];
}

export async function getLatestAnnouncements() {
  const threeAnnouncements = await db
    .select()
    .from(announcements)
    .orderBy(desc(announcements.publish))
    .limit(3);

  return threeAnnouncements;
}

export async function getPaginatedAnnouncements(page = 1, pageSize = 10) {
  const announcements = await getAnnouncements();
  const totalItems = announcements.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const validPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (validPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    data: announcements.slice(startIndex, endIndex),
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
