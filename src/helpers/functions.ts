// eslint-disable-next-line import/prefer-default-export
export function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
export function nextChar(c: String) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}
