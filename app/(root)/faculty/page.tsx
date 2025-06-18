import ProfessorCard from "@/app/components/ProfessorCard";
import { auth } from "@/auth";
import { getProfessors } from "@/lib/user";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const professors = await getProfessors();

  return (
    <div className="pagemargin font-barlow">
      <div className="space-y-4">
        <h1 className="barlow-heading-thin mb-2">Professors:</h1>

        {professors.map((professor) => (
          <ProfessorCard key={professor.id} professor={professor} />
        ))}
      </div>
    </div>
  );
};

export default Page;
