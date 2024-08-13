export default function cleanSet(set, startString) {
  const cleanSet = [];
  if (!startString) {
    return '';
  }
  if (set instanceof Set && typeof startString === 'string') {
    set.forEach((element) => {
      if (typeof element === 'string' && element.startsWith(startString)) {
        const sub = element.substring(startString.length);
        if (sub) {
          cleanSet.push(sub);
        }
      }
    });
  }
  return cleanSet.join('-');
}
