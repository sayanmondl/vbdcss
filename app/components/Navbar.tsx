"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { Boxes, GraduationCap, Megaphone, Volleyball } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav>
      <div className="bg-blue-fade h-20 flex items-center px-20 justify-between">
        <Link
          href="https://visvabharati.ac.in/index.html"
          className="flex items-center gap-4"
        >
          <Image src="/vblogo.svg" alt="vblogo" width={40} height={40} />
          <h1 className="font-teko text-[22px] text-blue-dark">
            Visva-Bharati
          </h1>
        </Link>
        <div>
          <Button text="Log In" />
        </div>
      </div>
      <div className="bg-blue-light h-14 flex items-center justify-center">
        <NavigationMenu className="bg-transparent">
          <NavigationMenuList className="gap-2 bg-transparent">
            <NavigationMenuItem>
              <Link href="/announcements" legacyBehavior passHref>
                <NavigationMenuLink className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent">
                  <Megaphone className="text-blue-middark" size={16} />
                  <span className="para">Announcements</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent data-[state=open]:bg-white">
                <Boxes className="text-blue-middark" size={16} />
                <span className="para">Clubs</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/clubs/cultural" title="Cultural Clubs">
                    Explore music, dance, drama, and other cultural activities
                  </ListItem>
                  <ListItem href="/clubs/technical" title="Technical Clubs">
                    Join coding, robotics, and other technical interest groups
                  </ListItem>
                  <ListItem href="/clubs/literary" title="Literary Clubs">
                    Participate in debates, creative writing, and literary
                    events
                  </ListItem>
                  <ListItem href="/clubs/social" title="Social Clubs">
                    Engage in community service and social awareness activities
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent data-[state=open]:bg-white">
                <GraduationCap className="text-blue-middark" size={16} />
                <span className="para">Students</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/students/resources" title="Resources">
                    Access study materials, library resources, and academic
                    tools
                  </ListItem>
                  <ListItem href="/students/scholarships" title="Scholarships">
                    Find information about available scholarships and financial
                    aid
                  </ListItem>
                  <ListItem href="/students/career" title="Career Services">
                    Explore career guidance, internships, and placement
                    opportunities
                  </ListItem>
                  <ListItem href="/students/counseling" title="Counseling">
                    Get support for academic, personal, and mental health
                    concerns
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent data-[state=open]:bg-white">
                <Volleyball className="text-blue-middark" size={16} />
                <span className="para">Sports</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/sports/teams" title="Sports Teams">
                    Join university sports teams and competitive activities
                  </ListItem>
                  <ListItem href="/sports/facilities" title="Facilities">
                    Learn about available sports facilities and equipment
                  </ListItem>
                  <ListItem href="/sports/events" title="Events">
                    Stay updated on upcoming tournaments and sports events
                  </ListItem>
                  <ListItem href="/sports/fitness" title="Fitness Programs">
                    Participate in fitness classes and wellness programs
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="font-barlow font-medium leading-none">{title}</div>
          <p className="line-clamp-2 font-barlow leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
