import LoadStudents from "@/app/components/LoadStudents";
import YearSelector from "@/app/components/YearSelector";
import { getStudents } from "@/lib/student";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) => {
  let { year } = await searchParams;
  if (year == undefined) {
    year = "all";
  }
  const students = await getStudents();

  const years = Array.from(
    new Set(students.map((s) => s.year).filter((y) => y !== null))
  ).sort((a, b) => a! - b!) as number[];

  const filteredStudents =
    year === "all"
      ? students
      : students.filter(
          (student) => student.year === Number.parseInt(year as string)
        );

  return (
    <div className="pagemargin">
      <YearSelector selectedYear={year as string} years={years} />
      <LoadStudents students={filteredStudents} />
    </div>
  );
};

export default Page;
