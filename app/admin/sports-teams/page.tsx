import { DataTable } from "@/app/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { sportsTeams, users, tournaments } from "@/db/schema";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { teamColumns } from "./TeamColumns";

export default async function SportsTeamsPage() {
  const allTeams = await db
    .select({
      id: sportsTeams.id,
      name: sportsTeams.name,
      sport: sportsTeams.sport,
      year: sportsTeams.year,
      captainId: sportsTeams.captainId,
      captainName: users.name,
      tournamentId: sportsTeams.tournamentPlayed,
      tournamentName: tournaments.name,
    })
    .from(sportsTeams)
    .leftJoin(users, eq(sportsTeams.captainId, users.id))
    .leftJoin(tournaments, eq(sportsTeams.tournamentPlayed, tournaments.id));

  return (
    <div className="space-y-6 font-barlow">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-teko text-blue-dark">Sports Teams</h1>
        <Link href="/admin/sports-teams/new">
          <Button className="bg-blue-dark">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Team
          </Button>
        </Link>
      </div>

      <DataTable
        columns={teamColumns}
        data={allTeams}
        filterColumn="name"
        filterPlaceholder="Filter by team name..."
      />
    </div>
  );
}
