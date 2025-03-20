export interface Event {
  id: number;
  cover: string;
  date: Date;
  title: string;
  archive: string;
  description: string;
}

export async function getEvents() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return [
    {
      id: 1,
      cover: "/dummy.jpg",
      date: new Date("2025-1-12"),
      title: "Freshers Welcome Event",
      archive: "https://drive.google.com",
      description:
        "On 27th October, the freshers event was organized to welcome all the new students",
    },
    {
      id: 2,
      cover: "/dummy.jpg",
      date: new Date("2025-1-12"),
      title: "Freshers Welcome Event",
      archive: "https://drive.google.com",
      description:
        "On 27th October, the freshers event was organized to welcome all the new students",
    },
    {
      id: 3,
      cover: "/dummy2.jpg",
      date: new Date("2025-1-12"),
      title: "Freshers Welcome Event",
      archive: "https://drive.google.com",
      description:
        "On 27th October, the freshers event was organized to welcome all the new students",
    },
    {
      id: 4,
      cover: "/dummy2.jpg",
      date: new Date("2025-1-12"),
      title: "Freshers Welcome Event",
      archive: "https://drive.google.com",
      description:
        "On 27th October, the freshers event was organized to welcome all the new students",
    },
    {
      id: 5,
      cover: "/dummy.jpg",
      date: new Date("2025-1-12"),
      title: "Freshers Welcome Event",
      archive: "https://drive.google.com",
      description:
        "On 27th October, the freshers event was organized to welcome all the new students",
    },
    {
      id: 6,
      cover: "/dummy.jpg",
      date: new Date("2025-1-12"),
      title: "Freshers Welcome Event",
      archive: "https://drive.google.com",
      description:
        "On 27th October, the freshers event was organized to welcome all the new students",
    },
  ];
}

export async function getPaginatedEvents(page = 1, pageSize = 10) {
  const events = await getEvents();
  const totalItems = events.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const validPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (validPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    data: events.slice(startIndex, endIndex),
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
