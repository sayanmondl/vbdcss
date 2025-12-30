import { db } from "@/db";
import { assessments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  Edit,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudentScores } from "@/lib/assessments";
import ExportPDF from "@/app/components/ExportPDFClientWrapper";
import EditableScoresTable from "@/app/components/EditableScoresTable";

export default async function AssessmentDetailsPage({
  params,
}: {
  params: Promise<{ assessmentId: string }>;
}) {
  const { assessmentId } = await params;

  const assessmentDetails = await db
    .select()
    .from(assessments)
    .where(eq(assessments.id, assessmentId));

  if (!assessmentDetails.length) {
    notFound();
  }

  const assessment = assessmentDetails[0];
  const studentScores = await getStudentScores(assessmentId);

  return (
    <div className="container mx-auto py-8 space-y-8 font-barlow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/faculty-dashboard/assessments">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Assessments
            </Button>
          </Link>
        </div>
        <div className="flex gap-2">
          <ExportPDF
            semester={assessment.semester}
            subject={assessment.subject as string}
            totalMarks={assessment.total}
            examDate={assessment.createdAt as Date}
            studentScores={studentScores}
          />
          <Link href={`/faculty-dashboard/assessments/${assessmentId}/edit`}>
            <Button size="sm" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Assessment
            </Button>
          </Link>
        </div>
      </div>

      <Card className="shadow-none border rounded-lg bg-blue-50">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-slate-900 mb-6">
                {assessment.name}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                {assessment.subject && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">{assessment.subject}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {assessment.semester}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Created {assessment.createdAt?.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">
                {assessment.total} pts
              </div>
              <div className="text-sm text-slate-600">Total Marks</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5" />
            Student Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          {studentScores.length > 0 ? (
            <EditableScoresTable
              studentScores={studentScores}
              assessmentId={assessmentId}
              totalMarks={assessment.total}
            />
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No submissions yet
              </h3>
              <p className="text-slate-600">
                Students haven't submitted their assessments yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
