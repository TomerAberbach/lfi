import { bench, describe } from 'vitest'
import { compose, pipe } from './core.js'

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
