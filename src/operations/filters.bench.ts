import { bench, describe } from 'vitest'
import { toArray } from './collections.js'
import { pipe } from './core.js'
import { filter, filterMap } from './filters.js'
import { reduce } from './reducers.js'

const array = Array.from({ length: 500_000 }, () => Math.random())

describe(`filter`, () => {
  bench(`native`, () => {
    array.filter(value => value > 0.5)
  })

  bench(`lfi`, () => {
    pipe(
      array,
      filter(value => value > 0.5),
      reduce(toArray()),
    )
  })
})

bench(`filterMap`, () => {
  pipe(
    array,
    filterMap(value => (value > 0.5 ? value * value : null)),
    reduce(toArray()),
  )
})
