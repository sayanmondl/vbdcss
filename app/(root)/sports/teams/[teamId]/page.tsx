import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { sportsTeams, teamMembers, tournaments, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CalendarIcon, Trophy, Users } from "lucide-react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Page({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const teamId = Number.parseInt((await params).teamId);

  // Get team data
  const selectedTeam = await db
    .select()
    .from(sportsTeams)
    .where(eq(sportsTeams.id, teamId));

  if (!selectedTeam.length) {
    notFound();
  }

  const team = selectedTeam[0];

  // Get team members with user details using a join
  const teamMembersWithDetails = await db
    .select({
      userId: teamMembers.userId,
      name: users.name,
      image: users.image,
    })
    .from(teamMembers)
    .where(eq(teamMembers.teamId, team.id))
    .leftJoin(users, eq(teamMembers.userId, users.id));

  // Get captain data
  const captainData = await db
    .select()
    .from(users)
    .where(eq(users.id, team.captainId));

  if (!captainData.length) {
    notFound();
  }

  const captain = captainData[0];

  // Get tournament data
  const tournamentData = await db
    .select({ name: tournaments.name })
    .from(tournaments)
    .where(eq(tournaments.id, team.tournamentPlayed));

  if (!tournamentData.length) {
    notFound();
  }

  const tournament = tournamentData[0];

  return (
    <div className="pagemargin">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-barlow">
        <div className="md:col-span-3 flex flex-col md:flex-row items-center md:items-start gap-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {team.logoUrl ? (
              <Image
                src={team.logoUrl || "/placeholder.svg"}
                alt={`${team.name} logo`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Logo
              </div>
            )}
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{team.name}</h1>
              <Badge className="bg-emerald-500">{team.sport}</Badge>
            </div>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <CalendarIcon className="w-4 h-4" />
              <span>Team year {team.year}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={(captain.image as string) || "/placeholder.svg"}
                    alt={captain.name}
                  />
                  <AvatarFallback>
                    {captain.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{captain.name}</p>
                  <p className="text-muted-foreground">Captain</p>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Users size={18} className="text-muted-foreground" />
                <span className="text-sm">
                  {teamMembersWithDetails.length} Members
                </span>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Trophy size={18} className="text-muted-foreground" />
                <span className="text-sm">{tournament.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Team Players</CardTitle>
              <CardDescription>
                All members of the {team.name} for the {team.year} season
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembersWithDetails.map((member) => (
                  <div key={member.userId}>
                    <a href={`/student/${member.userId}`}>
                      <div className="flex items-center gap-4 p-4 rounded-lg border">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={(member.image as string) || "/placeholder.svg"}
                            alt={member.name as string}
                          />
                          <AvatarFallback>
                            {member.name &&
                              member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{member.name}</p>
                            {member.userId === team.captainId && (
                              <Badge variant="outline" className="text-xs">
                                Captain
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
