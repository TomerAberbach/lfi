import { bench, describe } from 'vitest'
import { filter, map, pipe, reduce, toArray } from './index.js'

describe.each(
  [
    10, 50, 100, 500, 1000, 5000, 10_000, 50_000, 100_000, 500_000, 1_000_000,
    5_000_000, 10_000_000,
  ].map(count => [count.toLocaleString(), count] as const),
)(`%s items`, (_, count) => {
  const array = Array.from({ length: count }, () => ({
    value1: Math.random(),
    value2: Math.random(),
  }))

  bench(`native map and filter loop`, () => {
    const newArray: number[] = []
    for (const { value1, value2 } of array) {
      const newValue = value1 * value2
      if (newValue > 0.5) {
        newArray.push(newValue)
      }
    }
  })

  bench(`native map and filter`, () => {
    array
      .map(({ value1, value2 }) => value1 * value2)
      .filter(value => value > 0.5)
  })

  bench(`lfi map and filter`, () => {
    pipe(
      array,
      map(({ value1, value2 }) => value1 * value2),
      filter(value => value > 0.5),
      reduce(toArray()),
    )
  })
})
