/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { fc } from 'ava-fast-check'
import { rangeTo, rangeUntil } from '../src/range.js'
import { test, testProp } from './helpers/macros.js'
import {
  nonPositiveIntegerArb,
  nonSafeIntegerDoubleArb
} from './helpers/arbs.js'

const reasonableIntegerArb = fc.integer({ min: -100, max: 100 })
const stepIntegerArb = fc.integer({ min: 1, max: 100 })

const ascendingIntervalArb = fc
  .tuple(reasonableIntegerArb, reasonableIntegerArb)
  .map(([a, b]) => (a < b ? [a, b] : [b, a]))
const descendingIntervalArb = fc
  .tuple(reasonableIntegerArb, reasonableIntegerArb)
  .map(([a, b]) => (a > b ? [a, b] : [b, a]))

testProp(
  `rangeUntil returns an iterable`,
  [reasonableIntegerArb, reasonableIntegerArb],
  (t, start, end) => {
    const range = rangeUntil(start, end)

    t.iterable(range)
  }
)

testProp(
  `rangeUntil throws for a non-integer start`,
  [nonSafeIntegerDoubleArb, reasonableIntegerArb],
  (t, start, end) => {
    t.throws(() => rangeUntil(start, end), {
      message: `\`start\` must be an integer: ${start}`,
      instanceOf: Error
    })
  }
)

testProp(
  `rangeUntil throws for a non-integer end`,
  [reasonableIntegerArb, nonSafeIntegerDoubleArb],
  (t, start, end) => {
    t.throws(() => rangeUntil(start, end), {
      message: `\`end\` must be an integer: ${end}`,
      instanceOf: Error
    })
  }
)

testProp(
  `rangeUntil returns an iterable that iterates from the given start (inclusive) to the given end (exclusive) for start <= end`,
  [ascendingIntervalArb],
  (t, [start, end]) => {
    t.plan(end - start)

    for (const value of rangeUntil(start, end)) {
      t.is(value, start)
      start++
    }
  }
)

testProp(
  `rangeUntil returns an iterable that iterates from the given start (inclusive) to the given end (exclusive) for start >= end`,
  [descendingIntervalArb],
  (t, [start, end]) => {
    t.plan(start - end)

    for (const value of rangeUntil(start, end)) {
      t.is(value, start)
      start--
    }
  }
)

test(`rangeUntil concrete example`, t => {
  const values = [0, 1, 2, 3, 4]

  const range = rangeUntil(0, 5)

  t.deepEqual([...range], values)
})

testProp(
  `rangeUntil's step function returns an iterable`,
  [reasonableIntegerArb, reasonableIntegerArb, stepIntegerArb],
  (t, start, end, step) => {
    const range = rangeUntil(start, end).step(step)

    t.iterable(range)
  }
)

testProp(
  `rangeUntil's step function throws for a non-integer step`,
  [reasonableIntegerArb, reasonableIntegerArb, nonSafeIntegerDoubleArb],
  (t, start, end, step) => {
    const range = rangeUntil(start, end)

    t.throws(() => range.step(step), {
      message: `\`step\` must be an integer: ${step}`,
      instanceOf: Error
    })
  }
)

testProp(
  `rangeUntil's step function throws for a non-positive integer step`,
  [reasonableIntegerArb, reasonableIntegerArb, nonPositiveIntegerArb],
  (t, start, end, step) => {
    const range = rangeUntil(start, end)

    t.throws(() => range.step(step), {
      message: `\`step\` must be a positive integer: ${step}`,
      instanceOf: Error
    })
  }
)

testProp(
  `rangeUntil's step function returns a new rangeUntil iterable that iterates with the given step for start <= end`,
  [ascendingIntervalArb, stepIntegerArb],
  (t, [start, end], step) => {
    t.plan(Math.ceil((end - start) / step))

    for (const value of rangeUntil(start, end).step(step)) {
      t.is(value, start)
      start += step
    }
  }
)

