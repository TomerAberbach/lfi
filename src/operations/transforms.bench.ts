import { bench, describe } from 'vitest'
import { toArray } from './collections.js'
import { pipe } from './core.js'
import { reduce } from './reducers.js'
import { flatMap } from './transforms.js'

const array = Array.from({ length: 500_000 }, () => Math.random())

describe(`flatMap`, () => {
  bench(`native`, () => {
    array.flatMap(value => [value, value * 2, value * 3])
  })

  bench(`lfi`, () => {
    pipe(
      array,
      flatMap(value => [value, value * 2, value * 3]),
      reduce(toArray()),
    )
  })
})
