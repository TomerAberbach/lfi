import { chunked } from './chunked.js'
import { fc, testProp } from 'ava-fast-check'

testProp(
  `chunked returns contains every value in the given iterable in the proper order`,
  [fc.array(fc.anything()), fc.nat().filter(n => n > 0)],
  (t, array, n) => {
    t.plan(array.length)

    let i = 0
    for (const chunk of chunked(n, array)) {
      for (const value of chunk) {
        t.is(value, array[i])
        i++
      }
    }
  }
)

testProp(
  `chunked returns chunks of the given size`,
  [
    fc.array(fc.anything()).filter(array => array.length > 0),
    fc.nat().filter(n => n > 0)
  ],
  (t, array, n) => {
    const chunks = [...chunked(n, array)]

    t.plan(chunks.length)
    for (let i = 0; i < chunks.length - 1; i++) {
      t.is(chunks[i].length, n)
    }

    let last = array.length % n
    last = last === 0 ? n : last
    t.is(chunks[chunks.length - 1].length, last)
  }
)
