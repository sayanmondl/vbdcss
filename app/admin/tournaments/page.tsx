import { DataTable } from "@/app/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { tournaments } from "@/db/schema";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { tournamentColumns } from "./TournamentColumns";

export default async function TournamentsPage() {
  const allTournaments = await db.select().from(tournaments);

  return (
    <div className="space-y-6 font-barlow">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-teko text-blue-dark">Tournaments</h1>
        <Link href="/admin/tournaments/new">
          <Button className="bg-blue-dark">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Tournament
          </Button>
        </Link>
      </div>

      <DataTable
        columns={tournamentColumns}
        data={allTournaments}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
      />
    </div>
  );
}
