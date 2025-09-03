import { bench, describe } from 'vitest'
import { pipe } from './core'
import { reduce } from './reducers'
import { toArray } from './collections'
import { flatMap } from './transforms'

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
