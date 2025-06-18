import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Mail, User, X } from "lucide-react";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { resources, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import StudentNotFound from "./not-found";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const { studentId } = await params;
  const selectedStudent = await db
    .select()
    .from(users)
    .where(eq(users.id, studentId));

  const student = selectedStudent[0];

  if (!student) {
    notFound();
  }

  if (student.role == "prof") {
    return <StudentNotFound />;
  }

  const res = await db
    .select()
    .from(resources)
    .where(eq(resources.uploaderId, student.id));

  const getYearLabel = (year: number) => {
    const suffixes = ["st", "nd", "rd", "th"];
    const suffix = year <= 3 ? suffixes[year - 1] : suffixes[3];
    return `${year}${suffix} Year`;
  };

  const getDomainFromUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch (e) {
      return url;
    }
  };

  return (
    <div className="pagemargin">
      <div className="min-h-screen font-barlow">
        <main className="px-4 py-6 md:px-6 md:py-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage
                        src={student.image || "/placeholder.svg"}
                        alt={student.name}
                      />
                      <AvatarFallback>
                        {student.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {student.active && (
                      <span
                        className="absolute bottom-4 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                        title="Active"
                      ></span>
                    )}
                  </div>
                  <h2 className="text-2xl text-blue-dark font-semibold">
                    {student.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-1 font-medium">
                    <Badge variant="outline" className="font-medium">
                      {getYearLabel(student.year ?? 0)}
                    </Badge>
                    <Badge variant="secondary" className="font-medium">
                      {student.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-md text-slate-500 mt-4">
                    <a
                      href={`mailto:${student.email}`}
                      className="flex items-center gap-2 p-2 text-sm bg-slate-100 text-blue-600 rounded-md transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {student.email}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Links</CardTitle>
                  <CardDescription>
                    Connect with {student.name.split(" ")[0]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-blue-600">
                  {(student.links ?? []).map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 text-sm text-blue-600 bg-slate-100 rounded-md transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                      <span>{getDomainFromUrl(link)}</span>
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-medium text-lg">About</CardTitle>
                </CardHeader>
                <CardContent className="min-h-27">
                  <p className="text-md leading-relaxed">{student.about}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-medium text-lg">
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent className="min-h-27">
                  <div className="flex flex-wrap gap-2">
                    {(student.goodIn ?? []).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 font-medium text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-medium text-lg">
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="min-h-27">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-md font-medium text-slate-500">
                        User ID
                      </div>
                      <div className="text-sm">{student.id}</div>
                    </div>

                    <div>
                      <div className="text-md font-medium text-slate-500">
                        Status
                      </div>
                      <div className="text-sm flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${student.active ? "bg-green-500" : "bg-red-500"}`}
                        ></span>
                        {student.active ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-medium text-lg">
                    Resources Uploaded
                  </CardTitle>
                </CardHeader>
                <CardContent className="min-h-27">
                  <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 xll:grid-cols-3 gap-3">
                    {res.map((resource, index) => (
                      <CardContent
                        key={index}
                        className="min-h-27 rounded-md border py-4 bg-blue-fade"
                      >
                        <a href={`/student/resources/${resource.id}`}>
                          <div className="flex mb-2 items-center gap-3">
                            <div className="text-lg font-medium text-blue-dark">
                              {resource.name}
                            </div>
                            <Badge className="font-medium">
                              {resource.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 flex justify-between items-center">
                            {resource.subject}
                          </div>
                        </a>
                      </CardContent>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
