import { redirect } from "next/navigation";
import CreateTeamForm from "./CreateTeamForm";
import { checkIfAdmin } from "@/lib/userauth";

export default async function Page() {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="container font-barlow">
      <h1 className="mb-6 text-3xl font-teko font-medium">
        Create Sports Team
      </h1>
      <CreateTeamForm />
    </div>
  );
}
