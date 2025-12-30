import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AssessmentCardProps } from "@/types";
import Link from "next/link";
import { BookOpen, Calendar, GraduationCap, ChevronRight } from "lucide-react";

const AssessmentCard = ({
  id,
  name,
  subject,
  course,
  semester,
  createdAt,
}: AssessmentCardProps) => {
  return (
    <Card className="group relative overflow-hidden rounded-lg hover:shadow-lg shadow-none border transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Link href={`/faculty-dashboard/assessments/${id}`} className="block">
        <CardHeader className="relative pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2 leading-tight">
                {name}
              </CardTitle>
              {subject && (
                <div className="flex items-center gap-2 mt-3">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <p className="text-sm font-medium text-slate-600">
                    {subject}
                  </p>
                </div>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-slate-700">
                Semester
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-semibold px-3 py-1"
            >
              {semester}
            </Badge>
          </div>

          {createdAt && (
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">
                Created{" "}
                {new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </CardContent>

        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-400/10 to-orange-400/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-300" />
      </Link>
    </Card>
  );
};

export default AssessmentCard;
