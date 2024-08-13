export default function getListStudentIds(lista) {
  if (Array.isArray(lista)) {
    return lista.map((ids) => ids.id);
  }
  return [];
}
