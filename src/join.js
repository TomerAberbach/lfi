import { Iterator } from './shared/iterator.js'
import { curry } from './shared/curry.js'

export const join = curry((separator, iterable) => {
  const iterator = Iterator.fromIterable(iterable)

  if (!iterator.hasNext()) {
    return ``
  }

  let acc = iterator.getNext()

  while (iterator.hasNext()) {
    acc += iterator.getNext()
  }

  return acc
})
