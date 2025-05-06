import Button from "@/app/components/Button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { events } from "@/db/schema";
import { formatDate } from "@/lib/utils";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const { eventId } = await params;
  const EventDetails = await db
    .select()
    .from(events)
    .where(eq(events.id, Number.parseInt(eventId)));

  const allEventDetails = EventDetails[0];

  return (
    <main className="pagemargin">
      <div className="relative">
        <div className="w-full h-[250px] sm:h-[400px] overflow-hidden flex rounded-lg items-center bg-black">
          <Image
            src={allEventDetails.coverUrl ?? ""}
            alt="cover"
            width={1000}  
            height={400}
            className="opacity-50"
          />
        </div>
        <div className="absolute bottom-0 left-2 sm:left-6">
          <h1 className="text-3xl sm:text-5xl font-teko text-white">
            {allEventDetails.title}
          </h1>
          <h2 className="text-xl sm:text-2xl sm:font-medium font-barlow text-white mb-2 sm:mb-8">
            {formatDate(allEventDetails.date)}
          </h2>
        </div>
        <p className="text-white absolute font-barlow w-[300px] sm:w-[400px] right-6 top-8 italic text-right">
          {allEventDetails.location}
        </p>
      </div>
      <div className="h-[1px] mt-8 sm:mt-16 bg-blue-dark mb-5 sm:mb-10"></div>
      <h3 className="font-barlow text-lg text-blue-dark mb-6">
        {allEventDetails.description}
      </h3>
      <Link href={allEventDetails.archive ?? "#"}>
        <Button text="View Images" />
      </Link>
    </main>
  );
};

export default Page;
