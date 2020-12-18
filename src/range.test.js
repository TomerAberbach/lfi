import { fc, testProp } from 'ava-fast-check'
import { rangeTo, rangeUntil } from './range.js'
import test from 'ava'

const reasonableIntegerArb = () => fc.integer().filter(n => Math.abs(n) < 100)

const stepIntegerArb = () =>
  reasonableIntegerArb()
    .filter(n => n !== 0)
    .map(Math.abs)

testProp(
  `rangeUntil iterates from the given start (inclusive) to the given end (exclusive)`,
  [reasonableIntegerArb(), reasonableIntegerArb()],
  (t, start, end) => {
    const step = start < end ? 1 : -1

    t.plan(Math.abs(end - start))

    for (const value of rangeUntil(start, end)) {
      t.is(value, start)
      start += step
    }
  }
)

test(`rangeUntil concrete example`, t => {
  t.deepEqual([...rangeUntil(0, 5)], [0, 1, 2, 3, 4])
})

testProp(
  `rangeUntil's step function returns a new rangeUntil iterable that iterates with the given step`,
  [reasonableIntegerArb(), reasonableIntegerArb(), stepIntegerArb()],
  (t, start, end, step) => {
    const actualStep = step * (start < end ? 1 : -1)

    t.plan(Math.ceil(Math.abs(end - start) / step))

    for (const value of rangeUntil(start, end).step(step)) {
      t.is(value, start)
      start += actualStep
    }
  }
)

test(`rangeUntil step concrete example`, t => {
  t.deepEqual([...rangeUntil(0, 10).step(2)], [0, 2, 4, 6, 8])
})

testProp(
  `rangeTo iterates from the given start (inclusive) to the given end (inclusive)`,
  [reasonableIntegerArb(), reasonableIntegerArb()],
  (t, start, end) => {
    const step = start < end ? 1 : -1

    t.plan(Math.abs(end - start) + 1)

    for (const value of rangeTo(start, end)) {
      t.is(value, start)
      start += step
    }
  }
)

test(`rangeTo concrete example`, t => {
  t.deepEqual([...rangeTo(0, 5)], [0, 1, 2, 3, 4, 5])
})

testProp(
  `rangeTo's step function returns a new rangeTo iterable that iterates with the given step`,
  [reasonableIntegerArb(), reasonableIntegerArb(), stepIntegerArb()],
  (t, start, end, step) => {
    const actualStep = step * (start < end ? 1 : -1)

    t.plan(Math.floor(Math.abs(end - start) / step) + 1)

    for (const value of rangeTo(start, end).step(step)) {
      t.is(value, start)
      start += actualStep
    }
  }
)

test(`rangeTo step concrete example`, t => {
  t.deepEqual([...rangeTo(0, 10).step(2)], [0, 2, 4, 6, 8, 10])
})
