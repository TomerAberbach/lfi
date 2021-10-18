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
import { chunked, chunkedAsync, chunkedConcur } from '../src/chunked.js'
import { count, countAsync, countConcur } from '../src/count.js'
import { asAsync, asConcur } from '../src/as.js'
import { flatMapConcur, flatten, flattenAsync } from '../src/flat-map.js'
import {
  last,
  lastAsync,
  lastConcur,
  take,
  takeAsync,
  takeConcur,
} from '../src/sub.js'
import { get, getAsync, getConcur } from '../src/optional.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { test, testProp } from './helpers/macros.js'
import {
  asyncIterableArb,
  concurIterableArb,
  emptyAsyncIterableArb,
  emptyConcurIterableArb,
  emptyIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
  nonPositiveIntegerArb,
  nonSafeIntegerDoubleArb,
  positiveIntegerArb,
} from './helpers/arbs.js'

testProp(
  `chunked returns an iterable`,
  [positiveIntegerArb, iterableArb],
  (t, size, iterable) => {
    const chunkedIterable = chunked(size, iterable)

    t.iterable(chunkedIterable)
  },
)

testProp(
  `chunked throws for a non-integer size`,
  [nonSafeIntegerDoubleArb, iterableArb],
  (t, size, iterable) => {
    t.throws(() => chunked(size, iterable), {
      message: `\`size\` must be an integer: ${size}`,
      instanceOf: Error,
    })
  },
)

testProp(
  `chunked throws for a non-positive integer size`,
  [nonPositiveIntegerArb, iterableArb],
  (t, size, iterable) => {
    t.throws(() => chunked(size, iterable), {
      message: `\`size\` must be a positive integer: ${size}`,
      instanceOf: Error,
    })
  },
)

testProp(
  `chunked returns an iterable containing the given iterable's values in iteration order`,
  [positiveIntegerArb, iterableArb],
  (t, size, iterable) => {
    const chunkedIterable = chunked(size, iterable)

    t.deepEqual([...flatten(chunkedIterable)], iterable.values)
  },
)

testProp(
  `chunked returns an empty iterable for an empty iterable`,
  [positiveIntegerArb, emptyIterableArb],
  (t, size, iterable) => {
    const chunkedIterable = chunked(size, iterable)

    t.is(count(chunkedIterable), 0)
  },
)

testProp(
  `chunked returns an iterable containing chunks of the given size when the iterable's length is divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyIterableArb)
      .filter(([size, iterable]) => iterable.values.length % size === 0),
  ],
  (t, [size, iterable]) => {
    const chunkedIterable = chunked(size, iterable)

    for (const chunk of chunkedIterable) {
      t.is(chunk.length, size)
    }
  },
)

testProp(
  `chunked returns an iterable containing chunks of the given size except for the last chunk when the iterable's length is not divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyIterableArb)
      .filter(([size, iterable]) => iterable.values.length % size !== 0),
  ],
  (t, [size, iterable]) => {
    const chunkedIterable = chunked(size, iterable)

    for (const chunk of take(
      Math.floor(iterable.values.length / size),
      chunkedIterable,
    )) {
      t.is(chunk.length, size)
    }

    t.is(get(last(chunkedIterable)).length, iterable.values.length % size)
  },
)

test(`chunked concrete example`, t => {
  const iterable = [`a`, `b`, `c`, `d`, `e`, `f`, `g`]

  const chunkedIterable = chunked(3, iterable)

  t.deepEqual([...chunkedIterable], [[`a`, `b`, `c`], [`d`, `e`, `f`], [`g`]])
})

testProp(
  `chunkedAsync returns an async iterable`,
  [positiveIntegerArb, asyncIterableArb],
  async (t, n, asyncIterable) => {
    const chunkedAsyncIterable = chunkedAsync(n, asyncIterable)

    await t.asyncIterable(chunkedAsyncIterable)
  },
)

testProp(
  `chunkedAsync throws for a non-integer size`,
  [nonSafeIntegerDoubleArb, asyncIterableArb],
  (t, size, asyncIterable) => {
    t.throws(() => chunkedAsync(size, asyncIterable), {
      message: `\`size\` must be an integer: ${size}`,
      instanceOf: Error,
    })
  },
)

testProp(
  `chunkedAsync throws for a non-positive integer size`,
  [nonPositiveIntegerArb, asyncIterableArb],
  (t, size, asyncIterable) => {
    t.throws(() => chunkedAsync(size, asyncIterable), {
      message: `\`size\` must be a positive integer: ${size}`,
      instanceOf: Error,
    })
  },
)

testProp(
  `chunkedAsync returns an async iterable containing the given async iterable's values in iteration order`,
  [positiveIntegerArb, asyncIterableArb],
  async (t, n, asyncIterable) => {
    const chunkedAsyncIterable = chunkedAsync(n, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, flattenAsync(chunkedAsyncIterable)),
      asyncIterable.values,
    )
  },
)

testProp(
  `chunkedAsync returns an empty async iterable for an empty async iterable`,
  [positiveIntegerArb, emptyAsyncIterableArb],
  async (t, n, asyncIterable) => {
    const chunkedAsyncIterable = chunkedAsync(n, asyncIterable)

    t.is(await countAsync(chunkedAsyncIterable), 0)
  },
)

