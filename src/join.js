import { curry } from './shared/curry.js'
import { toExtendedIterator } from './shared/to-extended-iterator.js'

export const join = curry((separator, iterable) => {
  const iterator = toExtendedIterator(iterable[Symbol.iterator]())

  if (!iterator.hasNext()) {
    return ``
  }

  let acc = iterator.getNext()

  while (iterator.hasNext()) {
    acc += iterator.getNext()
  }

  return acc
})