testProp(
  `rangeUntil's step function returns a new rangeUntil iterable that iterates with the given step for start >= end`,
  [descendingIntervalArb, stepIntegerArb],
  (t, [start, end], step) => {
    t.plan(Math.ceil((start - end) / step))

    for (const value of rangeUntil(start, end).step(step)) {
      t.is(value, start)
      start -= step
    }
  }
)

test(`rangeUntil step concrete example`, t => {
  const values = [0, 2, 4, 6, 8]

  const range = rangeUntil(0, 10).step(2)

  t.deepEqual([...range], values)
})

testProp(
  `rangeTo returns an iterable`,
  [reasonableIntegerArb, reasonableIntegerArb],
  (t, start, end) => {
    const range = rangeTo(start, end)

    t.iterable(range)
  }
)

testProp(
  `rangeTo throws for a non-integer start`,
  [nonSafeIntegerDoubleArb, reasonableIntegerArb],
  (t, start, end) => {
    t.throws(() => rangeTo(start, end), {
      message: `\`start\` must be an integer: ${start}`,
      instanceOf: Error
    })
  }
)

testProp(
  `rangeTo throws for a non-integer end`,
  [reasonableIntegerArb, nonSafeIntegerDoubleArb],
  (t, start, end) => {
    t.throws(() => rangeTo(start, end), {
      message: `\`end\` must be an integer: ${end}`,
      instanceOf: Error
    })
  }
)

testProp(
  `rangeTo returns an iterable that iterates from the given start (inclusive) to the given end (inclusive) for start <= end`,
  [ascendingIntervalArb],
  (t, [start, end]) => {
    t.plan(end - start + 1)

    for (const value of rangeTo(start, end)) {
      t.is(value, start)
      start++
    }
  }
)

testProp(
  `rangeTo returns an iterable that iterates from the given start (inclusive) to the given end (inclusive) for start >= end`,
  [descendingIntervalArb],
  (t, [start, end]) => {
    t.plan(start - end + 1)

    for (const value of rangeTo(start, end)) {
      t.is(value, start)
      start--
    }
  }
)

test(`rangeTo concrete example`, t => {
  const values = [0, 1, 2, 3, 4, 5]

  const range = rangeTo(0, 5)

  t.deepEqual([...range], values)
})

testProp(
  `rangeTo's step function returns an iterable`,
  [reasonableIntegerArb, reasonableIntegerArb, stepIntegerArb],
  (t, start, end, step) => {
    const range = rangeTo(start, end).step(step)

    t.iterable(range)
  }
)

testProp(
  `rangeTo's step function throws for a non-integer step`,
  [reasonableIntegerArb, reasonableIntegerArb, nonSafeIntegerDoubleArb],
  (t, start, end, step) => {
    const range = rangeTo(start, end)

    t.throws(() => range.step(step), {
      message: `\`step\` must be an integer: ${step}`,
      instanceOf: Error
    })
  }
)

testProp(
  `rangeTo's step function throws for a non-positive integer step`,
  [reasonableIntegerArb, reasonableIntegerArb, nonPositiveIntegerArb],
  (t, start, end, step) => {
    const range = rangeTo(start, end)

    t.throws(() => range.step(step), {
      message: `\`step\` must be a positive integer: ${step}`,
      instanceOf: Error
    })
  }
)

testProp(
  `rangeTo's step function returns a new rangeTo iterable that iterates with the given step for start <= end`,
  [ascendingIntervalArb, stepIntegerArb],
  (t, [start, end], step) => {
    t.plan(Math.floor((end - start) / step) + 1)

    for (const value of rangeTo(start, end).step(step)) {
      t.is(value, start)
      start += step
    }
  }
)

testProp(
  `rangeTo's step function returns a new rangeTo iterable that iterates with the given step for start >= end`,
  [descendingIntervalArb, stepIntegerArb],
  (t, [start, end], step) => {
    t.plan(Math.floor((start - end) / step) + 1)

    for (const value of rangeTo(start, end).step(step)) {
      t.is(value, start)
      start -= step
    }
  }
)

test(`rangeTo step concrete example`, t => {
  const values = [0, 2, 4, 6, 8, 10]

  const range = rangeTo(0, 10).step(2)

  t.deepEqual([...range], values)
})
