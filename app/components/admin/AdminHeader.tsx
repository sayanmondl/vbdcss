"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Nav } from "./Nav";
import { Sidepanel } from "./Sidepanel";

export function AdminHeader() {
  return (
    <header className="border-b h-14 flex items-center px-4 md:px-6">
      <Sheet>
        <SheetTitle className="sr-only">Admin Panel</SheetTitle>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidepanel />
        </SheetContent>
      </Sheet>
      <div className="ml-auto flex items-center space-x-4">
        <Nav />
      </div>
    </header>
  );
}
