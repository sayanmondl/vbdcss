import Button from "@/app/components/Button";
import { auth } from "@/auth";
import { db } from "@/db";
import { events } from "@/db/schema";
import { formatDate } from "@/lib/utils";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const { eventId } = await params;
  const allEventDetails = await db
    .select()
    .from(events)
    .where(eq(events.id, Number.parseInt(eventId)));

  const eventDetails = allEventDetails[0];

  return (
    <main className="pagemargin">
      <div className="relative">
        <div className="w-full h-[250px] sm:h-[400px] overflow-hidden flex rounded-lg items-center bg-black">
          <Image
            src={eventDetails.coverUrl ?? ""}
            alt="cover"
            width={1000}
            height={400}
            className="opacity-50"
          />
        </div>
        <div className="absolute bottom-0 left-2 sm:left-6">
          <h1 className="text-3xl sm:text-5xl font-teko text-white">
            {eventDetails.title}
          </h1>
          <h2 className="text-xl sm:text-2xl sm:font-medium font-barlow text-white mb-2 sm:mb-8">
            {formatDate(eventDetails.date)}
          </h2>
        </div>
        <p className="text-white absolute font-barlow w-[300px] sm:w-[400px] right-6 top-8 italic text-right">
          {eventDetails.location}
        </p>
      </div>
      <div className="h-[1px] mt-8 sm:mt-16 bg-blue-dark mb-5 sm:mb-10"></div>
      <h3 className="font-barlow text-lg text-blue-dark mb-6">
        {eventDetails.description}
      </h3>
      <Link href={eventDetails.archive ?? "#"}>
        <Button text="View Images" />
      </Link>
    </main>
  );
};

export default Page;
