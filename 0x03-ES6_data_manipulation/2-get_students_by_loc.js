export default function getStudentsByLocation(listStudents, city) {
  if (Array.isArray(listStudents)) {
    const list = listStudents.filter((student) => student.location === city);
    return list;
  }
  return [];
}
