import Student from "./Student";

interface StudentData {
  id: string;
  name: string;
  year: number | null;
  image: string | null;
}

interface LoadStudentsProps {
  students: StudentData[];
}

const LoadStudents = ({ students }: LoadStudentsProps) => {
  return (
    <div>
      {students.length === 0 ? (
        <p className="text-center p-4">
          No students found for the selected year.
        </p>
      ) : (
        students.map((student) => (
          <Student
            key={student.id}
            id={student.id}
            name={student.name}
            year={student.year as number}
            image={student.image as string}
          />
        ))
      )}
    </div>
  );
};

export default LoadStudents;
