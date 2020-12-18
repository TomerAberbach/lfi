import { curry } from './curry.js'

export const partitions = curry(function* (array) {
  if (array.length === 0) {
    yield []
    return
  }

  for (let i = 0; i < array.length; i++) {
    const start = array.slice(0, i + 1)
    const end = array.slice(i + 1)

    for (const partition of partitions(end)) {
      yield [start].concat(partition)
    }
  }
})
