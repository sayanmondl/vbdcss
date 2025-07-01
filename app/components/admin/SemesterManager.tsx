"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SemesterTransition {
  from: string;
  to: string;
  course: string;
}

interface SemesterManagerProps {
  semesterUpdate: (semester: string) => Promise<void>;
  semesterData?: SemesterTransition[];
}

export default function SemesterManager({
  semesterUpdate,
  semesterData = [
    { from: "Semester I", to: "Semester II", course: "B.Sc." },
    { from: "Semester II", to: "Semester III", course: "B.Sc." },
    { from: "Semester III", to: "Semester IV", course: "B.Sc." },
    { from: "Semester IV", to: "Semester V", course: "B.Sc." },
    { from: "Semester V", to: "Semester VI", course: "B.Sc." },
    { from: "Semester VI", to: "Semester VII", course: "B.Sc." },
    { from: "Semester VII", to: "Semester VIII", course: "B.Sc." },
    { from: "Semester VIII", to: "Graduated", course: "B.Sc." },
    { from: "Semester I", to: "Semester II", course: "M.Sc." },
    { from: "Semester II", to: "Semester III", course: "M.Sc." },
    { from: "Semester III", to: "Semester IV", course: "M.Sc." },
    { from: "Semester IV", to: "Graduated", course: "M.Sc." },
  ],
}: SemesterManagerProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleUpdate = async (semester: string, course: string) => {
    const key = `${semester}-${course}`;
    setLoadingStates((prev) => ({ ...prev, [key]: true }));
    setOpenDialog(null);

    try {
      await semesterUpdate(semester.split(" ")[1]);
    } catch (error) {
      console.error("Failed to update semester:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [key]: false }));
    }
  };

  const groupedData = semesterData.reduce(
    (acc, item) => {
      if (!acc[item.course]) {
        acc[item.course] = [];
      }
      acc[item.course].push(item);
      return acc;
    },
    {} as Record<string, SemesterTransition[]>
  );

  return (
    <div className="w-full mx-auto p-6 space-y-8 font-barlow">
      {Object.entries(groupedData).map(([course, transitions]) => (
        <Card key={course} className="w-full shadow-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-gray-700">
              {course}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {transitions.map((transition, index) => {
              const key = `${transition.from}-${course}`;
              const isLoading = loadingStates[key];

              return (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <span className="text-sm font-medium text-gray-700 min-w-[100px]">
                      {transition.from}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 min-w-[100px]">
                      {transition.to}
                    </span>
                  </div>
                  <AlertDialog
                    open={openDialog === key}
                    onOpenChange={(open) => setOpenDialog(open ? key : null)}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={isLoading}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 text-sm font-medium"
                      >
                        {isLoading ? "Updating..." : "Update"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="font-barlow">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Confirm Semester Update
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to update all {course} students
                          from {transition.from} to {transition.to}?
                          {transition.to === "Graduated" &&
                            " Students will be marked as inactive and graduated."}
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleUpdate(transition.from, course)}
                          className="bg-slate-800 hover:bg-slate-700"
                        >
                          Confirm Update
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
