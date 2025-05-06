import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import {
  users,
  announcements,
  events,
  resources,
  sportsTeams,
  tournaments,
} from "@/db/schema";
import { checkIfAdmin } from "@/lib/userauth";
import { count } from "drizzle-orm";
import { Users, FileText, Calendar, Trophy, BookOpen } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  const [
    usersCount,
    announcementsCount,
    eventsCount,
    resourcesCount,
    teamsCount,
    tournamentsCount,
  ] = await Promise.all([
    db.select({ count: count() }).from(users),
    db.select({ count: count() }).from(announcements),
    db.select({ count: count() }).from(events),
    db.select({ count: count() }).from(resources),
    db.select({ count: count() }).from(sportsTeams),
    db.select({ count: count() }).from(tournaments),
  ]);

  const stats = [
    {
      title: "Users",
      value: usersCount[0].count,
      icon: <Users className="h-6 w-6" />,
      href: "/admin/users",
    },
    {
      title: "Announcements",
      value: announcementsCount[0].count,
      icon: <FileText className="h-6 w-6" />,
      href: "/admin/announcements",
    },
    {
      title: "Events",
      value: eventsCount[0].count,
      icon: <Calendar className="h-6 w-6" />,
      href: "/admin/events",
    },
    {
      title: "Resources",
      value: resourcesCount[0].count,
      icon: <BookOpen className="h-6 w-6" />,
      href: "/admin/resources",
    },
    {
      title: "Sports Teams",
      value: teamsCount[0].count,
      icon: <Users className="h-6 w-6" />,
      href: "/admin/sports-teams",
    },
    {
      title: "Tournaments",
      value: tournamentsCount[0].count,
      icon: <Trophy className="h-6 w-6" />,
      href: "/admin/tournaments",
    },
  ];

  return (
    <div className="font-barlow">
      <h1 className="text-4xl font-medium font-teko my-10 text-blue-dark">
        Admin Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.title}>
            <Card className="hover:bg-muted/50 transition-colors shadow-none rounded-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium text-blue-dark">
                  {stat.title}
                </CardTitle>
                <div className="rounded-sm p-2 !bg-blue-medium text-white">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-medium font-teko text-blue-dark">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Click to manage {stat.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
