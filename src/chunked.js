import { curry } from './curry.js'
import { toExtendedIterator } from './to-extended-iterator.js'

export const chunked = curry(function* (n, iterable) {
  const iterator = toExtendedIterator(iterable[Symbol.iterator]())

  while (iterator.hasNext()) {
    const chunk = [iterator.getNext()]

    while (chunk.length < n && iterator.hasNext()) {
      chunk.push(iterator.getNext())
    }

    yield chunk
  }
})
