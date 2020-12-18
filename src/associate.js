import { curry } from './curry.js'

const configurations = {
  map: () => ({
    map: new Map(),
    put: (map, k, v) => map.set(k, v)
  }),
  object: () => ({
    map: Object.create(null),
    put: (object, k, v) => (object[k] = v)
  })
}

export const associateTo = curry((fn, { map, put }, iterable) => {
  for (const value of iterable) {
    const [k, v] = fn(value)
    put(map, k, v)
  }

  return map
})

export const associate = curry((fn, iterable) =>
  associateTo(fn, configurations.map(), iterable)
)

export const associateToObject = curry((fn, iterable) =>
  associateTo(fn, configurations.object(), iterable)
)

export const associateByTo = curry((fn, { set, map }, iterable) =>
  associateTo(value => [fn(value), value], { set, map }, iterable)
)

export const associateBy = curry((fn, iterable) =>
  associateByTo(fn, configurations.map(), iterable)
)

export const associateByToObject = curry((fn, iterable) =>
  associateByTo(fn, configurations.object(), iterable)
)

export const associateWithTo = curry((fn, { map, set }, iterable) =>
  associateTo(value => [value, fn(value)], { map, set }, iterable)
)

export const associateWith = curry((fn, iterable) =>
  associateWithTo(fn, configurations.map(), iterable)
)

export const associateWithToObject = curry((fn, iterable) =>
  associateWithTo(fn, configurations.object(), iterable)
)
