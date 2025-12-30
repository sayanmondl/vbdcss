"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateStudentScore } from "@/lib/assessments";
import { StudentScoreProps } from "@/types";

type EditableScoresTableProps = {
  studentScores: StudentScoreProps[];
  assessmentId: string;
  totalMarks: number;
};

export default function EditableScoresTable({
  studentScores,
  assessmentId,
  totalMarks,
}: EditableScoresTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [scores, setScores] = useState(studentScores);
  const { toast } = useToast();

  const startEditing = (studentId: string, currentScore: string) => {
    setEditingId(studentId);
    setEditValue(currentScore);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue("");
  };

  const saveScore = async (studentId: string) => {
    const numericValue = Number.parseFloat(editValue);

    if (isNaN(numericValue)) {
      toast({
        title: "Invalid Score",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    if (numericValue < 0 || numericValue > totalMarks) {
      toast({
        title: "Invalid Score",
        description: `Score must be between 0 and ${totalMarks}`,
        variant: "destructive",
      });
      return;
    }

    try {
      await updateStudentScore(assessmentId, studentId, editValue);

      setScores(
        scores.map((s) =>
          s.studentId === studentId ? { ...s, obtained: editValue } : s
        )
      );

      toast({
        title: "Score Updated",
        description: "Student score has been updated successfully",
      });

      setEditingId(null);
      setEditValue("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update score. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 rounded-lg font-medium text-sm text-slate-700">
        <div className="col-span-4">Student</div>
        <div className="col-span-2 text-center">Total</div>
        <div className="col-span-2 text-center">Obtained</div>
        <div className="col-span-2 text-center">Percentage</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>

      {scores.map((student) => (
        <div
          key={student.studentId}
          className="grid grid-cols-12 gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <div className="col-span-4">
            <div className="flex items-center gap-3">
              <img
                src={student.studentImage || "/default-avatar.png"}
                alt={student.studentName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium text-slate-900">
                  {student.studentName}
                </div>
                <div className="text-sm text-slate-500">
                  {student.studentEmail}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 text-center flex items-center justify-center">
            <div className="font-bold text-slate-900">{totalMarks}</div>
          </div>
          <div className="col-span-2 text-center flex items-center justify-center">
            {editingId === student.studentId ? (
              <Input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-20 text-center"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveScore(student.studentId);
                  } else if (e.key === "Escape") {
                    cancelEditing();
                  }
                }}
              />
            ) : (
              <div className="font-bold text-slate-900">{student.obtained}</div>
            )}
          </div>
          <div className="col-span-2 text-center flex items-center justify-center">
            <div className="font-bold text-slate-900">
              {(
                (Number.parseFloat(student.obtained as string) / totalMarks) *
                100
              ).toFixed()}
              %
            </div>
          </div>
          <div className="col-span-2 text-center flex items-center justify-center gap-2">
            {editingId === student.studentId ? (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => saveScore(student.studentId)}
                  className="h-8 w-8 p-0"
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={cancelEditing}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4 text-red-600" />
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  startEditing(student.studentId, student.obtained as string)
                }
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
