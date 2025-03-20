import { SmallButton } from "@/app/components/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="pagemargin grid sm:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-6 mb-10">
      <div className="bg-blue-background p-4 rounded-lg box-shadow">
        <div className="h-[300px] rounded-md overflow-hidden flex justify-center">
          <Image
            src="/IoT.jpg"
            alt="IoT"
            width={300}
            height={300}
            className="w-full object-cover"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <h1 className="barlow-heading">IoT Club</h1>
          <Link href="/clubs/iot">
            <SmallButton text="View Details" />
          </Link>
        </div>
      </div>
      <div className="bg-blue-background p-4 rounded-lg box-shadow">
        <div className="h-[300px] rounded-md overflow-hidden flex justify-center">
          <Image
            src="/codeclub.svg"
            alt="codeclub"
            width={300}
            height={300}
            className="w-full object-cover"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <h1 className="barlow-heading">Code Club</h1>
          <Link href="/clubs/codeclub">
            <SmallButton text="View Details" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
