import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreateAssessmentForm } from "./CreateAssessmentForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { checkIfFaculty } from "@/lib/userauth";

export default async function CreateAssessmentPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const isFaculty = await checkIfFaculty();
  if (!isFaculty) {
    redirect("/");
  }

  return (
    <div className="mx-auto py-8 font-barlow">
      <div className="mb-8">
        <Link href="/faculty-dashboard/assessments">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Assessments
          </Button>
        </Link>
        <h1 className="text-3xl font-medium font-teko">
          Create New Assessment
        </h1>
        <p className="text-muted-foreground mt-2">
          Create an assessment and automatically enroll all students from the
          selected semester
        </p>
      </div>

      <CreateAssessmentForm />
    </div>
  );
}
