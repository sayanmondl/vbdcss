import Button from "@/app/components/Button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const dummyData = {
  title: "Upcoming Seminar on AI Ethics",
  info: "Join us for an insightful seminar on AI Ethics by Dr. John Doe on March 20, 2025, at 10 AM in Room 101.",
  author: "Department of Computer Science",
  date: new Date("2025-3-20"),
  category: "Seminar",
  attachment: "/Announcement.pdf",
};

const Page = async ({
  params,
}: {
  params: Promise<{ announcementId: string }>;
}) => {
  const { announcementId } = await params;
  return (
    <div className="pagemargin mt-4">
      <div className="flex space-x-10 items-center">
        <h1 className="teko-heading-big">{dummyData.title}</h1>
        <Badge className="bg-blue-dark">{dummyData.category}</Badge>
      </div>
      <h2 className="text-xl md:text-2xl font-medium font-barlow text-blue-dark mb-8">
        {formatDate(dummyData.date)}
      </h2>
      <h2 className="text-lg md:text-xl font-barlow text-blue-medium mb-4">
        - {dummyData.author}
      </h2>
      <div className="h-[1px] bg-blue-dark mb-10"></div>
      <p className="font-barlow text-base mb-6">{dummyData.info}</p>
      <div className="flex">
        <a href={dummyData.attachment}>
          <Button text="View details" />
        </a>
      </div>
    </div>
  );
};

export default Page;
