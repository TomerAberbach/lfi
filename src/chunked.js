import { Iterator } from './shared/iterator.js'
import { curry } from './shared/curry.js'

export const chunked = curry(function* (n, iterable) {
  const iterator = Iterator.fromIterable(iterable)

  while (iterator.hasNext()) {
    const chunk = [iterator.getNext()]

    while (chunk.length < n && iterator.hasNext()) {
      chunk.push(iterator.getNext())
    }

    yield chunk
  }
})
