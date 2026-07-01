import { db } from "@/db";
import { events, sportsTeams, teamMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { checkIfAdmin } from "@/lib/userauth";
import UpdateTeamForm from "./UpdateTeamForm";

export default async function EditTeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  const id = Number.parseInt((await params).id);

  const teamResults = await db
    .select()
    .from(sportsTeams)
    .where(eq(sportsTeams.id, id));
  const team = teamResults[0];

  const members = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.teamId, id));

  return (
    <div className="container font-barlow">
      <h1 className="mb-6 text-3xl font-teko font-medium">Edit Team</h1>
      <UpdateTeamForm team={team} members={members} />
    </div>
  );
}
