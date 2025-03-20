import SemesterSelector from "@/app/components/SemesterSelector";
import LoadStudents from "@/app/components/LoadStudents";
import { getStudents } from "@/lib/student";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ semester?: string }>;
}) => {
  let { semester } = await searchParams;
  if (semester == undefined) {
    semester = "all";
  }
  const students = await getStudents();

  const filteredStudents =
    semester === "all"
      ? students
      : students.filter(
          (student) => student.semester === Number.parseInt(semester as string)
        );

  return (
    <div className="pagemargin">
      <SemesterSelector selectedSemester={semester as string} />
      <LoadStudents students={filteredStudents} />
    </div>
  );
};

export default Page;
