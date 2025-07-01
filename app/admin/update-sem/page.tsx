import SemesterManager from "@/app/components/admin/SemesterManager";
import { updateSemester } from "@/lib/user";
import { revalidatePath } from "next/cache";

async function semesterUpdate(semester: string) {
  "use server";
  await updateSemester(semester);

  revalidatePath("/semester-management");
}

export default function SemesterManagementPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-teko text-blue-dark mb-2">
            Semester Management
          </h1>
          <p className="text-gray-600 font-barlow">
            Manage semester progressions for B.Sc. and M.Sc. students
          </p>
        </div>

        <SemesterManager semesterUpdate={semesterUpdate} />
      </div>
    </div>
  );
}
