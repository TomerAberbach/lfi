import { curry } from './shared/curry.js'

export const associateTo = curry((fn, map, iterable) => {
  for (const value of iterable) {
    const [k, v] = fn(value)
    map.set(k, v)
  }

  return map
})

export const associate = curry((fn, iterable) =>
  associateTo(fn, new Map(), iterable)
)

export const associateByTo = curry((fn, map, iterable) =>
  associateTo(value => [fn(value), value], map, iterable)
)

export const associateBy = curry((fn, iterable) =>
  associateByTo(fn, new Map(), iterable)
)

export const associateWithTo = curry((fn, map, iterable) =>
  associateTo(value => [value, fn(value)], map, iterable)
)

export const associateWith = curry((fn, iterable) =>
  associateWithTo(fn, new Map(), iterable)
)
