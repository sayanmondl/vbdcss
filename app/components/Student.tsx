import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

const Student = ({
  id,
  name,
  year,
  image,
}: {
  id: string;
  name: string;
  year: number;
  image: string;
}) => {
  return (
    <Link href={`/student/${id}`}>
      <div className="bg-blue-background flex gap-6 rounded-md m-3 p-3 items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={image || ""} alt={name.split("")[0]} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h3 className="uppercase font-barlow font-medium text-blue-dark">
          {name}
        </h3>
        <div className="flex-1"></div>
        <Badge className="bg-blue-dark">Year-{year}</Badge>
      </div>
    </Link>
  );
};

export default Student;
