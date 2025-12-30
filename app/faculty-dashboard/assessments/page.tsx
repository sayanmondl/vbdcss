import AssessmentCard from "@/app/components/faculty/AssesmentCard";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { assessments } from "@/db/schema";
import { checkIfFaculty } from "@/lib/userauth";
import { eq } from "drizzle-orm";
import { FilePlus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function FacultyDashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const isFaculty = await checkIfFaculty();
  if (!isFaculty) {
    redirect("/");
  }

  const userId = session.user?.id as string;

  const allAssessments = await db
    .select({
      id: assessments.id,
      name: assessments.name,
      subject: assessments.subject,
      course: assessments.course,
      semester: assessments.semester,
      createdAt: assessments.createdAt,
    })
    .from(assessments)
    .where(eq(assessments.facultyId, userId));

  return (
    <div className="container mx-auto p-4 font-barlow">
      <h1 className="text-4xl mb-4 font-teko">Assessments</h1>
      <Link href="/faculty-dashboard/assessments/create-assessment">
        <Button className="bg-blue-dark">
          <FilePlus />
          Create Assessment
        </Button>
      </Link>
      <div className="h-10"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allAssessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            id={assessment.id}
            name={assessment.name}
            subject={assessment.subject}
            course={assessment.course}
            semester={assessment.semester}
            createdAt={assessment.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
