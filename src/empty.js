const result = Object.freeze({ done: true })

const iterator = Object.freeze({
  next: () => result
})

export const empty = Object.freeze({ [Symbol.iterator]: () => iterator })
