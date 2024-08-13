export default function hasValuesFromArray(set, array) {
  if (set instanceof Set) {
    for (const element of array) {
      if (!set.has(element)) {
        return false;
      }
    }
    return true;
  }
  return false;
}
