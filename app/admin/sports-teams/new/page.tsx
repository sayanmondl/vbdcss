import CreateTeamForm from "./CreateTeamForm";

export default async function Page() {
  return (
    <div className="container font-barlow">
      <h1 className="mb-6 text-3xl font-teko font-medium">
        Create Sports Team
      </h1>
      <CreateTeamForm />
    </div>
  );
}
