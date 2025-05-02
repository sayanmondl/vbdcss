import CreateTournamentForm from "./CreateTournamentForm";

export default async function Page() {
  return (
    <div className="container font-barlow">
      <h1 className="mb-6 text-3xl font-teko font-medium">Create Tournament</h1>
      <CreateTournamentForm />
    </div>
  );
}