testProp(
  `chunkedAsync returns an async iterable containing chunks of the given size when the async iterable's length is divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyAsyncIterableArb)
      .filter(([n, asyncIterable]) => asyncIterable.values.length % n === 0),
  ],
  async (t, [n, asyncIterable]) => {
    const chunkedAsyncIterable = chunkedAsync(n, asyncIterable)

    for await (const chunk of chunkedAsyncIterable) {
      t.is(chunk.length, n)
    }
  },
)

testProp(
  `chunkedAsync returns an async iterable containing chunks of the given size except for the last chunk when the async iterable's length is not divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyAsyncIterableArb)
      .filter(([n, asyncIterable]) => asyncIterable.values.length % n !== 0),
  ],
  async (t, [n, asyncIterable]) => {
    const chunkedAsyncIterable = chunkedAsync(n, asyncIterable)

    for await (const chunk of takeAsync(
      Math.floor(asyncIterable.values.length / n),
      chunkedAsyncIterable,
    )) {
      t.is(chunk.length, n)
    }

    t.is(
      (await getAsync(lastAsync(chunkedAsyncIterable))).length,
      asyncIterable.values.length % n,
    )
  },
)

test(`chunkedAsync concrete example`, async t => {
  const asyncIterable = asAsync([`a`, `b`, `c`, `d`, `e`, `f`, `g`])

  const chunkedAsyncIterable = chunkedAsync(3, asyncIterable)

  t.deepEqual(await collectAsync(toArray, chunkedAsyncIterable), [
    [`a`, `b`, `c`],
    [`d`, `e`, `f`],
    [`g`],
  ])
})

testProp(
  `chunkedConcur returns a concur iterable`,
  [positiveIntegerArb, concurIterableArb],
  async (t, n, concurIterable) => {
    const chunkedConcurIterable = chunkedConcur(n, concurIterable)

    await t.concurIterable(chunkedConcurIterable)
  },
)

testProp(
  `chunkedConcur throws for a non-integer size`,
  [nonSafeIntegerDoubleArb, concurIterableArb],
  (t, size, concurIterable) => {
    t.throws(() => chunkedConcur(size, concurIterable), {
      message: `\`size\` must be an integer: ${size}`,
      instanceOf: Error,
    })
  },
)

testProp(
  `chunkedConcur throws for a non-positive integer size`,
  [nonPositiveIntegerArb, concurIterableArb],
  (t, size, concurIterable) => {
    t.throws(() => chunkedConcur(size, concurIterable), {
      message: `\`size\` must be a positive integer: ${size}`,
      instanceOf: Error,
    })
  },
)

testProp(
  `chunkedConcur returns a concur iterable containing the given concur iterable's values`,
  [positiveIntegerArb, concurIterableArb],
  async (t, n, concurIterable) => {
    const chunkedConcurIterable = chunkedConcur(n, concurIterable)

    t.deepEqual(
      await collectConcur(
        toArray,
        flatMapConcur(asConcur, chunkedConcurIterable),
      ),
      concurIterable.iterationOrder,
    )
  },
)

testProp(
  `chunkedConcur returns an empty concur iterable for an empty concur iterable`,
  [positiveIntegerArb, emptyConcurIterableArb],
  async (t, n, concurIterable) => {
    const chunkedConcurIterable = chunkedConcur(n, concurIterable)

    t.is(await countConcur(chunkedConcurIterable), 0)
  },
)

testProp(
  `chunkedConcur returns a concur iterable containing chunks of the given size when the concur iterable's length is divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyConcurIterableArb)
      .filter(([n, concurIterable]) => concurIterable.values.length % n === 0),
  ],
  async (t, [n, concurIterable]) => {
    const chunkedConcurIterable = chunkedConcur(n, concurIterable)

    await chunkedConcurIterable(chunk => {
      t.is(chunk.length, n)
    })
  },
)

testProp(
  `chunkedConcur returns a concur iterable containing chunks of the given size except for one chunk when the concur iterable's length is not divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyConcurIterableArb)
      .filter(([n, concurIterable]) => concurIterable.values.length % n !== 0),
  ],
  async (t, [n, concurIterable]) => {
    const chunkedConcurIterable = chunkedConcur(n, concurIterable)

    await takeConcur(
      Math.floor(concurIterable.values.length / n),
      chunkedConcurIterable,
    )(chunk => t.is(chunk.length, n))

    t.is(
      (await getConcur(lastConcur(chunkedConcurIterable))).length,
      concurIterable.values.length % n,
    )
  },
)

testProp(
  `chunkedConcur is concurrent`,
  [positiveIntegerArb, nonEmptyConcurIterableArb],
  async (t, n, concurIterable) => {
    const chunkedConcurIterable = chunkedConcur(n, concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = chunkedConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout)

    t.fulfilled(promise)
  },
)

test(`chunkedConcur concrete example`, async t => {
  const concurIterable = asConcur([`a`, `b`, `c`, `d`, `e`, `f`, `g`])

  const chunkedConcurIterable = chunkedConcur(3, concurIterable)

  t.deepEqual(await collectConcur(toArray, chunkedConcurIterable), [
    [`a`, `b`, `c`],
    [`d`, `e`, `f`],
    [`g`],
  ])
})
