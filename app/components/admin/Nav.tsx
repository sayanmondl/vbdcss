"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export function Nav() {
  return (
    <div className="flex justify-between">
      <a href="/" className="items-center gap-4">
        <Image src="/logo2.svg" alt="vblogo" width={70} height={50} />
      </a>

      <a href="/profile">
        <Button className="font-barlow bg-blue-dark">
          Profile
          <ChevronRight />
        </Button>
      </a>
    </div>
  );
}
