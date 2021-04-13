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
import { AsyncBetterator, Betterator } from 'betterator'
import { cached, cachedAsync, cachedConcur } from '../src/cached.js'
import {
  collect,
  collectAsync,
  collectConcur,
  toArray,
  toMap,
  counting
} from '../src/collect.js'
import { each, eachAsync, eachConcur } from '../src/each.js'
import { pipe } from '../src/pipe.js'
import { indexed, indexedAsync } from '../src/indexed.js'
import { asAsync, asConcur } from '../src/as.js'
import { map } from '../src/map.js'
import { test, testProp } from './helpers/macros.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb
} from './helpers/arbs.js'
import { delay } from './helpers/index.js'

testProp(`cached returns an iterable`, [iterableArb], (t, iterable) => {
  const cachedIterable = cached(iterable)

  t.iterable(cachedIterable)
})

testProp(
  `cached returns an equivalent iterable`,
  [iterableArb],
  (t, iterable) => {
    const cachedIterable = cached(iterable)

    t.deepEqual([...cachedIterable], iterable.values)
  }
)

testProp(
  `cached ensures the underlying iterable is iterated at most once`,
  [
    fc
      .tuple(nonEmptyIterableArb, fc.integer({ min: 1, max: 100 }))
      .chain(([iterable, iteratorCount]) =>
        fc.tuple(
          fc.constant(iterable),
          fc.constant(iteratorCount),
          fc.infiniteStream(fc.integer({ min: 0, max: iteratorCount - 1 }))
        )
      )
  ],
  (t, [iterable, iteratorCount, iteratorIndices]) => {
    const iterated = iterable.values.map(() => false)
    iterable = pipe(
      iterable,
      indexed,
      each(([index]) => {
        t.false(iterated[index])
        iterated[index] = true
      })
    )

    iterable = cached(iterable)

    const iterators = Array.from({ length: iteratorCount }, () =>
      iterable[Symbol.iterator]()
    )
    for (const index of iteratorIndices) {
      if (iterators[index].next().done) {
        break
      }
    }
  }
)

test(`cached concrete example`, t => {
  let count = 0
  const iterable = each(() => count++, [1, 2, 3])

  const cachedIterable = cached(iterable)

  const iterator1 = Betterator.fromIterable(cachedIterable)
  const iterator2 = Betterator.fromIterable(cachedIterable)
  const iterator3 = Betterator.fromIterable(cachedIterable)
  iterator1.getNext()
  iterator2.getNext()
  iterator2.getNext()
  iterator3.getNext()
  iterator1.getNext()
  iterator3.getNext()
  iterator2.getNext()
  iterator3.getNext()
  iterator1.getNext()

  t.is(count, 3)
})

testProp(
  `cachedAsync returns an async iterable`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const cachedAsyncIterable = cachedAsync(asyncIterable)

    await t.asyncIterable(cachedAsyncIterable)
  }
)

testProp(
  `cachedAsync returns an equivalent async iterable`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const cachedAsyncIterable = cachedAsync(asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, cachedAsyncIterable),
      asyncIterable.values
    )
  }
)

testProp(
  `cachedAsync ensures the underlying async iterable is iterated at most once`,
  [
    fc
      .tuple(nonEmptyAsyncIterableArb, fc.integer({ min: 1, max: 100 }))
      .chain(([asyncIterable, asyncIteratorCount]) =>
        fc.tuple(
          fc.constant(asyncIterable),
          fc.constant(asyncIteratorCount),
          fc.infiniteStream(
            fc.tuple(
              fc.integer({ min: 0, max: asyncIteratorCount - 1 }),
              fc.boolean()
            )
          )
        )
      )
  ],
  async (
    t,
    [asyncIterable, asyncIteratorCount, asyncIteratorIndicesAndWait]
  ) => {
    const iterated = asyncIterable.values.map(() => false)
    asyncIterable = pipe(
      asyncIterable,
      indexedAsync,
      eachAsync(([index]) => {
        t.false(iterated[index])
        iterated[index] = true
      })
    )

    asyncIterable = cachedAsync(asyncIterable)

    const asyncIterators = Array.from({ length: asyncIteratorCount }, () =>
      asyncIterable[Symbol.asyncIterator]()
    )
    for (const [index, wait] of asyncIteratorIndicesAndWait) {
      const promise = asyncIterators[index].next()

      if (wait && (await promise).done) {
        break
      }
    }
  }
)

test(`cachedAsync concrete example`, async t => {
  let count = 0
  const asyncIterable = eachAsync(() => count++, asAsync([1, 2, 3]))

  const cachedAsyncIterable = cachedAsync(asyncIterable)

  const asyncIterator1 = AsyncBetterator.fromAsyncIterable(cachedAsyncIterable)
  const asyncIterator2 = AsyncBetterator.fromAsyncIterable(cachedAsyncIterable)
  const asyncIterator3 = AsyncBetterator.fromAsyncIterable(cachedAsyncIterable)
  await asyncIterator1.getNext()
  await asyncIterator2.getNext()
  await asyncIterator2.getNext()
  await asyncIterator3.getNext()
  await asyncIterator1.getNext()
  await asyncIterator3.getNext()
  await asyncIterator2.getNext()
  await asyncIterator3.getNext()
  await asyncIterator1.getNext()

  t.is(count, 3)
})

testProp(
  `cachedConcur returns a concur iterable`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const cachedConcurIterable = cachedConcur(concurIterable)

    await t.concurIterable(cachedConcurIterable)
  }
)

testProp(
  `cachedConcur returns an equivalent concur iterable`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const cachedConcurIterable = cachedConcur(concurIterable)

    t.unorderedDeepEqual(
      await collectConcur(toArray, cachedConcurIterable),
      concurIterable.values
    )
  }
)

testProp(
  `cachedConcur ensures the underlying concur iterable is iterated at most once`,
  [
    nonEmptyConcurIterableArb,
    fc.array(fc.integer({ min: 1, max: 100 }), { minLength: 1 })
  ],
  async (t, concurIterable, timeouts) => {
    const iterated = collect(
      counting(toMap),
      map(value => [value, value], concurIterable.values)
    )
    concurIterable = eachConcur(value => {
      t.true(iterated.get(value) > 0)
      iterated.set(value, iterated.get(value) - 1)
    }, concurIterable)

    concurIterable = cachedConcur(concurIterable)

    await Promise.all(
      timeouts.map(timeout =>
        delay(timeout).then(() =>
          // eslint-disable-next-line no-empty-function
          concurIterable(() => {})
        )
      )
    )
  }
)

test(`cachedConcur concrete example`, async t => {
  let count = 0
  const concurIterable = eachConcur(() => count++, asConcur([1, 2, 3]))

  const cachedConcurIterable = cachedConcur(concurIterable)

  await Promise.all([
    delay(3).then(() => cachedConcurIterable(() => delay(1))),
    delay(5).then(() => cachedConcurIterable(() => delay(8))),
    delay(1).then(() =>
      // eslint-disable-next-line no-empty-function
      cachedConcurIterable(() => {})
    )
  ])

  t.is(count, 3)
})
