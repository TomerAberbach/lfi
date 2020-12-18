import { toExtendedIterator } from './shared/to-extended-iterator.js'

export function* zip(...iterables) {
  const iterators = iterables.map(iterable =>
    toExtendedIterator(iterable[Symbol.iterator]())
  )

  while (iterators.every(iterator => iterator.hasNext())) {
    yield iterators.map(iterator => iterator.getNext())
  }
}
