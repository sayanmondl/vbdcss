import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import {
  AlignLeft,
  Boxes,
  Calendar,
  GraduationCap,
  Megaphone,
  Volleyball,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Navbar = () => {
  let loggedIn = false;

  return (
    <nav>
      <div className="bg-blue-fade h-20 flex items-center px-5 md:px-20">
        <Sheet>
          <SheetTrigger className="flex gap-2 items-center hover:bg-blue-light px-2 py-1 rounded-md md:hidden">
            <AlignLeft className="text-blue-medium" size={20} />
            <h3 className="font-barlow text-blue-medium font-medium">Menu</h3>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="mb-6">
              <Link
                href="https://visvabharati.ac.in/index.html"
                className="flex items-center gap-4"
              >
                <Image src="/vblogo.svg" alt="vblogo" width={40} height={40} />
                <h1 className="font-teko font-normal text-[22px] text-blue-dark">
                  Visva-Bharati
                </h1>
              </Link>
            </SheetTitle>
            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="para">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-blue-middark" size={16} />
                    Student
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <NavLink link="/student/resources" text="Resources" />
                    <NavLink link="/student" text="Our Students" />
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="para">
                  <div className="flex items-center gap-2">
                    <Boxes className="text-blue-middark" size={16} />
                    Clubs
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <NavLink link="/clubs/iot" text="VBDCSS IoT Club" />
                    <NavLink link="/clubs/codeclub" text="Code-Club" />
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="para">
                  <div className="flex items-center gap-2">
                    <Volleyball className="text-blue-middark" size={16} />
                    Sports
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <NavLink link="/sports/teams" text="Teams" />
                    <NavLink link="/sports" text="Tournaments" />
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <Link href="/announcements">
                  <div className="flex items-center gap-2 ">
                    <Megaphone className="text-blue-middark" size={16} />
                    <p className="para py-4 hover:underline">Announcements</p>
                  </div>
                </Link>
              </AccordionItem>
              <AccordionItem value="item-5">
                <Link href="/events">
                  <div className="flex items-center gap-2 ">
                    <Calendar className="text-blue-middark" size={16} />
                    <p className="para py-4 hover:underline">Events</p>
                  </div>
                </Link>
              </AccordionItem>
            </Accordion>
          </SheetContent>
        </Sheet>
        <Link
          href="https://visvabharati.ac.in/index.html"
          className="md:flex items-center gap-4 hidden"
        >
          <Image src="/vblogo.svg" alt="vblogo" width={40} height={40} />
          <h1 className="font-teko text-[22px] text-blue-dark">
            Visva-Bharati
          </h1>
        </Link>
        <div className="flex-1"></div>
        {loggedIn ? (
          <Link href="/dashboard">
            <div>
              <Image src="/user.png" alt="account" width={40} height={40} className="hover:blue-border duration-100 rounded-full object-cover" />
            </div>
          </Link>
        ) : (
          <div>
            <Button text="Log In" />
          </div>
        )}
      </div>

      <div className="bg-blue-light h-14 md:flex items-center justify-center hidden">
        <NavigationMenu className="bg-transparent">
          <NavigationMenuList className="gap-2 bg-transparent">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent data-[state=open]:bg-white">
                <GraduationCap className="text-blue-middark" size={16} />
                <span className="para">Student</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex h-[220px] w-[450px]">
                  <div className="flex justify-center items-center overflow-hidden p-4 rounded-md">
                    <Image
                      src="/books.jpg"
                      alt=""
                      width={250}
                      height={400}
                      className="h-full blue-border-thin rounded-sm object-cover"
                    />
                  </div>
                  <ul className="grid gap-3 py-4 pr-4">
                    <ListItem href="/student/resources" title="Resources">
                      Access study materials, library resources, and academic
                      tools
                    </ListItem>
                    <ListItem href="/student" title="Our Students">
                      View the list of students in the department
                    </ListItem>
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent data-[state=open]:bg-white">
                <Boxes className="text-blue-middark" size={16} />
                <span className="para">Clubs</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex h-[220px] w-[500px]">
                  <div className="flex justify-center items-center overflow-hidden p-4 rounded-md">
                    <Image
                      src="/IoT.jpg"
                      alt=""
                      width={250}
                      height={400}
                      className="h-full blue-border-thin rounded-sm object-cover"
                    />
                  </div>
                  <ul className="grid gap-3 py-4 pr-4">
                    <ListItem href="/clubs/iot" title="IoT Club">
                      Join the VBDCSS IoT Club and explore cool projects with
                      others
                    </ListItem>
                    <ListItem href="/clubs/codeclub" title="Code Club">
                      Join the Code Club to learn and participate in various
                      projects
                    </ListItem>
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent data-[state=open]:bg-white">
                <Volleyball className="text-blue-middark" size={16} />
                <span className="para">Sports</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex h-[220px] w-[500px]">
                  <div className="flex justify-center items-center overflow-hidden p-4 rounded-md">
                    <Image
                      src="/football.jpg"
                      alt=""
                      width={250}
                      height={400}
                      className="h-full blue-border-thin rounded-sm object-cover"
                    />
                  </div>
                  <ul className="grid gap-3 py-4 pr-4">
                    <ListItem href="/sports/teams" title="Teams">
                      See our Sports teams that played recent tournaments
                    </ListItem>
                    <ListItem href="/sports" title="Tournaments">
                      View the tournaments that our department participated in
                    </ListItem>
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/announcements" legacyBehavior passHref>
                <NavigationMenuLink className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent">
                  <Megaphone className="text-blue-middark" size={16} />
                  <span className="para">Announcements</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/events" legacyBehavior passHref>
                <NavigationMenuLink className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent">
                  <Calendar className="text-blue-middark" size={16} />
                  <span className="para">Events</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

const NavLink = ({ link, text }: { link: string; text: string }) => {
  return (
    <li>
      <Link href={link}>
        <p className="font-barlow text-base !text-blue-medium hover:underline p-2 my-1">
          {text}
        </p>
      </Link>
    </li>
  );
};

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
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
