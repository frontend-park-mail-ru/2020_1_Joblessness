export default (o1, o2) => {
  if (typeof o1 === 'string' || typeof o1 === 'function' ||
    typeof o1 === 'number' || o1 === null || o1 === undefined) {
    return o1 === o2;
  }
  if (typeof o2 === 'string' || typeof o2 === 'function' ||
    typeof o2 === 'number' || o2 === null || o2 === undefined) {
    return o2 === o1;
  }
  if (o1 instanceof Array) {
    return o1.toString() === o2.toString();
  }
  if (o1 === o2) {
    return true;
  }
  if (!isEqual(Object.keys(o1), Object.keys(o2))) {
    return false;
  }
  for (const o of Object.keys(o1)) {
    if (!isEqual(o1[o], o2[o])) {
      return false;
    }
  }
  return true;
};