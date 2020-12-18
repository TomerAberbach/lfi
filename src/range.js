import { curry } from './curry.js'

export const rangeUntil = curry((start, end) => {
  function* iterate(step) {
    if (start < end) {
      for (let i = start; i < end; i += step) {
        yield i
      }
    } else {
      for (let i = start; i > end; i -= step) {
        yield i
      }
    }
  }

  const iterable = iterate(1)
  iterable.step = step => iterate(Math.abs(step))

  return iterable
})

export const rangeTo = curry((start, end) =>
  rangeUntil(start, end + (start < end ? 1 : -1))
)
