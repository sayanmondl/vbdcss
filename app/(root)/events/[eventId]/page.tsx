import Button from "@/app/components/Button";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const dummyData = {
  cover: "/dummy2.jpg",
  date: new Date("2025-9-5"),
  title: "Teachers' Day Celebration 2025",
  archive: "https://drive.google.com",
  location:
    "Auditorium, Department of Computer and System Sciences, Siksha-Bhavana, Visva-Bharati",
  description:
    "The Teachers' Day Celebration 2025 was a heartfelt tribute to our faculty. The event featured speeches, student performances, and a special award ceremony recognizing outstanding educators. A highlight was the video montage of students sharing their appreciation. The event concluded with a networking lunch, fostering meaningful interactions between teachers and students.",
};

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const { eventId } = await params;
  return (
    <main className="pagemargin">
      <div className="relative">
        <div className="w-full h-[250px] sm:h-[400px] overflow-hidden flex rounded-lg items-center bg-black">
          <Image
            src={dummyData.cover}
            alt="cover"
            width={1000}
            height={400}
            className="opacity-50"
          />
        </div>
        <div className="absolute bottom-0 left-2 sm:left-6">
          <h1 className="text-3xl sm:text-5xl font-teko text-white">
            {dummyData.title}
          </h1>
          <h2 className="text-xl sm:text-2xl sm:font-medium font-barlow text-white mb-2 sm:mb-8">
            {formatDate(dummyData.date)}
          </h2>
        </div>
        <p className="text-white absolute font-barlow w-[300px] sm:w-[400px] right-6 top-8 italic text-right">
          {dummyData.location}
        </p>
      </div>
      <div className="h-[1px] mt-8 sm:mt-16 bg-blue-dark mb-5 sm:mb-10"></div>
      <h3 className="font-barlow text-lg text-blue-dark mb-6">
        {dummyData.description}
      </h3>
      <Link href={dummyData.archive}>
        <Button text="View Images" />
      </Link>
    </main>
  );
};

export default Page;
