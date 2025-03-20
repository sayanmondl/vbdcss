import Student from "./Student"

interface StudentData {
  key: number
  name: string
  semester: number
  imageUrl: string
}

interface LoadStudentsProps {
  students: StudentData[]
}

const LoadStudents = ({ students }: LoadStudentsProps) => {
  return (
    <div>
      {students.length === 0 ? (
        <p className="text-center p-4">No students found for the selected semester.</p>
      ) : (
        students.map((student) => (
          <Student key={student.key} name={student.name} sem={student.semester} avatarUrl={student.imageUrl} />
        ))
      )}
    </div>
  )
}

export default LoadStudents
