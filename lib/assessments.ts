"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { assessments, scores, users } from "@/db/schema";
import { Assessment } from "@/types";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getStudentScores(assessmentId: string) {
  const studentScores = await db
    .select({
      studentId: scores.studentId,
      studentName: users.name,
      studentImage: users.image,
      studentEmail: users.email,
      obtained: scores.obtained,
    })
    .from(scores)
    .innerJoin(users, eq(scores.studentId, users.id))
    .where(eq(scores.assessmentId, assessmentId));

  return studentScores;
}

export async function updateStudentScore(
  assessmentId: string,
  studentId: string,
  obtained: string
) {
  try {
    await db
      .update(scores)
      .set({ obtained })
      .where(
        and(
          eq(scores.assessmentId, assessmentId),
          eq(scores.studentId, studentId)
        )
      );

    revalidatePath(`/faculty-dashboard/assessments/${assessmentId}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating student score:", error);
    throw new Error("Failed to update student score");
  }
}

export async function createAssessment({
  name,
  subject,
  semester,
  course,
  total,
}: {
  name: string;
  subject: string | null;
  semester: "_" | "I" | "II" | "III" | "IV" | "V" | "VI" | "VII" | "VIII";
  course: "B.Sc." | "M.Sc." | "_";
  total: number;
}) {
  const session = await auth();
  const facultyId = session?.user?.id as string;

  try {
    const [newAssessment] = await db
      .insert(assessments)
      .values({
        name: name,
        facultyId: facultyId,
        subject: subject,
        course: course,
        semester: semester,
        total: total,
      })
      .returning();

    const semesterStudents = await db
      .select()
      .from(users)
      .where(eq(users.semester, semester));

    if (semesterStudents.length > 0) {
      await db.insert(scores).values(
        semesterStudents.map((student) => ({
          assessmentId: newAssessment.id,
          studentId: student.id,
          obtained: null,
        }))
      );
    }

    revalidatePath("/faculty-dashboard/assessments");

    return {
      success: true,
      assessmentId: newAssessment.id,
      studentCount: semesterStudents.length,
    };
  } catch (error) {
    console.error("Error creating assessment:", error);
    return {
      success: false,
      error: "Failed to create assessment. Please try again.",
    };
  }
}
