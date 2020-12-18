import { curry } from './shared/curry.js'
import { toExtendedIterator } from './shared/to-extended-iterator.js'

export const windowed = curry(function* (size, iterable) {
  const iterator = toExtendedIterator(iterable[Symbol.iterator]())
  const window = []

  for (let i = 0; i < size - 1; i++) {
    if (!iterator.hasNext()) {
      return
    }

    window.push(iterator.getNext())
  }

  let start = 0
  while (iterator.hasNext()) {
    window[(start + size - 1) % size] = iterator.getNext()

    const currentWindow = []
    for (let i = 0; i < size; i++) {
      currentWindow.push(window[(start + i) % size])
    }

    yield currentWindow
    start = (start + 1) % size
  }
})
