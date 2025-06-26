import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import {
  AlignLeft,
  Calendar,
  ChevronRight,
  File,
  GraduationCap,
  Megaphone,
  User2,
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
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();
  const name = session?.user?.name as string;

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
              <Link href="/" className="items-center gap-4">
                <Image src="/logo2.svg" alt="vblogo" width={70} height={50} />
              </Link>
            </SheetTitle>
            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="para">
                  <div className="flex items-center gap-2">
                    <User2 className="text-blue-middark" size={16} />
                    Members
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <NavLink link="/student" text="Students" />
                    <NavLink link="/faculty" text="Professors" />
                    <NavLink link="/scholars" text="Research Scholars" />
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
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
              <AccordionItem value="item-3">
                <Link href="/announcements">
                  <div className="flex items-center gap-2 ">
                    <Megaphone className="text-blue-middark" size={16} />
                    <p className="para py-4 hover:underline">Announcements</p>
                  </div>
                </Link>
              </AccordionItem>
              <AccordionItem value="item-4">
                <Link href="/events">
                  <div className="flex items-center gap-2 ">
                    <Calendar className="text-blue-middark" size={16} />
                    <p className="para py-4 hover:underline">Events</p>
                  </div>
                </Link>
              </AccordionItem>
              <AccordionItem value="item-5">
                <Link href="/student/resources">
                  <div className="flex items-center gap-2 ">
                    <File className="text-blue-middark" size={16} />
                    <p className="para py-4 hover:underline">Resources</p>
                  </div>
                </Link>
              </AccordionItem>
            </Accordion>
          </SheetContent>
        </Sheet>
        <Link href="/" className="md:flex items-center gap-4 hidden">
          <Image src="/logo2.svg" alt="vblogo" width={70} height={50} />
        </Link>
        <div className="flex-1"></div>
        {session ? (
          <Link href="/profile">
            <div className="flex items-center group rounded-full px-3 py-2 bg-white">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={session.user?.image || ""} alt={name} />
                <AvatarFallback className="font-barlow border hover:bg-blue-dark hover:text-white">
                  {name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* <p className="font-barlow">{name.split(" ")[0]}</p> */}
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1.5 duration-200"
              />
            </div>
          </Link>
        ) : (
          <a href="/auth/signin">
            <Button text="Log In" />
          </a>
        )}
      </div>

      <div className="bg-blue-light h-14 md:flex items-center justify-center hidden">
        <NavigationMenu className="bg-transparent">
          <NavigationMenuList className="gap-2 bg-transparent">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent data-[state=open]:bg-white">
                <User2 className="text-blue-middark" size={16} />
                <span className="para">Members</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex h-[300px] w-[450px]">
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
                    <ListItem href="/student" title="Students">
                      View the list of students in the department
                    </ListItem>
                    <ListItem href="/faculty" title="Professors">
                      Professors of the Department of Computer and System
                      Sciences
                    </ListItem>
                    <ListItem href="/scholars" title="Research Scholars">
                      Current Research Scholars in VBDCSS
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
              <NavigationMenuLink
                href="/announcements"
                className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent"
              >
                <Megaphone className="text-blue-middark" size={16} />
                <span className="para">Announcements</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/events"
                className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent"
              >
                <Calendar className="text-blue-middark" size={16} />
                <span className="para">Events</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/student/resources"
                className="flex items-center gap-2 rounded-[5px] hover:bg-white px-4 py-1.5 bg-transparent"
              >
                <File className="text-blue-middark" size={16} />
                <span className="para">Resources</span>
              </NavigationMenuLink>
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
