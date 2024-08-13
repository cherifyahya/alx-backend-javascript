export default function getStudentIdsSum(listStudents) {
  if (Array.isArray(listStudents)) {
    return listStudents.reduce((total, item) => item.id + total, 0);
  }
  return [];
}
