"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser, UserPen, FileUp, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: <GraduationCap size={16} />,
  },
  {
    title: "Account",
    href: "/profile/account",
    icon: <CircleUser size={16} />,
  },
  {
    title: "Update",
    href: "/profile/update",
    icon: <UserPen size={16} />,
  },
  {
    title: "Upload Resource",
    href: "/profile/uploadres",
    icon: <FileUp size={16} />,
  },
];

export function ProfileSidePanel() {
  const pathname = usePathname();

  return (
    <div className="font-barlow">
      <div className="p-6">
        <h2 className="text-2xl font-medium font-teko">Your Profile</h2>
      </div>
      <nav className="space-y-1 px-2">
        {navItems.map((item) => {
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
