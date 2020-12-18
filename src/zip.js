import { Iterator } from './shared/iterator.js'

export function* zip(...iterables) {
  const iterators = iterables.map(Iterator.fromIterable)

  while (iterators.every(iterator => iterator.hasNext())) {
    yield iterators.map(iterator => iterator.getNext())
  }
}
