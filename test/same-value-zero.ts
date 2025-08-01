export const sameValueZero = (x: unknown, y: unknown): boolean =>
  x === y || (Number.isNaN(x) && Number.isNaN(y))
