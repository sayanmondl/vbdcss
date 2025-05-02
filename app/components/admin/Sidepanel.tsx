"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  FileText,
  Calendar,
  BookOpen,
  Trophy,
  BarChart,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <BarChart size={16} />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users size={16} />,
  },
  {
    title: "Announcements",
    href: "/admin/announcements",
    icon: <FileText size={16} />,
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: <Calendar size={16} />,
  },
  {
    title: "Resources",
    href: "/admin/resources",
    icon: <BookOpen size={16} />,
  },
  {
    title: "Sports",
    icon: <Trophy size={16} />,
    children: [
      {
        title: "Teams",
        href: "/admin/sports-teams",
      },
      {
        title: "Tournaments",
        href: "/admin/tournaments",
      },
    ],
  },
];

export function Sidepanel() {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    Sports: true,
  });

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="font-barlow">
      <div className="p-6">
        <h2 className="text-2xl font-medium font-teko">Admin Panel</h2>
      </div>
      <nav className="space-y-1 px-2">
        {navItems.map((item) => {
          if (item.children) {
            return (
              <Collapsible
                key={item.title}
                open={openItems[item.title]}
                onOpenChange={() => toggleItem(item.title)}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between font-normal h-10"
                  >
                    <span className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </span>
                    {openItems[item.title] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-10 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.title}
                      href={child.href}
                      className={cn(
                        "flex items-center h-8 text-sm px-3 py-2 rounded-md",
                        pathname === child.href
                          ? "bg-muted font-medium"
                          : "hover:bg-muted/50"
                      )}
                    >
                      {child.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center h-10 text-sm px-3 py-2 rounded-md",
                pathname === item.href
                  ? "bg-muted font-medium"
                  : "hover:bg-muted/50"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
