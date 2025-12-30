import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { assessments } from "@/db/schema";
import { checkIfFaculty } from "@/lib/userauth";
import { count, eq } from "drizzle-orm";
import { Paperclip } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function FacultyDashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const isFaculty = await checkIfFaculty();
  if (!isFaculty) {
    redirect("/");
  }

  const userId = session.user?.id as string;

  const assessmentCount = await db
    .select({ count: count() })
    .from(assessments)
    .where(eq(assessments.facultyId, userId));

  const stats = [
    {
      title: "Assessments",
      value: assessmentCount[0].count,
      icon: <Paperclip className="h-6 w-6" />,
      href: "/faculty-dashboard/assessments",
    },
  ];

  return (
    <div className="font-barlow">
      <h1 className="text-4xl font-medium font-teko my-10 text-blue-dark">
        Faculty Dashboard
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
