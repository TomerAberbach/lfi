import { pipe, map, reduce, toArray } from '../dist/index.min.js'

console.log(
  pipe(
    [1, 2, 3],
    map(x => x * 2),
    reduce(toArray()),
  ),
)
