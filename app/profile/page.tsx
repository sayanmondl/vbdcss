import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Link, Mail } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { resources, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import ShowRes from "./showres";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const userId = session.user?.id as string;
  const userData = await db.select().from(users).where(eq(users.id, userId));

  const user = userData[0];
  const res = await db
    .select()
    .from(resources)
    .where(eq(resources.uploaderId, userId));

  const notUserProf = user.role !== "prof";
  const userProf = user.role === "prof";

  const getDomainFromUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch (e) {
      return url;
    }
  };

  return (
    <div>
      <div className="min-h-screen font-barlow">
        <main className="px-4 py-6 md:px-6 md:py-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage
                        src={user.image || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {user.active && (
                      <span
                        className="absolute bottom-4 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                        title="Active"
                      ></span>
                    )}
                  </div>
                  <h2 className="text-2xl text-blue-dark font-semibold">
                    {user.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-1 font-medium">
                    <Badge variant="outline" className="font-medium">
                      {user.year?.toString() ?? ""}
                    </Badge>
                    <Badge variant="outline" className="font-medium">
                      {user.course}
                    </Badge>
                    {notUserProf && (
                      <Badge variant="outline" className="font-medium">
                        SEM - {user.semester}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="font-medium">
                      {user.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-md text-slate-500 mt-4">
                    <a
                      href={`mailto:${user.email}`}
                      className="flex items-center gap-2 p-2 text-sm bg-slate-100 text-blue-600 rounded-md transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {notUserProf && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Links</CardTitle>
                    <CardDescription>
                      Connect with {user.name.split(" ")[0]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-blue-600">
                    {(user.links ?? []).map((link, index) => (
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
              )}

              {user.isAdmin ? (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Admin</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-blue-600">
                    <a
                      href="/admin"
                      className="flex items-center gap-2 p-2 text-sm text-blue-600 bg-slate-100 rounded-md transition-colors"
                    >
                      <Link className="w-4 h-4 text-blue-600" />
                      <span>Go to Admin panel</span>
                    </a>
                  </CardContent>
                </Card>
              ) : (
                <div></div>
              )}

              {userProf ? (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">
                      Faculty
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-blue-600">
                    <a
                      href="/faculty-dashboard"
                      className="flex items-center gap-2 p-2 text-sm text-blue-600 bg-slate-100 rounded-md transition-colors"
                    >
                      <Link className="w-4 h-4 text-blue-600" />
                      <span>Go to Faculty Dashboard</span>
                    </a>
                  </CardContent>
                </Card>
              ) : (
                <div></div>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-medium text-lg">About</CardTitle>
                </CardHeader>
                <CardContent className="min-h-27">
                  <p className="text-md leading-relaxed">{user.about}</p>
                </CardContent>
              </Card>

              {notUserProf && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-medium text-lg">
                      Skills & Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="min-h-27">
                    <div className="flex flex-wrap gap-2">
                      {(user.goodIn ?? []).map((skill, index) => (
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
              )}

              {notUserProf && (
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
                        <div className="text-sm">{user.id}</div>
                      </div>

                      <div>
                        <div className="text-md font-medium text-slate-500">
                          Status
                        </div>
                        <div className="text-sm flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${user.active ? "bg-green-500" : "bg-red-500"}`}
                          ></span>
                          {user.active ? "Active" : "Inactive"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

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
                        <ShowRes
                          id={resource.id}
                          name={resource.name}
                          type={resource.type}
                          subject={resource.subject}
                        />
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
