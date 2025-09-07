import { bench, describe } from 'vitest'
import { asAsync, compose, pipe } from './core.js'

const increment = (value: unknown) => Number(value) + 1

describe.each([0, 1, 2, 3, 4, 5, 6, 7, 8])(`%s function(s)`, count => {
  const fns = Array.from({ length: count }, () => increment)

  bench(`pipe`, () => {
    pipe(1, ...fns)
  })

  bench(`compose and pipe`, () => {
    compose(...fns)(1)
  })

  const composed = compose(...fns)
  bench(`compose before, then pipe`, () => {
    composed(1)
  })
})

describe(`iteration`, () => {
  const array = Array.from({ length: 10_000 }, () => Math.random())

  bench(`native`, () => {
    // eslint-disable-next-line no-empty
    for (const _ of array) {
    }
  })

  bench(`asAsync`, async () => {
    // eslint-disable-next-line no-empty
    for await (const _ of asAsync(array)) {
    }
  })
})
