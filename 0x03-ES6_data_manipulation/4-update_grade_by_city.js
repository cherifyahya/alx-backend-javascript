export default function updateStudentGradeByCity(listStudents, city, newGrades) {
  const array = [];
  if (Array.isArray(listStudents) && typeof city === 'string' && Array.isArray(newGrades)) {
    const filtrestudents = listStudents.filter(
      (studentelement) => studentelement.location === city,
    );
    // eslint-disable-next-line array-callback-return
    filtrestudents.map((student) => {
      const matchegrades = newGrades.find((studentgrade) => student.id === studentgrade.studentId);
      if (matchegrades) {
        array.push({ ...student, grade: matchegrades.grade });
      } else {
        array.push({ ...student, grade: 'N/A' });
      }
    });
  }
  return array;
}
