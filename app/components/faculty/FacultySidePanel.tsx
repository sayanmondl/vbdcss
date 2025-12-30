"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Paperclip, Sheet } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/faculty-dashboard",
    icon: <LayoutDashboard size={16} />,
  },
  {
    title: "Assessments",
    href: "/faculty-dashboard/assessments",
    icon: <Paperclip size={16} />,
  },
  {
    title: "Attendance sheets",
    href: "/faculty-dashboard/attendance",
    icon: <Sheet size={16} />,
  },
];

export function FacultySidePanel() {
  const pathname = usePathname();

  return (
    <div className="font-barlow">
      <div className="p-6">
        <h2 className="text-2xl font-medium font-teko">Faculty Dashboard</h2>
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
