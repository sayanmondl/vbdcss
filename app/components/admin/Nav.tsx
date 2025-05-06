"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function Nav() {
  return (
    <a href="/profile">
      <Button className="font-barlow">Profile
        <ChevronRight />
      </Button>
    </a>
  );
}
