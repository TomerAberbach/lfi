import { curry } from './curry.js'

export const groupTo = curry((fn, map, iterable) => {
  for (const value of iterable) {
    const [k, v] = fn(value)
    let array = map.get(k)

    if (array == null) {
      map.set(k, (array = []))
    }

    array.push(v)
  }

  return map
})

export const group = curry((fn, iterable) => groupTo(fn, new Map(), iterable))

export const groupByTo = curry((fn, map, iterable) =>
  groupTo(value => [fn(value), value], map, iterable)
)
export const groupBy = curry((fn, iterable) =>
  groupByTo(fn, new Map(), iterable)
)

export const groupWithTo = curry((fn, map, iterable) =>
  groupTo(value => [value, fn(value)], map, iterable)
)

export const groupWith = curry((fn, iterable) =>
  groupWithTo(fn, new Map(), iterable)
)
