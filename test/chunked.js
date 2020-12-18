import { chunked } from '../src/index.js'
import { fc, testProp } from 'ava-fast-check'
import { iterableArb, testReturnsIterable } from './helpers.js'
import test from 'ava'

const positiveNat = () => fc.nat().filter(n => n > 0)

testReturnsIterable(chunked, [positiveNat(), iterableArb()])

testProp(
  `chunked returns an iterable containing the given iterable's value in their iteration order`,
  [positiveNat(), iterableArb()],
  (t, n, iterable) => {
    const array = [...iterable]

    const flattenedChunks = [...chunked(n, iterable)].flat()

    t.deepEqual(flattenedChunks, array)
  }
)

testProp(
  `chunked returns an empty iterable for an empty iterable`,
  [positiveNat(), iterableArb({ minLength: 0, maxLength: 0 })],
  (t, n, iterable) => {
    const count = [...chunked(n, iterable)].length

    t.is(count, 0)
  }
)

testProp(
  `chunked returns an iterable containing chunks of the given size except for the last chunk`,
  [positiveNat(), iterableArb({ minLength: 1 })],
  (t, n, iterable) => {
    const chunksExceptForLast = [...chunked(n, iterable)].slice(0, -1)

    t.plan(chunksExceptForLast.length)
    for (const chunk of chunksExceptForLast) {
      t.is(chunk.length, n)
    }
  }
)

test(`chunked concrete example`, t => {
  const values = [`a`, `b`, `c`, `d`, `e`, `f`, `g`]

  const chunks = [...chunked(3, values)]

  t.deepEqual(chunks, [[`a`, `b`, `c`], [`d`, `e`, `f`], [`g`]])
})
