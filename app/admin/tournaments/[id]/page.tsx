import { db } from "@/db";
import { tournaments } from "@/db/schema";
import { eq } from "drizzle-orm";
import UpdateTournamentForm from "./UpdateTournamentForm";

export default async function EditTournamentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number.parseInt((await params).id);

  const tournamentResults = await db
    .select()
    .from(tournaments)
    .where(eq(tournaments.id, id));
  const tournament = tournamentResults[0];

  return (
    <div className="container font-barlow">
      <h1 className="mb-6 text-3xl font-teko font-medium">Edit Tournament</h1>
      <UpdateTournamentForm tournament={tournament} />
    </div>
  );
}
