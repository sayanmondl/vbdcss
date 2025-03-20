import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Student = ({
  name,
  sem,
  avatarUrl,
}: {
  name: string;
  sem: number;
  avatarUrl: string;
}) => {
  return (
    <Link href={`/student/${name}`}>
      <div className="bg-blue-background flex gap-6 rounded-md m-3 p-3 items-center">
        <Image src="/user.png" alt="" className="" width={40} height={40} />
        <h3 className="uppercase font-barlow font-medium text-blue-dark">
          {name}
        </h3>
        <div className="flex-1"></div>
        <Badge className="bg-blue-dark">SEM-{sem}</Badge>
      </div>
    </Link>
  );
};

export default Student;
