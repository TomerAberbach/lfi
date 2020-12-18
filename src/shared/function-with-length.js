export const functionWithLength = (fn, length) => {
  Object.defineProperty(fn, `length`, {
    enumerable: false,
    writable: false,
    value: length
  })

  return fn
}
